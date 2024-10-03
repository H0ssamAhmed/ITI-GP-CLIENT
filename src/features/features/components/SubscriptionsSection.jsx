import React from 'react';
import { Typography, Box, Grid2 } from '@mui/material';
import { Grid, margin, styled } from '@mui/system';
import SubscriptionCard from './SubscriptionCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import sub_1 from '../../../assets/FeaturesPage/subscriptions/sub_1.jpg';
import sub_2 from '../../../assets/FeaturesPage/subscriptions/sub_2.jpg';
import sub_3 from '../../../assets/FeaturesPage/subscriptions/sub_3.jpg';
import sub_4 from '../../../assets/FeaturesPage/subscriptions/sub_4.avif';
import subscriptionOffer from '../../../assets/FeaturesPage/subscriptions/subscriptionOffer.avif';
import { grey } from '@mui/material/colors';
const cardData = [
  {
    image: sub_1,
    level: 'الصف الرابع الابتدائي',
    title: 'انجليزي الصف الرابع الابتدائي – منصة الدرس',
    description: 'انجليزي الصف الرابع الابتدائي – منصة الدرس ...',
    oldPrice: '280,00 EGP',
    newPrice: '140,00 EGP',
    badgeText: 'ابتدائي',
    discount: '50%',
  },
  {
    image: sub_2,
    level: 'الصف الخامس الابتدائي',
    title: 'لغة عربية الصف الخامس الابتدائي (الترم الاول)',
    description: 'لغة عربية الصف الخامس الابتدائي (الترم الاول)...',
    oldPrice: '5,000,00 EGP',
    newPrice: '3,500,00 EGP',
    badgeText: 'ابتدائي',
    discount: '30%',
  },
  {
    image: sub_3,
    level: 'الصف الرابع الابتدائي',
    title: 'تكنولوجيا المعلومات والاتصالات - الصف الرابع الابتدائي',
    description:
      'شرح مادة تكنولوجيا المعلومات والاتصالات للصف الرابع الابتدائي الترم ...',
    oldPrice: '5,000,00 EGP',
    newPrice: '3,500,00 EGP',
    badgeText: 'ابتدائي',
    discount: '30%',
  },
  {
    image: sub_4,
    level: 'الصف الرابع الابتدائي',
    title: 'دراسات اجتماعية الصف الرابع الابتدائي (الترم الاول)',
    description:
      'شرح لمنهج الدراسات الاجتماعية للصف الرابع الابتدائي الترم الاول كامل...',
    oldPrice: '5,000,00 EGP',
    newPrice: '3,500,00 EGP',
    badgeText: 'ابتدائي',
    discount: '30%',
  },
];

const SubscriptionsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ marginTop: '50px' }}
    >
      <Grid2 container spacing={0}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'right',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: grey[300],
              fontFamily: 'cairo',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3.5rem' },
            }}
          >
            آخر اشتراكات الطلاب
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <img src={subscriptionOffer} alt="" width={'100%'} />
        </Grid2>
      </Grid2>
      <Box
        sx={{
          padding: '40px 20px',
          backgroundColor: '#f4f6f9',
          textAlign: 'right',
          direction: 'rtl',
        }}
      >
        <Grid2 container spacing={3}>
          {cardData.map((card, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <SubscriptionCard key={index} cardData={card} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </motion.div>
  );
};

export default SubscriptionsSection;
