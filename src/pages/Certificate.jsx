import { Button, Typography, Box } from '@mui/material';
import certificateBg from '../assets/certificate/certificate.png';
export default function Certificate() {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${certificateBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        color: 'white',
        direction: 'rtl',
        fontFamily: 'Cairo, sans-serif',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '42%',
          color: '#333',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '3rem',
          }}
        >
          نُقَدِّمُ هَذِهِ الشَّهَادَةَ بِفَخْرٍ إِلَى
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontSize: '4rem',
            my: 3,
          }}
        >
          {name || 'احمد رخا'}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontSize: '2.1rem',
            width: '80%',
            margin: 'auto',
            my: 5,
          }}
        >
          تَهَانِينَا لَكَ عَلَى مُسْتَوَاكَ الرَّائِعِ مَعَ الشُّكْرِ
          وَالتَّقْدِيرِ وَأَطْيَبِ الأَمْنِيَاتِ لَكَ بِالْمَزِيدِ مِنَ
          النَّجَاحِ وَالتَّوْفِيقِ.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 10 }}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '2.1rem' }}>
              التَّوْقِيعُ:
            </Typography>
            <img
              src="https://your-signature-image-url.com/signature.jpg"
              alt="Signature"
              style={{ width: '100px', height: 'auto', marginBottom: '20px' }}
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '2.1rem' }}>
              التَّارِيخُ:
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button variant="contained" color="primary">
        Download as PDF
      </Button>
    </Box>
  );
}
