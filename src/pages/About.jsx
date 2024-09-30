import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Grid2,
  IconButton,
  Typography,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';

const carouselData = {
  aboutUs: {
    title: 'منصة ذاكرلي',
    items: [
      {
        primary: 'منصة تعليمية مبتكرة',
        secondary:
          'تهدف إلى تقديم تجربة تعليمية تفاعلية وشاملة لجميع المراحل الدراسية.',
      },
      {
        primary: 'دروس تعليمية مباشرة عبر الإنترنت',
        secondary: 'توفر دروساً مباشرة تغطي جميع المواد والمستويات الدراسية.',
      },
      {
        primary: 'امتحانات تفاعلية',
        secondary:
          'يقدم الموقع امتحانات تفاعلية تساعد في تقييم مستوى الطلاب بشكل مستمر.',
      },
      {
        primary: 'نظام متابعة متكامل لأولياء الأمور',
        secondary:
          'يمكن لأولياء الأمور مراقبة أداء أبنائهم وتقدمهم الأكاديمي بسهولة.',
      },
      {
        primary: 'دعم المعلمين',
        secondary:
          'يتيح للمعلمين تقديم محتوى تعليمي مميز وإدارة عملية تسجيل الحضور والغياب.',
      },
      {
        primary: 'متابعة مستوى الطالب',
        secondary:
          'يمكن للطلاب والمعلمين متابعة التقدم الأكاديمي للطالب واستعراض مدى استيعابهم للدروس.',
      },
      {
        primary: 'بيئة تعليمية متكاملة',
        secondary:
          'يسعى الموقع إلى خلق بيئة تعليمية متكاملة تدعم التواصل بين الطلاب والمعلمين وأولياء الأمور.',
      },
      {
        primary: 'تحسين مستوى التعليم والتعلم',
        secondary:
          'يهدف إلى رفع مستوى التعليم من خلال أدوات ووسائل تعليمية متطورة.',
      },
    ],
  },
  vision: {
    title: 'رؤية منصة ذاكرلي',
    items: [
      {
        primary: 'أن نكون المنصة التعليمية الرائدة',
        secondary: 'تقديم أفضل تجربة تعليم إلكتروني متكامل ومتميز.',
      },
      {
        primary: 'تحسين مستوى التعليم والتعلم',
        secondary:
          'دعم الطلاب في مختلف المراحل الدراسية لتحسين أدائهم الأكاديمي.',
      },
      {
        primary: 'خلق بيئة تعليمية تفاعلية',
        secondary: 'توفير بيئة تعليمية تحفز التفاعل بين الطلاب والمعلمين.',
      },
      {
        primary: 'دمج التكنولوجيا الحديثة',
        secondary: 'استخدام الأدوات التقنية المتقدمة لتعزيز العملية التعليمية.',
      },
      {
        primary: 'تطوير قدرات الطلاب',
        secondary: 'التركيز على تنمية مهارات وقدرات الطلاب التعليمية والشخصية.',
      },
      {
        primary: 'تحفيز التعلم المستمر',
        secondary: 'تشجيع الطلاب على متابعة التعلم والبحث الدائم عن المعرفة.',
      },
    ],
  },
  mission: {
    title: 'هدف منصة ذاكرلي',
    items: [
      {
        primary: 'تقديم محتوى تعليمي متميز يغطي جميع المراحل الدراسية.',
      },
      {
        primary: 'تسهيل عملية التواصل بين الطلاب، المعلمين، وأولياء الأمور.',
      },
      {
        primary: 'متابعة أداء الطلاب بشكل دوري لتحسين مستواهم الأكاديمي.',
      },
      {
        primary:
          'تقديم نظام تقييم دقيق يساهم في معرفة نقاط القوة والضعف لدى الطلاب.',
      },
      {
        primary:
          'تعزيز دور أولياء الأمور في متابعة تقدم أبنائهم من خلال تقارير مفصلة.',
      },
      {
        primary:
          'تسهيل الوصول إلى الدروس والمواد التعليمية عبر الإنترنت في أي وقت ومن أي مكان.',
      },
      {
        primary:
          'بناء مجتمع تعليمي يساهم في تحسين العملية التعليمية باستخدام أحدث الأدوات التكنولوجية.',
      },
    ],
  },
};

export default function About() {
  const sections = Object.keys(carouselData);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sections.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sections.length - 1 : prevIndex - 1
    );
  };

  // Flash animation variants
  const titleAnimation = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  return (
    <Box
      className="carousel-container"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: { xs: '10px', sm: '20px' },
        mt: { xs: '110px', sm: '90px', md: '130px' },
        mb: { xs: '30px' },
        height: { xs: 'auto', sm: '55vh' },
        width: { xs: '95vw', sm: '80vw', md: '80vw', lg: '80vw' },
        maxWidth: '100vw',
        mx: 'auto',
      }}
    >
      {/* Arrow Back Icon */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: { xs: '5px', sm: '7px', md: '25px', lg: '30px' },
          bottom: { xs: '-65px', sm: '190px' },
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          border: '2px solid #1D4ED8',
          width: { xs: '40px', sm: '40px', md: '40px' },
          height: { xs: '40px', sm: '40px', md: '40px' },
          color: 'black',
          '&:hover': {
            backgroundColor: '#1D4ED8',
            color: 'white',
          },
          '&:active': {
            backgroundColor: '#003366',
          },
        }}
      >
        <ArrowBack sx={{ fontSize: { xs: '30px', sm: '30px', md: '30px' } }} />
      </IconButton>

      <Box
        component={motion.div}
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          flex: '1 0 auto',
          textAlign: 'center',
          padding: { xs: '10px', sm: '20px' },
          width: { xs: '100%', sm: '100%', md: '90%' },
        }}
      >
        <motion.div
          {...titleAnimation}
          sx={{
            display: 'inline-block',
            color: '#333',
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', sm: '3.8rem' },
              color: '#1D4ED8',
            }}
          >
            {carouselData[sections[currentIndex]].title}
          </Typography>
        </motion.div>

        <Box
          component={motion.div}
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'tween', duration: 0.8 }}
          sx={{
            height: 'auto',
            maxHeight: '40vh',
            overflowY: 'auto',
            padding: { xs: '10px', sm: '20px' },
            width: '100%',
            mx: '0',

            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
              backgroundColor: '#ddd',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '50%',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f9f9f9',
            },
            '&:hover::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgb(255 215 0)',
            },
          }}
        >
          <Grid container spacing={2}>
            {carouselData[sections[currentIndex]].items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: '8px',
                    border: '1px solid rgb(255 215 0)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.3s, transform 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgb(255 215 0)',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.5rem', sm: '2.2rem' },
                        color: '#555',
                      }}
                    >
                      {item.primary}
                    </Typography>
                    {item.secondary && (
                      <Typography
                        variant="body1"
                        className="secondary-text"
                        sx={{
                          opacity: 0,
                          transform: 'translateY(10px)',
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                          fontSize: { xs: '1rem', sm: '1.5rem' },
                          color: '#777',
                          '&:hover': {
                            opacity: 1,
                            transform: 'translateY(0)',
                          },
                        }}
                      >
                        {item.secondary}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Arrow Forward Icon */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: { xs: '5px', sm: '7px', md: '25px', lg: '30px' },
          bottom: { xs: '-65px', sm: '190px' },
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          border: '2px solid #1D4ED8',
          width: { xs: '40px', sm: '40px', md: '40px' },
          height: { xs: '40px', sm: '40px', md: '40px' },
          color: 'black',
          '&:hover': {
            backgroundColor: '#1D4ED8',
            color: 'white',
          },
          '&:active': {
            backgroundColor: '#003366',
          },
        }}
      >
        <ArrowForward
          sx={{ fontSize: { xs: '30px', sm: '30px', md: '30px' } }}
        />
      </IconButton>
    </Box>
  );
}
