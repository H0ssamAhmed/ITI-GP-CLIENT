import { Avatar, Button } from '@mui/material';
import { amber, indigo } from '@mui/material/colors';

// colors
const amberBgColor = amber[300];
const indigoColor = indigo[500];

export default function ProfilePicture() {
  return (
    <>
      <Avatar
        alt="Profile Picture"
        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        sx={{
          width: { xs: 100, sm: 100 },
          height: { xs: 100, sm: 100 },
          borderRadius: '50%',
          border: `4px solid  ${indigoColor}`,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      />
      <Button
        variant="contained"
        className="upload-button"
        sx={{
          width: { xs: '30%', sm: '22%', md: '100%', lg: '80%' },
          fontSize: {
            xs: '1.8rem',
            sm: '1.7rem',
            md: '1.5rem',
            lg: '1.5rem',
          },
          fontWeight: 'bold',
          py: 0.5,
          mt: 1,
          backgroundColor: indigoColor,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: amberBgColor,
            color: indigoColor,
          },
        }}
      >
        تغيير الصورة
      </Button>
    </>
  );
}
