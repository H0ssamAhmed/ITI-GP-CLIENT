import axios from 'axios';

const API_URL = 'https://e-learning-system-iti-production.up.railway.app';

export const chargeWalletApi = async (amount) => {
  try {
    const response = await axios.post(
      `${API_URL}/student/wallet/charge`,
      { amount },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.payment_url; 
  } catch (error) {
    console.error('Error charging wallet:', error.response ? error.response.data : error.message);
    throw error;
  }
};
