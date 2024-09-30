import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { amber, indigo } from '@mui/material/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfileData } from '../../../services/apiUpdateProfileDetails';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const amberBgColor = amber[300];
const indigoColor = indigo[500];

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
    if (isName) {
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            value={fieldValue.firstName || ''}
            onChange={(e) =>
              setFieldValue((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }))
            }
            label="الاسم الأول"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.5rem',
              },
              '& .MuiInputLabel-root': {
                fontSize: '1.5rem',
                fontWeight: 'bold',
              },
            }}
          />
          <TextField
            variant="outlined"
            size="small"
            value={fieldValue.lastName || ''}
            onChange={(e) =>
              setFieldValue((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }))
            }
            label="الاسم الأخير"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.5rem',
              },
              '& .MuiInputLabel-root': {
                fontSize: '1.5rem',
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      );
    } else {
      return (
        <TextField
          variant="outlined"
          size="small"
          value={fieldValue || ''}
          onChange={handleInputChange}
          label={label}
          fullWidth
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '1.5rem',
            },
            '& .MuiInputLabel-root': {
              fontSize: '1.5rem',
              fontWeight: 'bold',
            },
          }}
        />
      );
    }
  };
  return (
    <Box
      key={field}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 12px',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: amberBgColor,
        },
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <FontAwesomeIcon
          icon={icon}
          style={{ color: indigoColor, fontSize: '1.4rem' }}
        />
        {editingField === field ? (
          renderInputFields()
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#555',
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            {label} : {value}
          </Typography>
        )}
      </Box>

      {isSaving ? (
        <CircularProgress size={24} />
      ) : (
        <Button
          variant="text"
          sx={{
            color: indigoColor,
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
          onClick={() =>
            editingField === field ? handleSave() : handleEditClick(field)
          }
        >
          {editingField === field ? 'حفظ' : 'تعديل'}
        </Button>
      )}
    </Box>
  );
}

ProfileDetail.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  editingField: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleSaveClick: PropTypes.func.isRequired,
  isName: PropTypes.bool.isRequired,
};
