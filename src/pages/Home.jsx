import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper
} from '@mui/material';
import {
  Assessment,
  Security,
  Speed,
  CheckCircle
} from '@mui/icons-material';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Assessment sx={{ fontSize: 60 }} />,
      title: 'Comprehensive Analysis',
      description: 'AI-powered review of your wills, trusts, and powers of attorney using advanced legal analysis.'
    },
    {
      icon: <Speed sx={{ fontSize: 60 }} />,
      title: 'Get Results in Minutes',
      description: 'Upload your documents and receive a detailed analysis report in minutes, not days.'
    },
    {
      icon: <Security sx={{ fontSize: 60 }} />,
      title: 'Secure & Private',
      description: 'Your documents are encrypted and stored securely. Only you can access your information.'
    },
    {
      icon: <CheckCircle sx={{ fontSize: 60 }} />,
      title: 'Expert Recommendations',
      description: 'Receive prioritized recommendations to improve your estate plan and protect your family.'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          px: 2,
          borderRadius: 2,
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Estate Plan Review in Minutes
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Get AI-powered analysis of your estate planning documents
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Upload your wills, trusts, and powers of attorney for comprehensive review and recommendations
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
            {user ? (
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => navigate(ROUTES.DASHBOARD)}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: 'white', borderColor: 'white' }}
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Professional estate planning analysis powered by artificial intelligence
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Steps */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper sx={{ p: 6, bgcolor: 'grey.50' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Three Simple Steps
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" color="primary.main" gutterBottom>
                  1
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Upload Documents
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Upload your existing estate planning documents (PDFs or Word files)
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" color="primary.main" gutterBottom>
                  2
                </Typography>
                <Typography variant="h6" gutterBottom>
                  AI Analysis
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our AI reviews each document for completeness, accuracy, and compliance
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" color="primary.main" gutterBottom>
                  3
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Get Your Report
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Receive a comprehensive report with prioritized recommendations
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* CTA Section */}
      {!user && (
        <Container maxWidth="md" sx={{ mb: 8 }}>
          <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h4" gutterBottom>
              Ready to Review Your Estate Plan?
            </Typography>
            <Typography variant="h6" paragraph>
              Join hundreds of families protecting their legacy
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Create Free Account
            </Button>
          </Paper>
        </Container>
      )}
    </MainLayout>
  );
}