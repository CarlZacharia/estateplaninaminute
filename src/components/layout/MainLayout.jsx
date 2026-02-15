import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config/routes';

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
    navigate(ROUTES.HOME);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            EstatePlanInAMinute
          </Typography>
          
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate(ROUTES.DASHBOARD)}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.DOCUMENT_REVIEW)}>
                Document Review
              </Button>
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate(ROUTES.LOGIN)}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate(ROUTES.REGISTER)}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
      
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} EstatePlanInAMinute. Professional estate planning analysis.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}