import axios from 'axios';

const API_URL = "http://localhost:3000";

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
