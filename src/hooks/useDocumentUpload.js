import { useState } from 'react';
import { uploadAndAnalyzeDocuments } from '../services/documentService';

export function useDocumentUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadDocuments = async (clientId, clientState, documentsWithTypes) => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress (you can make this more accurate with actual upload progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      const submission = await uploadAndAnalyzeDocuments(
        clientId,
        clientState,
        documentsWithTypes
      );

      clearInterval(progressInterval);
      setProgress(100);
      
      return submission;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadDocuments, uploading, progress, error };
}