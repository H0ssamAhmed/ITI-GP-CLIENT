import axios from 'axios';

const API_URL = 'https://e-learning-system-iti-production.up.railway.app';

export const getStudentBalance = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/wallet`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data.wallet.balance; 
  } catch (error) {
    console.error('Error fetching student balance:', error.response ? error.response.data : error.message);
    throw error;
  }
};
