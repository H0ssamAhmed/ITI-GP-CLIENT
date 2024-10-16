import { useState } from 'react';
// import signup from "../../../assets/Online learning-amico.svg";
import logo from '../../../assets/Group 3.svg';
import { Input } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import { useVerifyOTP, useResendOTP } from '../apis/authAPI';
import { ToastContainer } from 'react-toastify';

export default function CodeVerify() {
  const location = useLocation();
  const email = location.state?.email || '';
  const { mutate: verifyOTP, isLoading: verifyLoading } = useVerifyOTP();
  const { mutate: resendOTP, isLoading: resendLoading } = useResendOTP();
  const [otp, setOtp] = useState('');

  const handleSubmit = async () => { 
    try {
      await verifyOTP({ otp, email }); // Include email here
    } catch (e) {
      console.log('Error verifying OTP', e);
    }
  };
  const handleResend = async () => {
    try {
      await resendOTP();
    } catch (e) {
      console.log('Error resending OTP', e);
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
            <Input type="text" maxLength={6} onChange={handleChange} />
          </div>

          <h2 className="text-center text-blue-gray-500 font-medium ">
            هل لم يستلم الكود؟{' '}
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
          // disabled={isLoading}
        >
          ارسل كود التفعيل
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
