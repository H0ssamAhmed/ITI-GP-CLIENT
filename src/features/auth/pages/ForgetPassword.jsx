import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ForgetPasswordValidation from "../validations/ForgetPassword"; // Import validation schema
import InputForm from "../components/InputForm"; // Import input component
import signup from "../../../assets/Online learning-amico.svg";
import logo from "../../../assets/Group 3.svg";
import Logo from "../../../ui/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgetPasswordValidation),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center h-screen bg-gradient-to-b from-brand-200">
      <div className="flex flex-col text-right justify-center lg:w-[30%] w-[90%] h-[100%]">
        <div className="flex items-center justify-end  mb-[30px] w-[100%]">
          <h2 className="text-4xl text-brand-700 font-bold">اعاده تعيين كلمه المرور</h2>
          <Logo type="dark" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="text-right w-[100%]">
          <InputForm
            label="كلمة المرور"
            type="password"
            placeholder="كلمة المرور"
            error={errors.password}
            register={register("password")}
          />
          <InputForm
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="تأكيد كلمة المرور"
            error={errors.confirmPassword}
            register={register("confirmPassword")}
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-3 p-3 w-full rounded-lg"
            >
              تغيير كلمة المرور
            </button>
          </div>
        </form>
      </div>
      <img src={signup} alt="signup" className="w-[30%] object-contain hidden lg:block" />
    </div>
  );
};

export default ForgetPassword;
