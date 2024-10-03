import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Divider,
  CardContent,
  styled,
  Card,
  Avatar,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { amber, indigo } from '@mui/material/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileData } from '../../../services/apiUpdateProfileDetails';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

const amberBgColor = amber[300];
const indigoColor = indigo[500];
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
export default function ProfileDetail({
  label,
  field,
  value,
  icon,
  editingField,
  handleEditClick,
  handleSaveClick,
  isName,
}) {
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    console.log('Profile updated successfully!');

    toast.success('¡Perfil actualizado exitosamente!');
    // Add your form submission logic here
  };
  function handlePasswordModal() {
    setPasswordModalOpen((prevState) => !prevState);
  }
  const [fieldValue, setFieldValue] = useState(value);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isSaving } = useMutation({
    mutationFn: (updatedData) => updateProfileData(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(['profileData']);
      toast.success('Profile updated successfully', {
        type: 'success',
        toastId: 'update-profile-success',
      });
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.', {
        type: 'error',
        toastId: 'update-profile-error',
      });
    },
  });

  const handleInputChange = (event) => {
    setFieldValue(event.target.value);
  };

  const handleSave = () => {
    const updatedData = {
      [field]: fieldValue,
    };
    mutate(updatedData);
    handleSaveClick();
  };
  const renderInputFields = () => {
    //   if (isName) {
    //     return (
    //       <Box sx={{ display: 'flex', gap: 1 }}>
    //         <TextField
    //           variant="outlined"
    //           size="small"
    //           value={fieldValue.firstName || ''}
    //           onChange={(e) =>
    //             setFieldValue((prevState) => ({
    //               ...prevState,
    //               firstName: e.target.value,
    //             }))
    //           }
    //           label="الاسم الأول"
    //           sx={{
    //             '& .MuiInputBase-input': {
    //               fontSize: '1.5rem',
    //             },
    //             '& .MuiInputLabel-root': {
    //               fontSize: '1.5rem',
    //               fontWeight: 'bold',
    //             },
    //           }}
    //         />
    //         <TextField
    //           variant="outlined"
    //           size="small"
    //           value={fieldValue.lastName || ''}
    //           onChange={(e) =>
    //             setFieldValue((prevState) => ({
    //               ...prevState,
    //               lastName: e.target.value,
    //             }))
    //           }
    //           label="الاسم الأخير"
    //           sx={{
    //             '& .MuiInputBase-input': {
    //               fontSize: '1.5rem',
    //             },
    //             '& .MuiInputLabel-root': {
    //               fontSize: '1.5rem',
    //               fontWeight: 'bold',
    //             },
    //           }}
    //         />
    //       </Box>
    //     );
    //   } else {
    //     return (
    //       <TextField
    //         variant="outlined"
    //         size="small"
    //         value={fieldValue || ''}
    //         onChange={handleInputChange}
    //         label={label}
    //         fullWidth
    //         sx={{
    //           '& .MuiInputBase-input': {
    //             fontSize: '1.5rem',
    //           },
    //           '& .MuiInputLabel-root': {
    //             fontSize: '1.5rem',
    //             fontWeight: 'bold',
    //           },
    //         }}
    //       />
    //     );
    //   }
    // };
    // return (
    //   <Box
    //     key={field}
    //     sx={{
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'space-between',
    //       padding: '12px 12px',
    //       borderRadius: 2,
    //       backgroundColor: '#f9f9f9',
    //       boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    //       transition: 'background-color 0.3s',
    //       '&:hover': {
    //         backgroundColor: amberBgColor,
    //       },
    //       borderBottom: '1px solid #e0e0e0',
    //     }}
    //   >
    //     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    //       <FontAwesomeIcon
    //         icon={icon}
    //         style={{ color: indigoColor, fontSize: '1.4rem' }}
    //       />
    //       {editingField === field ? (
    //         renderInputFields()
    //       ) : (
    //         <Typography
    //           variant="body1"
    //           sx={{
    //             fontFamily: 'Poppins',
    //             fontWeight: 'bold',
    //             color: '#555',
    //             fontSize: { xs: '1rem', sm: '1.2rem' },
    //           }}
    //         >
    //           {label} : {value}
    //         </Typography>
    //       )}
    //     </Box>
    //     {isSaving ? (
    //       <CircularProgress size={24} />
    //     ) : (
    //       <Button
    //         variant="text"
    //         sx={{
    //           color: indigoColor,
    //           textTransform: 'none',
    //           fontWeight: 'bold',
    //           fontSize: { xs: '1rem', sm: '1.2rem' },
    //         }}
    //         onClick={() =>
    //           editingField === field ? handleSave() : handleEditClick(field)
    //         }
    //       >
    //         {editingField === field ? 'حفظ' : 'تعديل'}
    //       </Button>
    //     )}
    //   </Box>
    // );
  };

  return (
    <Grid item xs={12} md={8}>
      <ProfileCard sx={{ bgcolor: '#000', color: '#fff' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            المعلومات الشخصية
          </Typography>

          <Divider color="white" sx={{ my: 2 }} />
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="الاسم الأول"
                  variant="filled"
                  color="white"
                  fullWidth
                  sx={{
                    borderRadius: '11px',
                    border: '1px solid gray',
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="اسم العائلة"
                  variant="filled"
                  color="white"
                  fullWidth
                  sx={{
                    borderRadius: '11px',
                    border: '1px solid gray',
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="الدور"
                  variant="filled"
                  color="white"
                  fullWidth
                  sx={{
                    borderRadius: '11px',
                    border: '1px solid gray',
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="البريد الإلكتروني"
                  variant="filled"
                  color="white"
                  fullWidth
                  sx={{
                    borderRadius: '11px',
                    border: '1px solid gray',
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="رقم الهاتف المحمول"
                  variant="filled"
                  color="white"
                  fullWidth
                  sx={{
                    borderRadius: '11px',
                    border: '1px solid gray',
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                >
                  حفظ
                </Button>
              </Grid>
            </Grid>
            <Divider color="white" sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              كلمة المرور
            </Typography>
            <Typography variant="body1">قم بتغيير كلمة مرور حسابك.</Typography>
          </form>
          <Divider color="white" sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handlePasswordModal}
            sx={{ mb: 2 }}
          >
            تغيير كلمة المرور
          </Button>
          {passwordModalOpen && (
            <form action="">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="كلمة المرور الحالية"
                    variant="filled"
                    color="white"
                    fullWidth
                    sx={{
                      borderRadius: '11px',
                      border: '1px solid gray',
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="كلمة المرور الجديدة"
                    variant="filled"
                    color="white"
                    fullWidth
                    sx={{
                      borderRadius: '11px',
                      border: '1px solid gray',
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    sx={{ mb: 2 }}
                  >
                    حفظ
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handlePasswordModal}
          >
            إلغاء
          </Button>
        </CardContent>
      </ProfileCard>
    </Grid>
  );
}
// ProfileDetail.propTypes = {
//   label: PropTypes.string.isRequired,
//   field: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   icon: PropTypes.node.isRequired,
//   editingField: PropTypes.bool.isRequired,
//   handleEditClick: PropTypes.func.isRequired,
//   handleSaveClick: PropTypes.func.isRequired,
//   isName: PropTypes.bool.isRequired,
// };
