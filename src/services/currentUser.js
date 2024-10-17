import axios from "axios";
import { useSelector } from "react-redux";

export const getCurrentUser = async () => {
  const response = await axios.get("https://e-learning-system-iti-production.up.railway.app", {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/user/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error("Failed to log out");
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred while logging out"
    );
  }
};
