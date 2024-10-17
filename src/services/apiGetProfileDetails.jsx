import axios from 'axios';

const API_URL = "https://e-learning-system-iti-production.up.railway.app";

export const getProfileData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/current`, {
      withCredentials: true, 
      headers: {
        "Content-Type": "application/json", 
      
      },
    });

    const {data} = response.data; 
    
    return data; 
  } catch (error) {
    console.error("Error fetching Profile data:", error);
    throw error; 
  }
};
