import React, { useEffect, useState } from "react";
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
  FormHelperText,
  InputAdornment,
  IconButton,
  LinearProgress,
  FormControl,
  Select,
} from "@mui/material";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { amber } from "@mui/material/colors";
import { v4 as uuidv4 } from "uuid";
import {
  BadgeRounded,
  Mail,
  MenuBook,
  PermIdentity,
  Phone,
  School,
  Visibility,
  VisibilityOff,
  Wallet,
} from "@mui/icons-material";
import { updateProfileData } from "../../../services/apiUpdateProfileDetails";
import SpinnerOverlay from "./SpinnerOverlay";
import { resetPasswordApi } from "../../../services/resetPasswordApi";
import { apiGetAllLevels } from "../../../services/apiGetAllLevels";
const ProfileCard = styled(Card)({
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  padding: "20px",
});

export default function ProfileDetails({ getProfileData }) {
  const [passwordModalOpen, setPasswordModalOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const getAllLevels = async () => {
      const levelsData = await apiGetAllLevels();
     

      setLevels(levelsData);
    };
    getAllLevels();
  }, []);


  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    control,
  } = useForm({});
  const {
    register: registerResetPassowrd,
    handleSubmit: handleSubmitResetPassowrd,
    formState: { errors: errorsReset },
    reset,
  } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isPending: isSavingProfileData } = useMutation({
    mutationFn: updateProfileData,
    onSuccess: () => {
      queryClient.invalidateQueries(["profileData"]);
      toast.success("Profile updated successfully", {
        type: "success",
        toastId: "update-profile-success",
      });
    },
    onError: (error) => {
      console.error("Error updating Profile data:", error);
      toast.error("Failed to update profile. Please try again.", {
        type: "error",
        toastId: "update-profile-error",
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const { mutate: mutateResetPassword, isPending: isSavingReset } = useMutation(
    {
      mutationFn: resetPasswordApi,
      onSuccess: () => {

        toast.success("Password updated successfully", {
          type: "success",
          toastId: "reset-password-success",
        });
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update password. Please try again.", {
          type: "error",
          toastId: "reset-password-error",
        });
      },
    }
  );
  const onSubmitResetPassword = (data) => {
    mutateResetPassword(data);
  };
  if (getProfileData.isFetchingProfileData) {
    return <SpinnerOverlay />;
  }

  if (getProfileData.profileData.error) {
    return <div>Error: {getProfileData.profileData.error.message}</div>;
  }

  if (!getProfileData.profileData) {
    return <div>No profile data available</div>;
  }

  let profileFields = [];

  if (getProfileData.profileData) {
    profileFields.push(
      {
        label: "الاسم الاول",
        field: "firstName",
        value: `${getProfileData.profileData.firstName}`,
        icon: <PermIdentity sx={{ fontSize: "1.9rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال الاسم الاول",
          },
          minLength: {
            value: 3,
            message: " الاسم الاول يجب ان يتكون على الاقل من 3 احرف",
          },
          maxLength: {
            value: 20,
            message: " الاسم الاول يجب ان يتكون على الاكثر من 20 حرف",
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "الاسم الاول يجب ان يحتوي على حروف فقط",
          },
        },
      },
      {
        label: "اسم العائلة",
        field: "lastName",
        value: `${getProfileData.profileData.lastName}`,
        icon: <PermIdentity sx={{ fontSize: "1.9rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال الاسم الاول",
          },
          minLength: {
            value: 3,
            message: " الاسم الاول يجب ان يتكون على الاقل من 3 احرف",
          },
          maxLength: {
            value: 20,
            message: " الاسم الاول يجب ان يتكون على الاكثر من 20 حرف",
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "الاسم الاول يجب ان يحتوي على حروف فقط",
          },
        },
      },
      {
        label: "البريد الإلكتروني",
        field: "email",
        value: getProfileData.profileData.email,
        icon: <Mail sx={{ fontSize: "1.9rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال البريد الإلكتروني",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "البريد الإلكتروني غير صالح",
          },
        },
      },
      {
        label: "رقم الهاتف",
        field: "phone",
        value: getProfileData.profileData.phoneNumber,
        icon: <Phone sx={{ fontSize: "1.9rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال رقم الهاتف",
          },
          pattern: {
            value: /^\d{11}$/,
            message: "رقم الهاتف غير صالح",
          },
        },
      },
      {
        label: "الرقم القومي",
        field: "nationalID",
        value: getProfileData.profileData.nationalId,
        icon: <BadgeRounded sx={{ fontSize: "1.9rem" }} />,
        validation: {},
      }
    );
  }
  if (getProfileData.profileData.role === "student") {
    profileFields.push(
      {
        label: "رقم هاتف ولي الأمر",
        field: "parentPhoneNumber",
        value: getProfileData.profileData.parentPhoneNumber,
        icon: <Phone sx={{ fontSize: "1.9rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال رقم هاتف ولي الأمر",
          },
          pattern: {
            value: /^\d{11}$/,
            message: "رقم هاتف ولي الأمر غير صالح",
          },
        },
      },
      {
        label: "المحفظة",
        field: "wallet",
        value: getProfileData.profileData.walletBalance,
        icon: <Wallet sx={{ fontSize: "1.9rem" }} />,
      },
      {
        label: "الصف الدراسي",
        field: "levelTitle",
        value: getProfileData.profileData.levelTitle,
        icon: <MenuBook sx={{ fontSize: "2rem" }} />,
        validation: {},
      }
    );
  }

  if (getProfileData.profileData.role === "teacher") {
    profileFields.push(
      {
        label: " التخصص",
        field: "teacherSpecialization",
        value: getProfileData.profileData.specialization,
        icon: <MenuBook sx={{ fontSize: "2rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال التخصص",
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "التخصص يجب ان يحتوي على حروف فقط",
          },
        },
      },
      {
        label: "سنة التخرج",
        field: "teacherGraduationYear",
        value: getProfileData.profileData.graduationYear,
        icon: <School sx={{ fontSize: "2rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال سنة التخرج",
          },
          pattern: {
            value: /^[0-9]+$/,
            message: "سنة التخرج يجب ان يحتوي على ارقام فقط",
          },
        },
      },
      {
        label: "المؤهل التعليمي",
        field: "educationalQualification",
        value: getProfileData.profileData.educationalQualification,
        icon: <School sx={{ fontSize: "2rem" }} />,
        validation: {
          required: {
            value: true,
            message: "يجب عليك ادخال المؤهل التعليمي",
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
      <ProfileCard sx={{ bgcolor: "rgb(67 56 202)", color: "#fff" }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", fontFamily: "cairo" }}
          >
            بيانات المستخدم
          </Typography>
          <Divider color="white" sx={{ my: 2 }} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              {profileFields.map((detail) => (
                <Grid2 key={uuidv4()} size={{ xs: 12, sm: 6 }}>
                  <>
                    {detail.icon}
                    <FormLabel
                      sx={{
                        fontFamily: "cairo",
                        fontSize: "1.6rem",
                        color: "#fff",
                        mb: 2,
                      }}
                    >
                      {detail.label}
                    </FormLabel>
                    {detail.field !== "levelTitle" ? (
                      <TextField
                        fullWidth
                        {...register(detail.field, {
                          ...detail.validation,
                        })}
                        disabled={
                          (!isEditing && isEmptyField) ||
                          detail.field === "wallet" ||
                          detail.field === "nationalID"
                        }
                        defaultValue={detail.value}
                        slotProps={{
                          input: {
                            sx: {
                              fontFamily: "cairo",
                              fontSize: "1.6rem",
                              color: "#000",
                              backgroundColor: "#fff",
                              borderRadius: "11px",
                              mt: 1,
                              ".MuiInputBase-input": {
                                borderRadius: "11px",
                              },
                              "&.Mui-disabled .MuiOutlinedInput-input": {
                                bgcolor: "#bcbaba",
                              },
                            },
                          },
                        }}
                      />
                    ) : (
                      <>
                        <FormControl fullWidth margin="normal">
                          <Select
                            disabled={!isEditing && isEmptyField}
                            sx={{
                              fontFamily: "cairo",
                              fontSize: "1.6rem",
                              color: "#000",
                              backgroundColor: "#fff",
                              borderRadius: "11px",
                              mt: -1,
                              ".MuiInputBase-input": {
                                borderRadius: "11px",
                              },
                              "&.Mui-disabled .MuiOutlinedInput-input": {
                                bgcolor: "#bcbaba",
                              },
                            }}
                            native
                            defaultValue={detail.value}
                            id="grouped-native-select"
                            label="Grouping"
                          >
                            {levels.map((level) => (
                              <optgroup label={level.title} key={level.id}>
                                {level.subLevels.map((subLevel) => (
                                  <option value={subLevel.id} key={subLevel.id}>
                                    {subLevel.title}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                    )}

                    {errors[detail.field] && (
                      <Typography
                        variant="h6"
                        color="error"
                        sx={{
                          fontFamily: "cairo",
                          fontSize: "1.4rem",
                          mt: 1,
                        }}
                      >
                        {errors[detail.field].message}
                      </Typography>
                    )}

                    {isSavingProfileData && dirtyFields[detail.field] && (
                      <LinearProgress sx={{ mt: 1 }} />
                    )}
                  </>
                </Grid2>
              ))}
              <Button
                variant="contained"
                fullWidth
                type={!isEditing ? "submit" : "button"}
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  fontFamily: "cairo",
                  fontSize: "1.8rem",
                  bgcolor: amber[500],
                  color: "#000",
                  fontWeight: "bold",
                  border: "1px solid #000",
                  "&:hover": {
                    bgcolor: amber[600],
                  },
                  "&:active": {
                    border: "1px solid #000",
                    outline: "1px solid #000",
                  },
                }}
              >
                {!isEditing && isEmptyField ? "تعديل" : "حفظ"}
              </Button>
            </Grid2>
          </form>
          <Divider color="white" sx={{ my: 2 }} />
          <Typography variant="h3" gutterBottom sx={{ fontFamily: "cairo" }}>
            كلمة المرور
          </Typography>
          <Typography variant="h4" sx={{ fontFamily: "cairo" }}>
            قم بتغيير كلمة مرور حسابك.
          </Typography>
          <Divider color="white" sx={{ my: 2 }} />
          <Button
            variant="contained"
            fullWidth
            onClick={() => setPasswordModalOpen(true)}
            sx={{
              mb: 2,
              fontFamily: "cairo",
              fontSize: "1.8rem",
              bgcolor: amber[500],
              color: "#000",
              fontWeight: "bold",
              border: "1px solid #000",
              "&:hover": {
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
                      fontFamily: "cairo",
                      fontSize: "1.6rem",
                      color: "#fff",
                    }}
                  >
                    كلمة المرور الحالية
                  </FormLabel>
                  <TextField
                    fullWidth
                    placeholder="ادخل كلمة المرور الحالية"
                    type={showPassword ? "text" : "password"}
                    sx={{
                      borderRadius: "11px",
                      backgroundColor: "#ffffff",
                      mt: 1,
                      "& .MuiInputBase-input": {
                        color: "black",
                        fontSize: "1.6rem",
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    {...registerResetPassowrd("oldPassword", {
                      required: {
                        value: true,
                        message: "كلمة المرور الحالية مطلوبة",
                      },
                    })}
                  />
                  <FormHelperText
                    error={!!errorsReset.oldPassword}
                    sx={{
                      color: errorsReset.oldPassword ? "red" : "inherit",
                      fontSize: "1.2rem",
                      mt: 0.5,
                      textAlign: "right",
                    }}
                  >
                    {errorsReset.oldPassword
                      ? errorsReset.oldPassword.message
                      : ""}
                  </FormHelperText>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <FormLabel
                    sx={{
                      fontFamily: "cairo",
                      color: "#fff",
                      fontSize: "1.6rem",
                    }}
                  >
                    كلمة المرور الجديدة
                  </FormLabel>
                  <TextField
                    placeholder="ادخل كلمة المرور الجديدة"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    sx={{
                      borderRadius: "11px",
                      backgroundColor: "#ffffff",
                      mt: 1,
                      "& .MuiInputBase-input": {
                        color: "black",
                        fontSize: "1.6rem",
                      },
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    {...registerResetPassowrd("newPassword", {
                      required: {
                        value: true,
                        message: "كلمة المرور الجديدة مطلوبة",
                      },
                      minLength: {
                        value: 8,
                        message: "كلمة المرور يجب الا يقل عن 8 حروف",
                      },
                    })}
                  />
                  <FormHelperText
                    error={!!errorsReset.newPassword}
                    sx={{
                      color: errorsReset.newPassword ? "red" : "inherit",
                      fontSize: "1.2rem",
                      mt: 0.5,
                      textAlign: "right",
                    }}
                  >
                    {errorsReset.newPassword
                      ? errorsReset.newPassword.message
                      : ""}
                  </FormHelperText>
                  {isSavingReset && <LinearProgress sx={{ mt: 1 }} />}
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mb: 2,
                      fontFamily: "cairo",
                      fontSize: "1.8rem",
                      bgcolor: amber[500],
                      color: "#000",
                      fontWeight: "bold",
                      border: "1px solid #000",
                      "&:hover": { bgcolor: amber[600] },
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
            sx={{ fontFamily: "cairo", fontSize: "1.8rem" }}
          >
            إلغاء
          </Button>
        </CardContent>
      </ProfileCard>
      <ToastContainer />
    </Grid2>
  );
}
