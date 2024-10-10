import { Box, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';

// colors
const indigoColor = indigo[500];
export default function ProfileHeader() {
  return (
    <Box
      sx={{
        backgroundColor: indigoColor,
        color: '#fff',
        padding: { xs: '9px 12px', sm: '9px 18px' },
        borderRadius: 1,
        textAlign: 'center',
        width: { xs: '80%', sm: '50%' },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: '1.8rem', sm: '1.8rem', md: '2rem' },
          fontWeight: 'bold',
        }}
      >
        معلومات المستخدم
      </Typography>
    </Box>
  );
}
