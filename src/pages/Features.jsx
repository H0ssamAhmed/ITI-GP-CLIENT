import { motion } from 'framer-motion';
import { Box, Button, Grid2, Typography } from '@mui/material';
import CastForEducationTwoToneIcon from '@mui/icons-material/CastForEducationTwoTone';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';
import FeatureDescription from '../features/features/components/FeaturesDescription';
import HighlightedText from '../features/features/components/HighlightedText';
import { amber, pink } from '@mui/material/colors';
import TeacherCard from '../features/features/components/TeacherCard';
import person_1 from '../assets/FeaturesPage/person_1.jpeg';
import person_2 from '../assets/FeaturesPage/person_2.avif';
import person_3 from '../assets/FeaturesPage/person_3.jpg';
import person_4 from '../assets/FeaturesPage/person_4.jpg';
import LessonsSection from '../features/features/components/LessonsSection';
import SubscriptionsSection from '../features/features/components/subscriptionsSection';
import {useNavigate} from 'react-router-dom';
const featureItems = [
  {
    icon: (
      <CastForEducationTwoToneIcon
        sx={{ fontSize: '3rem', ml: 1 }}
        color="success"
      />
    ),
    text: (
      <>
        تعليمك أسهل وأمتع مع <HighlightedText text="منصة ذاكرلي" />
      </>
    ),
  },
  {
    icon: (
      <PersonSearchTwoToneIcon
        sx={{ fontSize: '3.2rem', ml: 1 }}
        color="secondary"
      />
    ),
    text: (
      <>
        اكتشف تجربة تعليمية فريدة وملهمة مع{' '}
        <HighlightedText text="منصة ذاكرلي" />
      </>
    ),
  },
  {
    icon: (
      <>
        <VerifiedTwoToneIcon
          sx={{ fontSize: '3.2rem', ml: 1 }}
          color="success"
        />
      </>
    ),
    text: 'نقدم لك دروسًا تفاعلية واختبارات إلكترونية، بالإضافة إلى شروحات مباشرة مع أفضل المعلمين في المجال.',
  },
  {
    icon: (
      <DevicesTwoToneIcon
        sx={{ fontSize: '3.2rem', ml: 1 }}
        style={{ color: pink[500] }}
      />
    ),
    text: 'تعلم بطرق مرنة وسهلة، وحقق أهدافك التعليمية بكل يسر.',
  },
  {
    icon: (
      <AccessTimeFilledTwoToneIcon
        sx={{ fontSize: '3.2rem', ml: 1 }}
        color="primary"
      />
    ),
    text: (
      <>
        نظم مواعيدك بسهولة، وابدأ رحلتك نحو التفوق مع{' '}
        <HighlightedText text="منصة ذاكرلي" /> <HighlightedText text="اليوم" />
      </>
    ),
  },
];

const cardDescriptions = [
  {
    id: 1,
    title: 'المعلم المتخصص',
    description:
      'استمتع بالتعلم على يد أفضل المعلمين المتخصصين في مختلف المواد الدراسية على منصة ذاكرلي.',
    imagePath: person_1,
  },
  {
    id: 2,
    title: 'أساليب تعليم مبتكرة',
    description:
      'تقدم منصة ذاكرلي أساليب تعليم تفاعلية ومبتكرة تجمع بين التعليم الإلكتروني والمباشر.',
    imagePath: person_2,
  },
  {
    id: 3,
    title: 'تجربة تعليمية شاملة',
    description:
      'نوفر لك بيئة تعليمية شاملة تضم اختبارات إلكترونية، شروحات مباشرة، ودروس تفاعلية.',
    imagePath: person_3,
  },
  {
    id: 4,
    title: 'أفضل الأدوات التعليمية',
    description:
      'احصل على أفضل الأدوات والمواد التعليمية مع منصة ذاكرلي لتحقيق نجاحك الأكاديمي.',
    imagePath: person_4,
  },
];

export default function Features() {
  const navigate = useNavigate();
const handleSignup = () => {
  
  navigate('/signup');
}
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 pr-8"
      >
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
            {featureItems.map((item, index) => (
              <FeatureDescription
                key={index}
                icon={item.icon}
                text={item.text}
              />
            ))}

            <Box mt={9}>
              <Typography variant="body" sx={{ fontSize: '2rem' }}>
                {' '}
                ماذا تنتظر ؟ سارع بالتسجيل
              </Typography>
              <Button
                variant="outlined"
                color="primary" 
                onClick={handleSignup}
                sx={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  fontFamily: 'Helvetica',
                  borderRadius: '30px',
                  mr: 2,
                  '&:hover': {
                    backgroundColor: amber[300],
                  },
                }}
              >
                سجل حساب جديد
              </Button>
            </Box>
          </Grid2>
          <Grid2 container spacing={2} size={{ xs: 12, sm: 12, md: 6 }}>
            {cardDescriptions.map((card) => (
              <Grid2
                key={card.id}
                size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
                sx={{ textAlign: 'left' }}
              >
                <TeacherCard
                  title={card.title}
                  description={card.description}
                  imagePath={card.imagePath}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </motion.div>
      {/* lessons section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <LessonsSection />

        <SubscriptionsSection />
      </motion.div>
    </>
  );
}
