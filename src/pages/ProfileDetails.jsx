import { Box, Grid2 } from '@mui/material';
import ProfilePicture from '../features/ProfileDetails/components/ProfilePicture';
import ProfileDetails from '../features/ProfileDetails/components/ProfileDetails';
import { useQuery } from '@tanstack/react-query';
import { getProfileData } from '../services/apiGetProfileDetails';

export default function ProfilePage() {
  const {
    isPending: isFetchingProfileData,
    data: profileData,
    error,
  } = useQuery({
    queryKey: ["profileData"],
    queryFn: getProfileData,
  });
  
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
        <ProfilePicture getProfileData={{
          profileData,
          isFetchingProfileData,
          error
        }} />
        <ProfileDetails getProfileData={{
          profileData,
          isFetchingProfileData,
          error
        }} />
      </Grid2>
    </Box>
  );
}
