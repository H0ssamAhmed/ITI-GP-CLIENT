import { Box, CircularProgress } from '@mui/material';

const SpinnerOverlay = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bgcolor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Ensure it overlays on top
    }}
  >
    <CircularProgress />
  </Box>
);

export default SpinnerOverlay;
