import { Typography } from '@mui/material';

const FeatureDescription = ({ icon, text }) => (
  <Typography
    variant="body1"
    sx={{
      color: '#555',
      fontSize: { xs: '1.5rem', sm: '2rem' },
      fontFamily: 'cairo',
      lineHeight: 1.6,
      mb: 3,
    }}
  >
    {icon} {text}
  </Typography>
);

export default FeatureDescription;
