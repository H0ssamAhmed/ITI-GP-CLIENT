import { Box, Container, Grid2, Typography } from '@mui/material';
import React from 'react';
import LessonCard from './LessonCard';
import student_1 from '../../../assets/FeaturesPage/students/student_1.webp';
import student_2 from '../../../assets/FeaturesPage/students/student_2.avif';
import student_3 from '../../../assets/FeaturesPage/students/student_3.jpg';
import student_4 from '../../../assets/FeaturesPage/students/student_4.webp';
import student_5 from '../../../assets/FeaturesPage/students/student_5.webp';
import student_6 from '../../../assets/FeaturesPage/students/student_6.jpeg';
import students from '../../../assets/FeaturesPage/students/students.avif';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { getLessons } from '../../../services/apiGetLessons';
const cardData = [
  {
    level: 'الصف الرابع الابتدائي',
    description: [
      'الاشتراك في جميع مواد الصف الرابع الابتدائي للفيديوهات المسجلة والمباشرة',
      'الاختبارات الالكترونية ومتابعة مستمرة من المنصة وتسھيل التقارير على ولي الامر لمتابعة مستوى الطالب',
      'هدية ٨ دروس مجانية مباشرة لاختيار المدرسين للحصص المباشرة مع المدرسين',
    ],
    price: '١٥٠ جنيه',
    generalButton: 'مواد الرابع الابتدائي عام',
    experimentalButton: 'مواد الرابع الابتدائي تجريبي',
    imagePath: student_1,
  },
  {
    level: 'الصف الخامس الابتدائي',
    description: [
      'الاشتراك في جميع مواد الصف الخامس الابتدائي للفيديوهات المسجلة والمباشرة',
      'الاختبارات الالكترونية ومتابعة مستمرة من المنصة وتسھيل التقارير على ولي الامر لمتابعة مستوى الطالب',
      'هدية ١٠ دروس مجانية مباشرة لاختيار المدرسين للحصص المباشرة مع المدرسين',
    ],
    price: '٢٠٠ جنيه',
    generalButton: 'مواد الخامس الابتدائي عام',
    experimentalButton: 'مواد الخامس الابتدائي تجريبي',
    imagePath: student_2,
  },
  {
    level: 'الصف السادس الابتدائي',
    description: [
      'الاشتراك في جميع مواد الصف السادس الابتدائي للفيديوهات المسجلة والمباشرة',
      'الاختبارات الالكترونية ومتابعة مستمرة من المنصة وتسھيل التقارير على ولي الامر لمتابعة مستوى الطالب',
      'هدية ١٢ درس مجاني مباشر لاختيار المدرسين للحصص المباشرة مع المدرسين',
    ],
    price: '٢٥٠ جنيه',
    generalButton: 'مواد السادس الابتدائي عام',
    experimentalButton: 'مواد السادس الابتدائي تجريبي',
    imagePath: student_3,
  },
  {
    level: 'الصف الرابع الابتدائي',
    description: [
      'الاشتراك في جميع مواد الصف الرابع الابتدائي للفيديوهات المسجلة والمباشرة',
      'الاختبارات الالكترونية ومتابعة مستمرة من المنصة وتسھيل التقارير على ولي الامر لمتابعة مستوى الطالب',
      'هدية ١٥ درس مجاني مباشر لاختيار المدرسين للحصص المباشرة مع المدرسين',
    ],
    price: '٣٠٠ جنيه',
    generalButton: 'مواد الرابع الابتدائي عام',
    experimentalButton: 'مواد الرابع الابتدائي تجريبي',
    imagePath: student_4,
  },
  {
    level: 'الصف الاول الاعدادي',
    description: [
      'الاشتراك في جميع مواد الصف الاول الاعدادي للفيديوهات المسجلة والمباشرة',
      'الاختبارات الالكترونية ومتابعة مستمرة من المنصة وتسھيل التقارير على ولي الامر لمتابعة مستوى الطالب',
      'هدية ١٨ درس مجاني مباشر لاختيار المدرسين للحصص المباشرة مع المدرسين',
    ],
    price: '٣٥٠ جنيه',
    generalButton: 'مواد الاول الاعدادي عام',
    experimentalButton: 'مواد الاول الاعدادي تجريبي',
    imagePath: student_5,
  },
  {
    level: 'الصف الثالث الاعدادي',
    description: [
      'الاشتراك في جميع مواد الصف الثالث الاعدادي للفيديوهات المسجلة والمباشرة',
      'الاختبارات الالكترونية ومتابعة مستمرة من المنصة وتسھيل التقارير على ولي الامر لمتابعة مستوى الطالب',
      'هدية ٢٠ درس مجاني مباشر لاختيار المدرسين للحصص المباشرة مع المدرسين',
    ],
    price: '٤٠٠ جنيه',
    generalButton: 'مواد الثالث الاعدادي عام',
    experimentalButton: 'مواد الثالث الاعدادي تجريبي',
    imagePath: student_6,
  },
];

function LessonsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    data: lessons,
    isPending: isFethcingLessons,
    isError,
    error,
  } = useQuery({
    queryKey: ['lessons'],
    queryFn: getLessons,
    refetchOnWindowFocus: true,
    retry: false,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // if (isFethcingLessons) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Typography
        sx={{
          fontSize: '3rem',
          fontWeight: 'bold',
          fontFamily: 'cairo',
          my: 6,
        }}
      >
        ماذا نقدم لطلابنا ؟
      </Typography>
      <Container maxWidth="lg">
        <Box
          component="img"
          src={students}
          alt="students"
          sx={{
            width: '100%',
            height: { xs: 'auto', md: '400px' },
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
      </Container>
      <Container sx={{ marginTop: '40px' }}>
        <Grid2 container spacing={4}>
          {[...Array(6)].map((_, index) => (
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }} key={index}>
              <LessonCard
                cardData={cardData[index]}
                key={cardData[index].level}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </motion.div>
  );
}

export default LessonsSection;
