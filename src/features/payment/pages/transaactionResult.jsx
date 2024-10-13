import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { saveTransaction } from '../apis/saveTransaction';

export const TransactionResult = () => {
  const requiredData = [
    'id',
    'success',
    'currency',
    'amount_cents',
    'updated_at',
  ];
  const data = {};
  const searchParams = new URLSearchParams(window.location.search);
  for (let [key, value] of searchParams) {
    if (requiredData.includes(key)) {
      if (key === 'id') {
        value = parseInt(value);
      }
      if (key === 'amount_cents') {
        value = parseInt(value);
      }
      if (key === 'updated_at') {
        value = new Date(value);
      }
      if (key === 'success') {
        value = value === 'true';
      }
      data[key] = value;
    }
  }
  console.log(data);

  useEffect(() => {
    const handleTransaction = async () => {
      try {
        await saveTransaction(data);
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    };
    handleTransaction();
  }, [data]);
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          {status === 'success'
            ? 'Transaction Successful'
            : 'Transaction Failed'}
        </Typography>
        <Typography variant="body1">message</Typography>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Transaction Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">Transaction ID:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                transaaction id
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Amount:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">
                ${'amount'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()} // Go back
          sx={{ mr: 2 }}
        >
          Go Back
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => alert('View More Transactions')} // Placeholder for viewing more transactions
        >
          View More Transactions
        </Button>
      </Box>
    </Container>
  );
};
