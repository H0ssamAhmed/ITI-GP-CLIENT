import axios from "axios";

// Function to login and get the access token from the server and store it in cookies
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login-user",
      { email, password }
    );

    const accessToken = response.data.accessToken;

    // Set token in cookies (expires in 1 hour)
    document.cookie = `access-token=${accessToken}; path=/; max-age=3600; SameSite=Lax`;

    return accessToken;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};
