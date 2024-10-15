import axios from 'axios';

const API_URL = 'http://localhost:3000';

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
