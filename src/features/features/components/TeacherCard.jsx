import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { amber, indigo } from '@mui/material/colors';

const TeacherCard = ({ title, description, imagePath }) => {
  return (
    <Box
      sx={{
        perspective: 1000,
        width: { xs: '250px', sm: '250px', md: '230px', lg: '300px' },
        height: { xs: '350px', sm: '350px', md: '310px', lg: '280px' },
        margin: 'auto',
      }}
    >
      <motion.div
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Face - Image */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            zIndex: 2,
          }}
        >
          <Card sx={{ width: '100%', height: '100%' }}>
            <motion.div
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src={imagePath}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </motion.div>
          </Card>
        </Box>

        {/* Back Face - Text */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            zIndex: 1,
          }}
        >
          <Card
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              backgroundColor: '#fff',
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  textAlign: 'center',
                  mb: 1.4,
                  fontFamily: 'cairo',
                  fontWeight: 'bold',
                  color: '#333',
                  '&:hover': {
                    color: amber[700],
                    textDecoration: 'underline',
                    textUnderlineOffset: '7px',
                  },
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                  textAlign: 'center',
                  fontFamily: 'cairo',
                  lineHeight: 1.6,
                  color: '#555',
                  '&:hover': {
                    color: indigo[800],
                    textDecoration: 'underline',
                    textUnderlineOffset: '7px',
                  },
                }}
              >
                {description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Box>
  );
};

export default TeacherCard;
