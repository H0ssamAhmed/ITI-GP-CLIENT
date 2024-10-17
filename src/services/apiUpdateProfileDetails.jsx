import axios from 'axios';

const API_URL = 'https://e-learning-system-iti-production.up.railway.app';

export const updateProfileData = async (data) => {
  try {
  
    const response = await axios.patch(
      `${API_URL}/user/profile`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          
        },
      }
    );

    return response.data.data; 
  } catch (error) {
  
    if (error.response) {
      console.error('Error updating Profile data:', error.response.data.message || error.message);
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Something went wrong'}`);
    } else {
      console.error('Error updating Profile data:', error.message);
      throw error;
    }
  }
};
