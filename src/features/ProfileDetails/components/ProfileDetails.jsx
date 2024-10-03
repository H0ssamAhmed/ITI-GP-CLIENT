import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid2,
  CardContent,
  Divider,
  Card,
  styled,
  Avatar,
  FormLabel,
  Badge,
  Menu,
} from '@mui/material';
import ProfileDetail from './ProfileDetail';
import {
  faCircleUser,
  faEnvelope,
  faPhone,
  faIdCard,
  faLock,
  faGraduationCap,
  faWallet,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileData } from '../../../services/apiGetProfileDetails';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { amber, grey, indigo } from '@mui/material/colors';
import { v4 as uuidv4 } from 'uuid';
import {
  BadgeRounded,
  Mail,
  MenuBook,
  Password,
  PermIdentity,
  Phone,
  School,
  Wallet,
} from '@mui/icons-material';
import { updateProfileData } from '../../../services/apiUpdateProfileDetails';
import SpinnerOverlay from './SpinnerOverlay';
const ProfileCard = styled(Card)({
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  padding: '20px',
});

export default function ProfileDetails() {
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const {
    isPending: isFetchingProfileData,
    data: profileData,
    error,
  } = useQuery({
    queryKey: ['profileData'],
    queryFn: getProfileData,
  });
  const { mutate, isLoading: isSaving } = useMutation({
    mutationFn: updateProfileData,
    onSuccess: () => {
      queryClient.invalidateQueries(['profileData']);
      toast.success('Profile updated successfully', {
        type: 'success',
        toastId: 'update-profile-success',
      });
    },
    onError: (error) => {
      console.error('Error updating Profile data:', error);
      toast.error('Failed to update profile. Please try again.', {
        type: 'error',
        toastId: 'update-profile-error',
      });
    },
  });
  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
    console.log('Profile updated successfully!');

    mutate(data);

    // toast.success('¡Perfil actualizado exitosamente!');
    // Add your form submission logic here
  };

  if (isFetchingProfileData || isSaving) {
    return <SpinnerOverlay />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  let profileFields = [];
  if (profileData) {
    profileFields.push(
      {
        label: 'الاسم الاول',
        field: 'firstName',
        value: `${profileData.firstName}`,
        icon: <PermIdentity sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'اسم العائلة',
        field: 'lastName',
        value: `${profileData.lastName}`,
        icon: <PermIdentity sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'البريد الإلكتروني',
        field: 'email',
        value: profileData.email,
        icon: <Mail sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'رقم الهاتف',
        field: 'phone',
        value: profileData.phone,
        icon: <Phone sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'الرقم القومي',
        field: 'nationalID',
        value: profileData.nationalID,
        icon: <BadgeRounded sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'كلمة المرور',
        field: 'password',
        value: profileData.password,
        icon: <Password sx={{ fontSize: '1.9rem' }} />,
      }
    );
  }
  // Populate fields based on the role
  if (profileData.role === 'student') {
    profileFields.push(
      {
        label: 'رقم هاتف ولي الأمر',
        field: 'parentPhoneNumber',
        value: profileData.parentPhoneNumber,
        icon: <Phone sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'المحفظة',
        field: 'wallet',
        value: profileData.wallet,
        icon: <Wallet sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'الصف الدراسي',
        field: 'level',
        value: profileData.level,
        icon: <MenuBook sx={{ fontSize: '2rem' }} />,
      }
    );
  }

  if (profileData.role === 'teacher') {
    profileFields.push(
      {
        label: ' التخصص',
        field: 'teacherSpecialization',
        value: profileData.specialization,
        icon: <MenuBook sx={{ fontSize: '2rem' }} />,
      },
      {
        label: 'سنة التخرج',
        field: 'teacherGraduationYear',
        value: profileData.graduationYear,
        icon: <School sx={{ fontSize: '2rem' }} />,
      },
      {
        label: 'المؤهل التعليمي',
        field: 'educationalQualification',
        value: profileData.educationalQualification,
        icon: <School sx={{ fontSize: '2rem' }} />,
      },
      {
        label: ' المستويات',
        field: 'levels',
        value: profileData.levels,
        icon: <MenuBook sx={{ fontSize: '2rem' }} />,
      }
    );
  }
  const isEmptyField = Object.keys(errors).length === 0;
  return (
    <Grid2 size={{ xs: 12, sm: 12, md: 9 }}>
      <ProfileCard sx={{ bgcolor: indigo[700], color: '#fff' }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', fontFamily: 'cairo' }}
          >
            بيانات المستخدم
          </Typography>
          <Divider color="white" sx={{ my: 2 }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              {profileFields.map((detail) => (
                <Grid2 key={uuidv4()} size={{ xs: 12, sm: 6 }}>
                  {detail.icon}
                  <FormLabel
                    sx={{
                      fontFamily: 'cairo',
                      fontSize: '1.6rem',
                      color: '#fff',
                      mb: 2,
                    }}
                  >
                    {' '}
                    {detail.label}
                  </FormLabel>
                  <TextField
                    fullWidth
                    {...register(detail.field, {
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
                    })}
                    disabled={
                      (!isEditing && isEmptyField) || detail.field === 'wallet'
                    }
                    defaultValue={detail.value}
                    slotProps={{
                      input: {
                        sx: {
                          fontFamily: 'cairo',
                          fontSize: '1.6rem',
                          color: '#000',
                          backgroundColor: '#fff',
                          borderRadius: '11px',
                          mt: 1,
                          '.MuiInputBase-input': {
                            borderRadius: '11px',
                          },
                          '&.Mui-disabled .MuiOutlinedInput-input': {
                            bgcolor: grey[500],
                          },
                        },
                      },
                    }}
                  />
                  {errors[detail.field] && (
                    <Typography
                      variant="h6"
                      color="error"
                      sx={{
                        fontFamily: 'cairo',
                        fontSize: '1.4rem',
                        mt: 1,
                      }}
                    >
                      {errors[detail.field].message}
                    </Typography>
                  )}
                </Grid2>
              ))}
              <Button
                variant="contained"
                fullWidth
                type={!isEditing ? 'submit' : 'button'}
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  fontFamily: 'cairo',
                  fontSize: '1.8rem',
                  bgcolor: amber[500],
                  color: '#000',
                  fontWeight: 'bold',
                  border: '1px solid #000',
                  '&:hover': {
                    bgcolor: amber[600],
                  },
                  '&:active': {
                    border: '1px solid #000',
                    outline: '1px solid #000',
                  },
                }}
              >
                {!isEditing && isEmptyField ? 'تعديل' : 'حفظ'}
              </Button>
            </Grid2>
          </form>
          <Divider color="white" sx={{ my: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontFamily: 'cairo' }}>
            كلمة المرور
          </Typography>
          <Typography variant="h4" sx={{ fontFamily: 'cairo' }}>
            قم بتغيير كلمة مرور حسابك.
          </Typography>
          <Divider color="white" sx={{ my: 2 }} />
          <Button
            variant="contained"
            fullWidth
            onClick={() => setPasswordModalOpen(true)}
            sx={{
              mb: 2,
              fontFamily: 'cairo',
              fontSize: '1.8rem',
              bgcolor: amber[500],
              color: '#000',
              fontWeight: 'bold',
              border: '1px solid #000',
              '&:hover': {
                bgcolor: amber[600],
              },
            }}
          >
            تغيير كلمة المرور
          </Button>
          {passwordModalOpen && (
            <form>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                  <FormLabel
                    sx={{
                      fontFamily: 'cairo',
                      fontSize: '1.6rem',
                      color: '#fff',
                    }}
                  >
                    كلمة المرور الحالية
                  </FormLabel>
                  <TextField
                    fullWidth
                    placeholder="ادخل كلمة المرور الحالية"
                    sx={{
                      borderRadius: '11px',
                      backgroundColor: '#ffffff',
                      mt: 1,

                      '& .MuiInputBase-input': {
                        color: 'black',
                        fontSize: '1.6rem',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black',
                      },
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <FormLabel
                    sx={{
                      fontFamily: 'cairo',
                      color: '#fff',
                      fontSize: '1.6rem',
                    }}
                  >
                    كلمة المرور الجديدة
                  </FormLabel>

                  <TextField
                    placeholder="ادخل كلمة المرور الجديدة"
                    fullWidth
                    sx={{
                      borderRadius: '11px',
                      backgroundColor: '#ffffff',
                      mt: 1,
                      '& .MuiInputBase-input': {
                        color: 'black',
                        fontSize: '1.6rem',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black',
                      },
                    }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mb: 2,
                      fontFamily: 'cairo',
                      fontSize: '1.8rem',
                      bgcolor: amber[500],
                      color: '#000',
                      fontWeight: 'bold',
                      border: '1px solid #000',
                      '&:hover': { bgcolor: amber[600] },
                    }}
                  >
                    حفظ
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          )}
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => setPasswordModalOpen(false)}
            sx={{ fontFamily: 'cairo', fontSize: '1.8rem' }}
          >
            إلغاء
          </Button>
        </CardContent>
      </ProfileCard>
    </Grid2>
  );
}
