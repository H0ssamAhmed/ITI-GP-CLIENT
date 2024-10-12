import axios from "axios";

// Create AxiosInstance with custom config
const API = axios.create({
  baseURL: "http://localhost:3000", // Replace with your actual base URL

  withCredentials: true, // Send cookies along with requests if needed
});

// Function to login and get the access token from the server and store it in cookies
export const registerStudent = (data) => API.post("student/auth/signup", data);
export const verifyOtp = (data) => API.post("student/auth/verify-otp", data);
export const resendOtp = () => API.post("student/auth/resend-otp");
export const loginUser = (data) => API.post("/user/auth/login-user", data);
export const logoutUser = () => API.post("user/auth/logout");
