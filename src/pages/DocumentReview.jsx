import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CloudUpload,
  CheckCircle
} from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import { ROUTES } from '../config/routes';

export default function DocumentReview() {
  const navigate = useNavigate();

  const documentTypes = [
    'Last Will and Testament',
    'Revocable Living Trust',
    'Financial Power of Attorney',
    'Healthcare Power of Attorney',
    'Estate Information Worksheet'
  ];

  const benefits = [
    'Identify missing provisions',
    'Check for outdated clauses',
    'Verify state compliance',
    'Find inconsistencies between documents',
    'Get prioritized recommendations'
  ];

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Document Review
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          Upload your estate planning documents for comprehensive AI-powered analysis
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Supported Documents
                </Typography>
                <List>
                  {documentTypes.map((type, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={type} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  What We Analyze
                </Typography>
                <List>
                  {benefits.map((benefit, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <CloudUpload sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Upload your documents now and receive your comprehensive analysis report
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUpload />}
              onClick={() => navigate(ROUTES.UPLOAD)}
            >
              Upload Documents
            </Button>
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  );
}