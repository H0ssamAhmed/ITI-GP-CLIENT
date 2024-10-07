import AxiosInstance from "../../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { startLoading, authSuccess, authFailure } from "../slices/authSlice";

const loginUser = async (userData) => {
  try {
    const response = await AxiosInstance.post("/auth/login-user", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signupUser = async (userData) => {
  try {
    const response = await AxiosInstance.post("/auth/create-student", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation(loginUser, {
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
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

  return useMutation(signupUser, {
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

