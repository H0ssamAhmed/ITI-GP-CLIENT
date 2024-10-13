import { Typography } from '@mui/material';

const HighlightedText = ({ text }) => (
  <Typography
    component="span"
    sx={{
      fontWeight: 'bold',
      fontFamily: 'cairo',
      fontSize: { xs: '1.5rem', sm: '2rem' },
      background: 'linear-gradient(45deg, #FF5733, #3357FF)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
    }}
  >
    {text}
  </Typography>
);

export default HighlightedText;
