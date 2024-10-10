import React, { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Grid2,
  CardContent,
  Divider,
  Card,
  styled,
  FormLabel,
} from '@mui/material';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileData } from '../../../services/apiGetProfileDetails';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { amber, grey, indigo } from '@mui/material/colors';
import { v4 as uuidv4 } from 'uuid';
import {
  Mail,
  MenuBook,
  PermIdentity,
  Phone,
  School,
  Wallet,
} from '@mui/icons-material';
import { updateProfileData } from '../../../services/apiUpdateProfileDetails';
import SpinnerOverlay from './SpinnerOverlay';
import { resetPasswordApi } from '../../../services/resetPasswordApi';
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
  const {
    register: registerResetPassowrd,
    handleSubmit: handleSubmitResetPassowrd,
    formState: { errors: errorsReset },
    reset,
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
  const { mutate, isLoading: isSavingProfileData } = useMutation({
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

  const { mutate: mutateResetPassword, isPending: isSavingReset } = useMutation(
    {
      mutationFn: resetPasswordApi,
      onSuccess: () => {
        toast.success('Password updated successfully', {
          type: 'success',
          toastId: 'reset-password-success',
        });
      },
      onError: (error) => {
        console.error('Error updating profile:', error);
        toast.error('Failed to update password. Please try again.', {
          type: 'error',
          toastId: 'reset-password-error',
        });
      },
    }
  );
  const onSubmitResetPassword = (data) => {
    console.log(data);

    mutateResetPassword(data);
  };
  if (isFetchingProfileData || isSavingProfileData || isSavingReset) {
    return <SpinnerOverlay />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  let profileFields = [];
  console.log(profileData.data);

  if (profileData) {
    profileFields.push(
      {
        label: 'الاسم الاول',
        field: 'firstName',
        value: `${profileData.firstName}`,
        icon: <PermIdentity sx={{ fontSize: '1.9rem' }} />,
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال الاسم الاول',
          },
          minLength: {
            value: 3,
            message: ' الاسم الاول يجب ان يتكون على الاقل من 3 احرف',
          },
          maxLength: {
            value: 20,
            message: ' الاسم الاول يجب ان يتكون على الاكثر من 20 حرف',
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'الاسم الاول يجب ان يحتوي على حروف فقط',
          },
        },
      },
      {
        label: 'اسم العائلة',
        field: 'lastName',
        value: `${profileData.lastName}`,
        icon: <PermIdentity sx={{ fontSize: '1.9rem' }} />,
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال الاسم الاول',
          },
          minLength: {
            value: 3,
            message: ' الاسم الاول يجب ان يتكون على الاقل من 3 احرف',
          },
          maxLength: {
            value: 20,
            message: ' الاسم الاول يجب ان يتكون على الاكثر من 20 حرف',
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'الاسم الاول يجب ان يحتوي على حروف فقط',
          },
        },
      },
      {
        label: 'البريد الإلكتروني',
        field: 'email',
        value: profileData.email,
        icon: <Mail sx={{ fontSize: '1.9rem' }} />,
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال البريد الإلكتروني',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'البريد الإلكتروني غير صالح',
          },
        },
      },
      {
        label: 'رقم الهاتف',
        field: 'phone',
        value: profileData.phoneNumber,
        icon: <Phone sx={{ fontSize: '1.9rem' }} />,
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال رقم الهاتف',
          },
          pattern: {
            value: /^\d{11}$/,
            message: 'رقم الهاتف غير صالح',
          },
        },
      }
      // {
      //   label: 'الرقم القومي',
      //   field: 'nationalID',
      //   value: profileData.nationalId,
      //   icon: <BadgeRounded sx={{ fontSize: '1.9rem' }} />,
      //   validation: {
      //     required: {
      //       value: true,
      //       message: 'يجب عليك ادخال الرقم القومي',
      //     },
      //     pattern: {
      //       value: /^\d{14}$/,
      //       message: 'الرقم القومي غير صالح',
      //     },
      //   },
      // }
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
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال رقم هاتف ولي الأمر',
          },
          pattern: {
            value: /^\d{11}$/,
            message: 'رقم هاتف ولي الأمر غير صالح',
          },
        },
      },
      {
        label: 'المحفظة',
        field: 'wallet',
        value: profileData.walletBalance,
        icon: <Wallet sx={{ fontSize: '1.9rem' }} />,
      },
      {
        label: 'الصف الدراسي',
        field: 'level',
        value: profileData.level,
        icon: <MenuBook sx={{ fontSize: '2rem' }} />,
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال الصف الدراسي',
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'الصف الدراسي يجب ان يحتوي على حروف فقط',
          },
        },
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
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال التخصص',
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'التخصص يجب ان يحتوي على حروف فقط',
          },
        },
      },
      {
        label: 'سنة التخرج',
        field: 'teacherGraduationYear',
        value: profileData.graduationYear,
        icon: <School sx={{ fontSize: '2rem' }} />,
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال سنة التخرج',
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'سنة التخرج يجب ان يحتوي على ارقام فقط',
          },
        },
      },
      {
        label: 'المؤهل التعليمي',
        field: 'educationalQualification',
        value: profileData.educationalQualification,
        icon: <School sx={{ fontSize: '2rem' }} />,
        validation: {
          required: {
            value: true,
            message: 'يجب عليك ادخال المؤهل التعليمي',
          },
          // pattern: {
          //   value: /^[A-Za-z]+$/,
          //   message: 'المؤهل التعليمي يجب ان يحتوي على حروف فقط',
          // },
        },
      }
      // {
      //   label: ' المستويات',
      //   field: 'levels',
      //   value: profileData.levels,
      //   icon: <MenuBook sx={{ fontSize: '2rem' }} />,
      //   validation: {
      //     required: {
      //       value: true,
      //       message: 'يجب عليك ادخال المستويات',
      //     },
      //     pattern: {
      //       value: /^[A-Za-z]+$/,
      //       message: 'المستويات يجب ان يحتوي على حروف فقط',
      //     },
      //   },
      // }
    );
  }
  const isEmptyField = Object.keys(errors).length === 0;
  return (
    <Grid2 size={{ xs: 12, sm: 12, md: 9 }}>
      <ProfileCard sx={{ bgcolor: grey[900], color: '#fff' }}>
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
                      ...detail.validation,
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
            <form onSubmit={handleSubmitResetPassowrd(onSubmitResetPassword)}>
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
                    {...registerResetPassowrd('oldPassword', {
                      required: {
                        value: true,
                        message: 'كلمة المرور الحالية مطلوبة',
                      },
                    })}
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
                    {...registerResetPassowrd('newPassword', {
                      required: {
                        value: true,
                        message: 'كلمة المرور الجديدة مطلوبة',
                      },
                      minLength: {
                        value: 8,
                        message: 'كلمة المرور يجب الا يقل عن 8 حروف',
                      },
                    })}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Button
                    type="submit"
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
