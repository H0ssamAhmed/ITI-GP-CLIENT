import AxiosInstance from "../../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import {
  startLoading,
  authSuccess,
  authFailure,
  setUserRole,
} from "../slices/authSlice";
import { useContext } from "react";
import SignUpContext from "../../store/signup-context";
import { set } from "react-hook-form";
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
    const response = await AxiosInstance.post(
      "user/auth/login-user",
      userData,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signupUser = async (userData) => {
  let endpoint;
  try {
    if (userData.type === "student") {
      endpoint = `student/auth/signup`;
    } else if (userData.type === "teacher") {
      endpoint = `teacher/auth/signup`;
    } else {
      throw new Error("Invalid user type");
    }
    const response = await AxiosInstance.post(endpoint, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const verifyOTP = async (userData) => {
  try {
    const response = await AxiosInstance.post(
      "student/auth/verify-otp",
      userData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// const resendOTP = async function () {
//   try {
//     const response = await AxiosInstance.post("student/auth/resend-otp", {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
const resendOTP = async function () {
  try {
    const response = await fetch(
      "http://localhost:3000/student/auth/resend-otp",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to resend OTP");
    }

    const data = await response.json();
    return data;
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
      toast.success(data.message || "تم ارسال رمز التحقق بنجاح");
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
      toast.success(data.message || "تم التسجيل بنجاح");
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
      toast.success(data.message || "تم تسجيل الدخول بنجاح");
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

export const useSignup = (type) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { type } = useContext(SignUpContext);
  return useMutation({
    mutationFn: signupUser,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(authSuccess(data));
      toast.success(data.message || "تم التسجيل بنجاح");
      if (type === "student") {
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: data.email } });
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      // navigate('/verify-otp', { state: { email: data.email } });
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
      toast.success(data.message || "تم التسجيل بنجاح");
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
