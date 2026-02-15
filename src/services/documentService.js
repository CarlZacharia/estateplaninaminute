import { supabase } from './supabase';
import { analyzeDocument, generateComprehensiveReport, parseClaudeResponse } from './claudeApi';
import { getSkillForDocument } from '../utils/documentIdentifier';

// Direct storage upload to bypass Supabase SDK's internal AbortController
async function directStorageUpload(bucket, filePath, file) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) throw new Error('Not authenticated');

  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${bucket}/${filePath}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-upsert': 'true',
      },
      body: file,
    }
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Storage upload failed: ${response.status}`);
  }

  return await response.json();
}

export async function uploadAndAnalyzeDocuments(clientId, clientState, documentsWithTypes) {
  // 1. Create submission
  console.log('[Upload] Step 1: Creating submission...');
  const { data: submission, error: submissionError } = await supabase
    .from('document_submissions')
    .insert({
      client_id: clientId,
      status: 'uploaded'
    })
    .select()
    .single();

  if (submissionError) throw submissionError;
  console.log('[Upload] Step 1 complete: submission', submission.id);

  const uploadedDocuments = [];
  const analyses = [];

  try {
    // 2. Upload and analyze each document
    for (const { file, documentType } of documentsWithTypes) {
      // Upload to storage using direct REST API (bypasses SDK AbortController)
      const filePath = `${clientId}/${submission.id}/${file.name}`;
      console.log('[Upload] Step 2: Uploading file to storage...', file.name);
      await directStorageUpload('estate-documents', filePath, file);
      console.log('[Upload] Step 2 complete: file uploaded');

      // Save document record
      console.log('[Upload] Step 3: Saving document record...');
      const { data: documentRecord, error: docError } = await supabase
        .from('uploaded_documents')
        .insert({
          submission_id: submission.id,
          document_type: documentType,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type
        })
        .select()
        .single();

      if (docError) throw docError;
      console.log('[Upload] Step 3 complete: document record saved');

      uploadedDocuments.push(documentRecord);

      // Convert to base64
      console.log('[Upload] Step 4: Converting to base64...');
      const base64 = await fileToBase64(file);
      console.log('[Upload] Step 4 complete: base64 ready, length:', base64.length);

      // Get estate worksheet data if available (for context in other analyses)
      let clientData = null;
      if (documentType !== 'estate_worksheet') {
        clientData = await getEstateWorksheetData(submission.id);
      }

      // Analyze with Claude
      console.log('[Upload] Step 5: Sending to Claude API for analysis...');
      const claudeResponse = await analyzeDocument({
        documentBase64: base64,
        documentType,
        clientState,
        fileName: file.name,
        clientData
      });

      console.log('[Upload] Step 5 complete: Claude response received');
      const parsedAnalysis = parseClaudeResponse(claudeResponse);

      // Save analysis
      console.log('[Upload] Step 6: Saving analysis results...');
      const { error: analysisError } = await supabase
        .from('analysis_results')
        .insert({
          document_id: documentRecord.id,
          submission_id: submission.id,
          skill_used: getSkillForDocument(documentType, clientState),
          summary: parsedAnalysis.summary || '',
          missing_elements: parsedAnalysis.missing_elements || [],
          problematic_clauses: parsedAnalysis.problematic_clauses || [],
          recommendations: parsedAnalysis.recommendations || [],
          overall_rating: parsedAnalysis.overall_rating || null,
          raw_response: claudeResponse
        });

      if (analysisError) throw analysisError;

      analyses.push({
        documentType,
        fileName: file.name,
        analysis: parsedAnalysis
      });
    }

    // 3. Generate comprehensive report
    const { data: clientProfile } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();

    const comprehensiveReportResponse = await generateComprehensiveReport(
      analyses,
      clientProfile,
      submission.id
    );

    const comprehensiveReport = parseClaudeResponse(comprehensiveReportResponse);

    // Save comprehensive report
    await supabase
      .from('comprehensive_reports')
      .insert({
        submission_id: submission.id,
        executive_summary: comprehensiveReport.executive_summary,
        overall_rating: comprehensiveReport.overall_rating,
        critical_gaps: comprehensiveReport.critical_gaps || [],
        inconsistencies: comprehensiveReport.inconsistencies || [],
        prioritized_recommendations: comprehensiveReport.prioritized_recommendations || [],
        report_data: comprehensiveReport
      });

    // 4. Update submission status
    await supabase
      .from('document_submissions')
      .update({ status: 'completed' })
      .eq('id', submission.id);

    return submission;

  } catch (error) {
    // Update submission status to error
    await supabase
      .from('document_submissions')
      .update({ status: 'error' })
      .eq('id', submission.id);

    throw error;
  }
}

export async function getSubmission(submissionId) {
  const { data, error } = await supabase
    .from('document_submissions')
    .select(`
      *,
      uploaded_documents(*),
      analysis_results(*, uploaded_documents(file_name, document_type)),
      comprehensive_reports(*)
    `)
    .eq('id', submissionId)
    .single();

  if (error) throw error;
  return data;
}

export async function getClientSubmissions(clientId) {
  const { data, error } = await supabase
    .from('document_submissions')
    .select(`
      *,
      uploaded_documents(count)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteSubmission(submissionId) {
  // Get uploaded documents to delete files from storage
  const { data: docs } = await supabase
    .from('uploaded_documents')
    .select('file_path')
    .eq('submission_id', submissionId);

  // Delete files from storage
  if (docs?.length > 0) {
    const filePaths = docs.map(d => d.file_path);
    await supabase.storage.from('estate-documents').remove(filePaths);
  }

  // Delete related records (cascade should handle this if FK constraints
  // are set, but being explicit in case they're not)
  await supabase.from('comprehensive_reports').delete().eq('submission_id', submissionId);
  await supabase.from('analysis_results').delete().eq('submission_id', submissionId);
  await supabase.from('uploaded_documents').delete().eq('submission_id', submissionId);

  const { error } = await supabase
    .from('document_submissions')
    .delete()
    .eq('id', submissionId);

  if (error) throw error;
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function getEstateWorksheetData(submissionId) {
  const { data } = await supabase
    .from('analysis_results')
    .select('raw_response')
    .eq('submission_id', submissionId)
    .eq('skill_used', 'estate-plan-advisor')
    .maybeSingle();

  return data ? parseClaudeResponse(data.raw_response) : null;
}

export async function downloadDocument(filePath) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) throw new Error('Not authenticated');

  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${encodeURIComponent('estate-documents')}/${filePath}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`);
  }

  return await response.blob();
}