import { useRef, useState } from "react";
import signup from "../../../assets/Online learning-amico.svg";
import logo from "../../../assets/Group 3.svg";
import { Input } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { useVerifyOTP, useResendOTP } from "../apis/authAPI"; // Import the custom hook
import { useNavigate } from "react-router-dom";

export default function CodeVerify() {
  const location = useLocation();
  const email = location.state?.email || "";
  const { mutate: verifyOTP, isLoading } = useVerifyOTP();
  const { mutate: resendOTP, isLoading: resendLoading } = useResendOTP();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  function handleBackspace(event, index) {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }
  const handleSubmit = async () => {
    // const otpCode = otp.join(""); // Join OTP digits into a single string
    // if (otpCode.length === 6) {
    try {
      await verifyOTP({ otp: otp }); // Call the mutation with email and OTP
      navigate("/login");
    } catch (e) {
      console.log("Error verifying OTP", e);
    }
    // } else {
    //   console.log("Invalid OTP");
    // }
  };
  const handleResend = async () => {
    await resendOTP();
  };
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center h-screen bg-gradient-to-b from-brand-200">
      <div className="flex flex-col text-right lg:w-[30%] w-[90%] h-[60%]">
        <div className="flex items-center justify-end mt-[30px] mb-[60px] w-[100%]">
          <h2 className="text-4xl text-brand-700 font-bold">
            مرحبا بك مجددا في مجتمع ذاكرلي
          </h2>
          <img src={logo} alt="logo" className="w-[20%] object-contain" />
        </div>
        <div className="w-[100%]">
          <h2 className="flex items-center justify-center gap-1 text-center text-2xl font-semibold">
            <span className="font-bold">{email}</span> ادخل الكود المكون من 6
            ارقام الذي تم ارساله للبريد الالكتروني
          </h2>

          <div className="mt-[40px] mb-[40px] flex items-center justify-center gap-4 w-[100%]">
            {/* {otp.map((digit, index) => (
              <div key={index}>
                <Input
                  type="text"
                  maxLength={1}
                  className="w-14  h-14 rounded-lg border border-gray-300 text-center text-xl font-bold shadow-lg transition-all focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
              </div>
            ))} */}
            <Input
              type="text"
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <h2 className="text-center text-blue-gray-500 font-medium ">
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
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 w-full rounded-lg mt-10 transition-all duration-300"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "جارٍ التحقق..." : "ارسل كود التفعيل"}
        </button>
      </div>
    </div>
  );
}
