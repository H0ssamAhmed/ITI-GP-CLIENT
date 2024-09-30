import { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
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
import { useQuery } from '@tanstack/react-query';
import { getProfileData } from '../../../services/apiGetProfileDetails';
export default function ProfileDetails() {
  const [editingField, setEditingField] = useState(null);
  const {
    isPending,
    data: profileData,
    error,
  } = useQuery({
    queryKey: ['profileData'],
    queryFn: getProfileData,
  });

  const handleEditClick = (field) => setEditingField(field);
  const handleSaveClick = () => {
    setEditingField(null);
  };

  if (isPending) {
    return <div>Loading...</div>;
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
        label: 'الاسم',
        field: 'fullName',
        value: `${profileData.firstName} ${profileData.lastName}`,
        icon: faCircleUser,
        isName: true,
      },
      {
        label: 'البريد الإلكتروني',
        field: 'email',
        value: profileData.email,
        icon: faEnvelope,
      },
      {
        label: 'رقم الهاتف',
        field: 'phone',
        value: profileData.phone,
        icon: faPhone,
      },
      {
        label: 'الرقم القومي',
        field: 'nationalID',
        value: profileData.nationalID,
        icon: faIdCard,
      },
      {
        label: 'كلمة المرور',
        field: 'password',
        value: profileData.password,
        icon: faLock,
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
        icon: faPhone,
      },
      {
        label: 'المحفظة',
        field: 'wallet',
        value: profileData.wallet,
        icon: faWallet,
      },
      {
        label: 'الصف الدراسي',
        field: 'level',
        value: profileData.level,
        icon: faGraduationCap,
      }
    );
  }

  if (profileData.role === 'teacher') {
    profileFields.push(
      {
        label: ' التخصص',
        field: 'teacherSpecialization',
        value: profileData.specialization,
        icon: faChalkboardTeacher,
      },
      {
        label: 'سنة التخرج',
        field: 'teacherGraduationYear',
        value: profileData.graduationYear,
        icon: faChalkboardTeacher,
      },
      {
        label: 'المؤهل التعليمي',
        field: 'educationalQualification',
        value: profileData.educationalQualification,
        icon: faChalkboardTeacher,
      },
      {
        label: ' المستويات',
        field: 'levels',
        value: profileData.levels,
        icon: faChalkboardTeacher,
      }
    );
  }

  return (
    <Box>
      {profileFields.map((detail) => (
        <ProfileDetail
          key={detail.field}
          {...detail}
          editingField={editingField}
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
        />
      ))}
    </Box>
  );
}
