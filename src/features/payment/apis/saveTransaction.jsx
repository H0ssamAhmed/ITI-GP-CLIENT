import axios from 'axios';

const API_URL = 'https://e-learning-system-iti-production.up.railway.app';

export const saveTransaction = async (transactionData) => {
  try {
    const response = await axios.post(
      `${API_URL}/student/wallet/transactions`,
      transactionData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error('Error saving transaction:', error.response ? error.response.data : error.message);
    throw error;
  }
};
