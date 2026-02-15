import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Add,
  Visibility,
  Assessment,
  Description,
  Delete
} from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { useSubmissions } from '../hooks/useSubmissions';
import { deleteSubmission } from '../services/documentService';
import { ROUTES } from '../config/routes';

export default function Dashboard() {
  const navigate = useNavigate();
  const { client } = useAuth();
  const { submissions, loading, refetch } = useSubmissions(client?.id);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSubmission(deleteTarget);
      setDeleteTarget(null);
      refetch();
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
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
      case 'attorney_review':
        return 'info';
      case 'approved':
        return 'success';
      default:
        return 'default';
    }
  };

  const stats = {
    totalSubmissions: submissions.length,
    completed: submissions.filter(s => s.status === 'completed').length,
    pending: submissions.filter(s => ['uploaded', 'analyzing'].includes(s.status)).length,
    attorneyReview: submissions.filter(s => s.attorney_reviewed).length
  };

  return (
    <MainLayout>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Dashboard
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => navigate(ROUTES.UPLOAD)}
          >
            New Document Review
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Reviews
                </Typography>
                <Typography variant="h3">
                  {stats.totalSubmissions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Completed
                </Typography>
                <Typography variant="h3" color="success.main">
                  {stats.completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  In Progress
                </Typography>
                <Typography variant="h3" color="warning.main">
                  {stats.pending}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Attorney Reviewed
                </Typography>
                <Typography variant="h3" color="info.main">
                  {stats.attorneyReview}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Submissions Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Document Reviews
            </Typography>

            {loading ? (
              <Typography>Loading...</Typography>
            ) : submissions.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Description sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No document reviews yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Get started by uploading your estate planning documents for AI-powered analysis
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate(ROUTES.UPLOAD)}
                >
                  Start First Review
                </Button>
              </Box>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Documents</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Attorney Review</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id} hover>
                        <TableCell>
                          {new Date(submission.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {submission.uploaded_documents?.[0]?.count || 0} documents
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={submission.status.replace('_', ' ').toUpperCase()}
                            color={getStatusColor(submission.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {submission.attorney_reviewed ? (
                            <Chip label="Reviewed" color="success" size="small" />
                          ) : (
                            <Chip label="Pending" color="default" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {submission.status === 'completed' ? (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => navigate(ROUTES.REPORT.replace(':submissionId', submission.id))}
                            >
                              <Assessment />
                            </IconButton>
                          ) : (
                            <IconButton
                              size="small"
                              onClick={() => navigate(ROUTES.ANALYSIS.replace(':submissionId', submission.id))}
                            >
                              <Visibility />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteTarget(submission.id)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete the submission, all uploaded documents, analysis results, and reports. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
}