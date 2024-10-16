import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Box,
 
  Card,
  CardContent,
  Grid2,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { amber, grey, indigo } from '@mui/material/colors';
import defaultAvatar from '../../../assets/dashboard/profileDefualt.jpg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateUserPicture } from '../../../services/apiUpdateUserPicture';
import {Spinner} from '@material-tailwind/react';
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

export default function ProfilePicture({ getProfileData }) {
  const queryClient = useQueryClient();
  const { mutate: uploadPictureMutation, isPending: isUploading } = useMutation({
    mutationFn: updateUserPicture,
    onSuccess: (data) => {
      toast.success("تم تحديث الصورة الشخصية بنجاح", {
        type: "success",
        toastId: `update-profile-success-${Date.now()}`,
      });
      queryClient.invalidateQueries(["profileData"]);
      
    },
    onError: (error) => {
      const errorMessage = error.message || "Failed to update profile. Please try again.";
      console.error("Error updating Profile data:", error);
      toast.error(errorMessage, {
        toastId: "update-profile-error",
      });
    }
  })
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadPictureMutation(file);
    }
  };
 
  return (
    <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
      <ProfileCard
        sx={{
          bgcolor: 'rgb(67 56 202)',
          color: '#fff',
          height: '230px',
          pt: 0,
          width: { xs: '100%', sm: '40%', md: '100%' },
          margin: 'auto',
        }}
      >
        <CardContent sx={{ position: 'relative' }}>
          { isUploading ? (
            <Spinner />
          ) : (
            <AvatarStyled src={getProfileData.profileData?.picture ? getProfileData.profileData?.picture : defaultAvatar} />

          )
          }
          <Typography
            variant="h4"
            align="center"
            sx={{ marginY: 2, fontFamily: 'cairo' }}
          >
            {`${getProfileData.profileData?.firstName ? getProfileData.profileData?.firstName : 'user'} ${getProfileData.profileData?.lastName ? getProfileData.profileData?.lastName : 'user'} `}
          </Typography>
          <Typography variant="h5" align="center" sx={{ fontFamily: 'cairo' }}>
            {getProfileData.profileData?.role ? getProfileData.profileData?.role : 'Student'}
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
            {getProfileData.profileData?.email ? getProfileData.profileData?.email : 'email'}
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              right: {xs: 195, sm: 80, md: 70},
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
    </Grid2>
  );
}
