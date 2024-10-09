import AxiosInstance from "../../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  startLoading,
  authSuccess,
  authFailure,
  setUserRole,
} from "../slices/authSlice";

const loginUser = async (userData) => {
  try {
    const response = await AxiosInstance.post("/auth/login-user", userData,{  withCredentials: true });
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
      "/auth/create-student",
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
    const response = await AxiosInstance.post("/auth/verify-otp", userData, {
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
    const response = await AxiosInstance.post("/auth/resend-otp", {
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
    },
  });
};

export const useVerifyOTP = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: verifyOTP,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(authSuccess(data));
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to verify OTP")
      );
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      const { role } = data;
      dispatch(setUserRole(role));

      dispatch(authSuccess(data));
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to log in")
      );
    },
  });
};

export const useSignup = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: signupUser,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(authSuccess(data));
    },
    onError: (error) => {
      dispatch(
        authFailure(error.response?.data?.message || "Failed to sign up")
      );
    },
  });
};
