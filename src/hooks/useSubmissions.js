import { useState, useEffect } from 'react';
import { getClientSubmissions, getSubmission } from '../services/documentService';

export function useSubmissions(clientId) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clientId) {
      fetchSubmissions();
    } else {
      setLoading(false);
    }
  }, [clientId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getClientSubmissions(clientId);
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submissions, loading, error, refetch: fetchSubmissions };
}

export function useSubmissionDetail(submissionId) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (submissionId) {
      fetchSubmission();
    }
  }, [submissionId]);

  const fetchSubmission = async () => {
    try {
      setLoading(true);
      const data = await getSubmission(submissionId);
      setSubmission(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submission, loading, error, refetch: fetchSubmission };
}