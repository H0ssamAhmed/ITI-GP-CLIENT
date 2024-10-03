import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from '@mui/material';
import { amber } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { v4 as uuidv4 } from 'uuid';

const priceStyle = {
  backgroundColor: '#e53935',
  borderRadius: '20px',
  padding: '10px',
  color: 'white',
  display: 'inline-block',
  marginRight: '10px',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  position: 'absolute',
  top: '0px',
  left: '-40px',
  zIndex: 1,
  transform: 'rotate(-50deg)',
  minWidth: '60px',
};

const LessonCard = ({ cardData }) => {
  const { level, description, price, generalButton, imagePath } = cardData;
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
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 500,
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#f2f5fc',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
          direction: 'rtl',
          borderRadius: '8px',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{
              color: '#1a237e',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {level}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: amber[900],
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: { xs: '1.5rem', sm: '1.8rem' },
            }}
          >
            دروس مباشرة و تفاعلية + اختبارات ومتابعة
          </Typography>

          {description.map((desc) => (
            <Typography
              key={uuidv4()}
              sx={{
                fontSize: { xs: '1.4rem', sm: '1.6rem' },
                lineHeight: 1.6,
                mb: 3,
                listStyle: 'circle',
                display: 'list-item',
                fontFamily: 'cairo',
              }}
            >
              {desc}
            </Typography>
          ))}

          <Grid2 container spacing={2} sx={{ marginTop: '20px' }}>
            <Grid2 item xs={12}>
              <Box sx={{ position: 'relative' }}>
                <Typography sx={priceStyle}>{price}</Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#1e88e5',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.5rem', sm: '1.7rem', md: '1.5rem' },
                    mb: 3,
                    '&:hover': {
                      backgroundColor: amber[300],
                      color: 'black',
                    },
                  }}
                >
                  <ArrowBackIcon sx={{ ml: 1, fontSize: '2rem' }} />
                  {generalButton}
                </Button>
              </Box>
            </Grid2>
            <Grid2 item xs={12}>
              <CardMedia
                component="img"
                image={imagePath}
                alt="Description"
                sx={{
                  borderRadius: '5px',
                  width: '100%',
                  objectFit: 'cover',
                  height: '200px',
                  scale: 1.1,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  '&:hover': {
                    scale: 1.1,
                  },
                }}
              />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LessonCard;
