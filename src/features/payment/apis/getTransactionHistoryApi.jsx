import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getTransactionHistoryApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/wallet/transactions`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    
    return response.data.transactions || []; 
  } catch (error) {
    console.error('Error fetching transaction history:', error.response ? error.response.data : error.message);
    throw error;
  }
};
