import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const FallbackContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
});

const ErrorIcon = styled(ErrorOutlineIcon)({
  fontSize: '64px',
  color: '#f44336',
});

const FallbackMessage = styled(Typography)({
  marginBottom: '20px',
  fontSize: '1.5rem',
});

const FallbackButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const ErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <FallbackContainer>
      <ErrorIcon />
      <FallbackMessage>
        Something went wrong. Please try again later.
      </FallbackMessage>
      <FallbackButton variant="contained" onClick={resetErrorBoundary}>
        Refresh
      </FallbackButton>
    </FallbackContainer>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback resetErrorBoundary={() => this.setState({ hasError: false })} />;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
