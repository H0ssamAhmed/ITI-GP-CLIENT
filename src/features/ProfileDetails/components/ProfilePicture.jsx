import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { amber, grey, indigo } from '@mui/material/colors';

// colors
const amberBgColor = amber[300];
const indigoColor = indigo[500];
// Styled components for the profile card
const ProfileCard = styled(Card)({
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  padding: '20px',
});

const AvatarStyled = styled(Avatar)({
  width: '100px',
  height: '100px',
  margin: '0 auto',
});
export default function ProfilePicture() {
  function handleImageUpload() {}
  return (
    <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
      <ProfileCard
        sx={{
          bgcolor: grey[900],
          color: '#fff',
          height: '230px',
          pt: 0,
          width: { xs: '100%', sm: '40%', md: '100%' },
          margin: 'auto',
        }}
      >
        <CardContent sx={{ position: 'relative' }}>
          <AvatarStyled src="https://randomuser.me/api/portraits/men/1.jpg" />
          <Typography
            variant="h4"
            align="center"
            sx={{ marginY: 2, fontFamily: 'cairo' }}
          >
            احمد رخا
          </Typography>
          <Typography variant="h5" align="center" sx={{ fontFamily: 'cairo' }}>
            مشرف
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              marginBottom: 2,
              fontFamily: 'cairo',
              fontSize: { sx: '1.5rem', sm: '1.5rem', md: '1.5rem' },
            }}
          >
            ahmed@example.com
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              right: 80,
              top: 90,
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={handleImageUpload}
            />
            {/* Icon button for image upload */}
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                component="span"
                sx={{
                  mt: 1,
                  bgcolor: amber[500],
                  '&:hover': {
                    bgcolor: amber[600],
                  },
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        </CardContent>
      </ProfileCard>

      {/* <Button
        variant="contained"
        sx={{
          fontFamily: 'cairo',
          fontSize: '1.8rem',
          bgcolor: amber[500],
          color: '#000',
          fontWeight: 'bold',
          mt: 0.8,
          display: 'block',
          width: { xs: '100%', sm: '40%', md: '100%' },
          border: '1px solid #000',
          mx: 'auto',
          '&:hover': {
            bgcolor: amber[600],
            color: '#000',
          },
        }}
        fullWidth
      >
        تغيير الصورة
      </Button> */}
    </Grid2>
  );
}
