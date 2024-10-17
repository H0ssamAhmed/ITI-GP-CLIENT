import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "https://e-learning-system-iti-production.up.railway.app/";

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}user/current`, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}user/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(`Failed to log out`);
    }
  } catch (error) {
    console.error(`Logout error:`, error);
    throw new Error(
      error.response?.data?.message || `An error occurred while logging out`
    );
  }
};
