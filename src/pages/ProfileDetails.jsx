import { Box, Grid2 } from '@mui/material';
import ProfilePicture from '../features/ProfileDetails/components/ProfilePicture';
import ProfileDetails from '../features/ProfileDetails/components/ProfileDetails';

export default function ProfilePage() {
  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, sm: 2, md: 9 },
        backgroundColor: '#eaeff1',
        mt: 10,
      }}
    >
      <Grid2 container spacing={4}>
        <ProfilePicture />
        <ProfileDetails />
      </Grid2>
    </Box>
  );
}
