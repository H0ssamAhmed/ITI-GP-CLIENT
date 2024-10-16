import { useState } from "react";
import logo from "../../../assets/Group 3.svg";
import { Input } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { useVerifyOTP, useResendOTP } from "../apis/authAPI";
import { ToastContainer } from "react-toastify";
import signup from "../../../assets/Online learning-amico.svg";
import Logo from "../../../ui/Logo";
import { Spinner } from "@material-tailwind/react";

export default function CodeVerify() {
  const location = useLocation();
  const email = location.state?.email || "";
  const { mutate: verifyOTP, isPending: verifyLoading } = useVerifyOTP();
  const { mutate: resendOTP, isPending: resendLoading } = useResendOTP();
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    try {
      await verifyOTP({ otp, email });
    } catch (e) {
      console.log("Error verifying OTP", e);
    }
  };
  const handleResend = async () => {
    try {
      await resendOTP();
    } catch (e) {
      console.log("Error resending OTP", e);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setOtp(value); // Store as a string
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center h-screen bg-gradient-to-b from-brand-200">
      <div className="flex flex-col text-right lg:w-[30%] w-[90%] h-[60%]">
        <div className="flex items-center justify-start mt-[30px] mb-[30px] w-[100%]">
          <h2 className="text-4xl text-brand-700 font-bold"> تحقق من البريد الالكتروني</h2>
          
          <Logo type="dark" />
        </div>
        <div className="w-[100%]">
          <h2 className="flex items-center justify-start gap-1 text-center text-2xl font-semibold">
            <span className="font-bold">{email}</span> ادخل الكود المكون من 6
            ارقام الذي تم ارساله للبريد الالكتروني
          </h2>

          <div className="mt-[40px] mb-[40px] flex items-center justify-center gap-4 w-[100%]">
            <input
              type="text"
              maxLength={6}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow shadow-md w-[100%] text-center"
              placeholder="ادخل الكود"
            />{" "}
          </div>

          <h2 className="text-right text-blue-gray-500 font-medium ">
            هل لم يستلم الكود؟{" "}
            <span
              className="font-bold cursor-pointer text-indigo-600"
              onClick={handleResend}
            >
              اعادة الارسال
            </span>
          </h2>
        </div>

        <button
          type="submit"
          className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-3 p-3 w-full rounded-lg ${verifyLoading ? "flex justify-center " : ""}  `}
          onClick={handleSubmit}
          disabled={verifyLoading }
        >
          {verifyLoading ? <Spinner />  : "تحقق من البريد الالكتروني"}
        </button>
      </div>
      <img
        src={signup}
        alt="signup"
        className="w-[30%] object-contain  hidden lg:block"
      />
      <ToastContainer />
    </div>
  );
}
