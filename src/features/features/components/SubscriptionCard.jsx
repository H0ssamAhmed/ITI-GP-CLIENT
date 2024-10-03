import {
  Badge,
  Box,
  Card,
  CardContent,
  styled,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const DiscountBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: '#ff6f61',
  color: '#fff',
  padding: '5px 10px',
  borderRadius: '5px',
  fontSize: '14px',
}));

function SubscriptionCard({ cardData }) {
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
          position: 'relative',
          boxShadow: 3,
          height: '400px',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={cardData.image}
            alt={cardData.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <DiscountBadge>{cardData.discount}</DiscountBadge>
        </Box>

        <CardContent>
          <Badge
            badgeContent={cardData.badgeText}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            overlap="circular"
            sx={{
              color: '#673ab7',
              backgroundColor: '#ede7f6',
              borderRadius: '5px',
              padding: '5px 10px',
              fontWeight: 'bold',
              '& .MuiBadge-badge': {
                fontSize: '1.2rem',
              },
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: '#1a237e',
              fontWeight: 'bold',
              marginTop: '10px',
              fontSize: '1.7rem',
            }}
          >
            {cardData.level}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              marginTop: '5px',
              color: '#424242',
              fontWeight: 'bold',
              fontSize: '1.4rem',
            }}
          >
            {cardData.title}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: '15px', fontSize: '1.2rem' }}
          >
            {cardData.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                textDecoration: 'line-through',
                color: '#b0bec5',
                fontSize: '1.2rem',
              }}
            >
              {cardData.oldPrice}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '1.4rem' }}
            >
              {cardData.newPrice}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SubscriptionCard;
