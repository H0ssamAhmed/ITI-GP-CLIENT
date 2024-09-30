import { Grid2 } from '@mui/material';
import ProfilePicture from '../features/ProfileDetailsComponents/ProfilePicture';
import ProfileHeader from '../features/ProfileDetailsComponents/ProfileDetailsHeader';
import ProfileDetails from '../features/ProfileDetailsComponents/ProfileDetails';

export default function ProfilePage() {
  return (
    <Grid2 container spacing={2}>
      <Grid2
        size={{ xs: 12, sm: 12, md: 2 }}
        className="upload-pic-container flex flex-col gap-3"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 2, sm: 2 },
          mt: { xs: 10, sm: 12 },
        }}
      >
        <ProfilePicture />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 12, md: 8, lg: 8 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 2, sm: 2 },
          justifyContent: 'center',
        }}
      >
        <ProfileHeader />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 8 }} m={'auto'}>
        <ProfileDetails />
      </Grid2>
    </Grid2>
  );
}
