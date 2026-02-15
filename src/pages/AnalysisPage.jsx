import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Alert,
  Button,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle,
  Error,
  HourglassEmpty,
  Description,
  Visibility
} from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import { useSubmissionDetail } from '../hooks/useSubmissions';
import { ROUTES } from '../config/routes';
import { DOCUMENT_TYPE_LABELS } from '../utils/documentIdentifier';

export default function AnalysisPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const { submission, loading, error, refetch } = useSubmissionDetail(submissionId);

  // Poll for updates if still analyzing
  useEffect(() => {
    if (submission?.status === 'analyzing' || submission?.status === 'uploaded') {
      const interval = setInterval(() => {
        refetch();
      }, 3000); // Poll every 3 seconds

      return () => clearInterval(interval);
    }
  }, [submission?.status, refetch]);

  if (loading && !submission) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <LinearProgress sx={{ width: '50%' }} />
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert severity="error">{error}</Alert>
      </MainLayout>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'error':
        return <Error color="error" />;
      case 'analyzing':
      case 'uploaded':
        return <HourglassEmpty color="warning" />;
      default:
        return <HourglassEmpty />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'error':
        return 'error';
      case 'analyzing':
      case 'uploaded':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Document Analysis Status
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getStatusIcon(submission.status)}
              <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}>
                Submission Status
              </Typography>
              <Chip 
                label={submission.status.replace('_', ' ').toUpperCase()} 
                color={getStatusColor(submission.status)}
              />
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Submitted: {new Date(submission.created_at).toLocaleString()}
            </Typography>

            {submission.status === 'analyzing' && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Analyzing your documents... This may take a few minutes.
                </Typography>
              </Box>
            )}

            {submission.status === 'completed' && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Analysis complete! Your comprehensive report is ready.
              </Alert>
            )}

            {submission.status === 'error' && (
              <Alert severity="error" sx={{ mt: 2 }}>
                An error occurred during analysis. Please contact support or try uploading again.
              </Alert>
            )}
          </CardContent>
        </Card>

        <Typography variant="h6" gutterBottom>
          Uploaded Documents ({submission.uploaded_documents?.length || 0})
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {submission.uploaded_documents?.map((doc) => {
            const analysis = submission.analysis_results?.find(
              a => a.document_id === doc.id
            );

            return (
              <Grid size={{ xs: 12, md: 6 }} key={doc.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Description color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        {DOCUMENT_TYPE_LABELS[doc.document_type]}
                      </Typography>
                      {analysis && <CheckCircle color="success" fontSize="small" />}
                    </Box>

                    <Typography variant="body2" color="text.secondary" noWrap>
                      {doc.file_name}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      {(doc.file_size / 1024).toFixed(1)} KB
                    </Typography>

                    {analysis && (
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={analysis.overall_rating?.replace('_', ' ') || 'Analyzed'} 
                          size="small"
                          color={
                            analysis.overall_rating === 'excellent' ? 'success' :
                            analysis.overall_rating === 'good' ? 'info' :
                            analysis.overall_rating === 'needs_improvement' ? 'warning' :
                            'error'
                          }
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {submission.status === 'completed' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Visibility />}
              onClick={() => navigate(ROUTES.REPORT.replace(':submissionId', submissionId))}
              fullWidth
            >
              View Comprehensive Report
            </Button>
          </Box>
        )}

        {submission.status === 'error' && (
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.UPLOAD)}
          >
            Upload New Documents
          </Button>
        )}
      </Box>
    </MainLayout>
  );
}