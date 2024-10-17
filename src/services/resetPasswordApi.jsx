import axios from 'axios';

const API_URL = 'https://e-learning-system-iti-production.up.railway.app';

export const resetPasswordApi = async (data) => {

  try {
    const response = await axios.post(`${API_URL}/user/reset-password`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.message; 
  } catch (error) {
    if (error.response) {
      console.error('Error resetting password:', error.response.data.message || error.message);
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Something went wrong'}`);
    } else {
      console.error('Error resetting password:', error.message);
      throw error;
    }
  }
};
