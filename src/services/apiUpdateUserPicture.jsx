const API_URL = "https://e-learning-system-iti-production.up.railway.app";
import axios from "axios";
export const updateUserPicture = async (file) => {
  const formData = new FormData();
  
  formData.append("image", file);
  try {
    
    const response = await axios.patch(`${API_URL}/user/profile`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  } catch (error) {
    
    if (error.response) {
      console.error(
        "Error updating Profile data:",
        error.response.data.errors.error || error.message
      );
      throw new Error(
        `Error ${error.response.status}: ${
            error.response.data.errors.error || "Something went wrong"
        }`
      );
    } else {
      console.error("Error updating Profile data:", error.message);
      throw error.response.data.errors.error;
    }
  }
};
