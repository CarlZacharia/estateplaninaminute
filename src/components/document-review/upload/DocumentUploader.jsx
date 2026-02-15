import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton
} from '@mui/material';
import { CloudUpload, Description, Delete } from '@mui/icons-material';
import { useDocumentUpload } from '../../../hooks/useDocumentUpload';
import { DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS, identifyDocumentType } from '../../../utils/documentIdentifier';

export default function DocumentUploader({ clientId, clientState, onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [documentTypes, setDocumentTypes] = useState({});
  const { uploadDocuments, uploading, progress, error } = useDocumentUpload();

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    
    // Auto-identify document types
    const types = {};
    selectedFiles.forEach(file => {
      types[file.name] = identifyDocumentType(file.name);
    });
    setDocumentTypes(types);
  };

  const handleDocumentTypeChange = (fileName, newType) => {
    setDocumentTypes(prev => ({
      ...prev,
      [fileName]: newType
    }));
  };

  const handleRemoveFile = (fileName) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
    setDocumentTypes(prev => {
      const newTypes = { ...prev };
      delete newTypes[fileName];
      return newTypes;
    });
  };

  const handleUpload = async () => {
    const documentsWithTypes = files.map(file => ({
      file,
      documentType: documentTypes[file.name]
    }));

    try {
      const submission = await uploadDocuments(clientId, clientState, documentsWithTypes);
      
      if (onUploadComplete) {
        onUploadComplete(submission);
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const allTypesSelected = files.every(f => documentTypes[f.name]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Estate Planning Documents
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Upload your existing estate planning documents for review. Accepted formats: PDF, DOCX
        </Typography>

        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          disabled={uploading}
          fullWidth
          sx={{ mb: 2 }}
        >
          Select Documents
          <input
            type="file"
            hidden
            multiple
            accept=".pdf,.docx"
            onChange={handleFileSelect}
          />
        </Button>

        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Documents ({files.length})
            </Typography>
            
            {files.map((file, index) => (
              <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Description sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {file.name}
                  </Typography>
                  <Chip 
                    label={`${(file.size / 1024).toFixed(1)} KB`} 
                    size="small" 
                    sx={{ mr: 1 }}
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => handleRemoveFile(file.name)}
                    disabled={uploading}
                  >
                    <Delete />
                  </IconButton>
                </Box>
                
                <FormControl fullWidth size="small">
                  <InputLabel>Document Type</InputLabel>
                  <Select
                    value={documentTypes[file.name] || ''}
                    onChange={(e) => handleDocumentTypeChange(file.name, e.target.value)}
                    label="Document Type"
                    disabled={uploading}
                  >
                    <MenuItem value={DOCUMENT_TYPES.WILL}>
                      {DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.WILL]}
                    </MenuItem>
                    <MenuItem value={DOCUMENT_TYPES.TRUST}>
                      {DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.TRUST]}
                    </MenuItem>
                    <MenuItem value={DOCUMENT_TYPES.POA}>
                      {DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.POA]}
                    </MenuItem>
                    <MenuItem value={DOCUMENT_TYPES.HCPOA}>
                      {DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.HCPOA]}
                    </MenuItem>
                    <MenuItem value={DOCUMENT_TYPES.ESTATE_WORKSHEET}>
                      {DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.ESTATE_WORKSHEET]}
                    </MenuItem>
                    <MenuItem value={DOCUMENT_TYPES.OTHER}>
                      {DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.OTHER]}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Card>
            ))}

            {uploading && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Uploading and analyzing documents... {Math.round(progress)}%
                </Typography>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
              disabled={uploading || !allTypesSelected}
              sx={{ mt: 2 }}
            >
              {uploading ? 'Uploading...' : 'Upload & Analyze Documents'}
            </Button>

            {!allTypesSelected && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                Please select a document type for all files
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}