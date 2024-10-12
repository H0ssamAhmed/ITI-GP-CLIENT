import AxiosInstance from "../../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from "react-redux";
import {
  startLoading,
  authSuccess,
  authFailure,
  setUserRole,
} from "../slices/authSlice";
const verifyEmailForgetPassword = async (userData) => {
  try {
    const response = await AxiosInstance.post("user/forget-password", userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const response = await AxiosInstance.post("user/auth/login-user", userData,{  withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


const signupUser = async (userData) => {
  try {
    const response = await AxiosInstance.post(
      "student/auth/signup",
      userData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const verifyOTP = async (userData) => {
  try {
    const response = await AxiosInstance.post("student/auth/verify-otp", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const resendOTP = async function () {
  try {
    const response = await AxiosInstance.post("student/auth/resend-otp", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useResendOTP = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: resendOTP,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(authSuccess(data));
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to resend OTP")
      );
      toast.error(error.response?.data?.message || "Failed to resend OTP", {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export const useVerifyOTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: verifyOTP,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(authSuccess(data));
      navigate("/login");
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to verify OTP")
      );
      toast.error(error.response?.data?.message || "Failed to verify OTP", {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      const { role } = data;
      dispatch(setUserRole(role));

      dispatch(authSuccess(data));
      navigate("/");
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to log in")
      );
      toast.error(error.response?.data?.message || "Failed to log in", {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: signupUser,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(authSuccess(data));
      navigate("/verify-otp", { state: { email: data.email } });
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to sign up")
      );
      toast.error(error.response?.data?.message || "Signup failed", {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export const useVerifyEmailForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyEmailForgetPassword,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(authSuccess(data));
      navigate("/forget-password");
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to verify email")
      );
      toast.error(error.response?.data?.message || "Failed to verify email", {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

      });
    },
  });
};