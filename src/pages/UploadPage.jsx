import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import DocumentUploader from '../components/document-review/upload/DocumentUploader';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';

const steps = ['Upload Documents', 'Review Selection', 'Analyze'];

export default function UploadPage() {
  const navigate = useNavigate();
  const { client } = useAuth();
  const [activeStep, setActiveStep] = useState(0);

  const handleUploadComplete = (submission) => {
    navigate(ROUTES.ANALYSIS.replace(':submissionId', submission.id));
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Upload Estate Planning Documents
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Upload your existing estate planning documents for comprehensive AI-powered review.
          Our system will analyze each document and provide detailed recommendations.
        </Typography>

        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Alert severity="info" sx={{ mb: 3 }}>
          Accepted formats: PDF, DOCX • Maximum file size: 10MB per document
        </Alert>

        <DocumentUploader
          clientId={client?.id}
          clientState={client?.state}
          onUploadComplete={handleUploadComplete}
        />
      </Box>
    </MainLayout>
  );
}