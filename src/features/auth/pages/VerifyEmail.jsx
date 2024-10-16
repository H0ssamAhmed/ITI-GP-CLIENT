import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidation from "../validations/LoginValidation"; // Import validation schema
import InputForm from "../components/InputForm"; // Import input component
import signup from "../../../assets/Online learning-amico.svg";
import logo from "../../../assets/Group 3.svg";
import { useVerifyEmailForgetPassword} from "../apis/authAPI";
import Logo from "../../../ui/Logo";
import { Spinner } from "@material-tailwind/react";

export default function VerifyEmail() {
  const {
    register: registerForgetPassword,
    handleSubmit: handleSubmitForgetPassword,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(LoginValidation),
  });

  const { mutate: verifyEmailForgetPassword , isPending:isForgetPending } = useVerifyEmailForgetPassword();


  const onSubmit = (data) => {
    console.log(data);
    verifyEmailForgetPassword(data);

 };

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center h-screen bg-gradient-to-b from-brand-200  ">

      <div className="flex flex-col text-right  justify-items-center lg:w-[30%] w-[90%] h-[60%]">
        <div className=" flex  items-center justify-start  mt-[30px] mb-[30px] w-[100%] ">
        <h2 className="text-4xl text-brand-700 font-bold">اعاده تعيين كلمه المرور</h2>


          <Logo type="dark" />
        </div>
       
        <form
          onSubmit={handleSubmitForgetPassword(onSubmit)}
          
          className="text-right w-[100%] "
        >
          <InputForm
            label="البريد الإلكتروني"
            type="email"
            placeholder="بريدك الإلكتروني"
            register={registerForgetPassword("email")}
          />
          <button
            type="submit"
            disabled={isForgetPending}
            className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-3 p-3 w-full rounded-lg ${isForgetPending ? "flex justify-center " : ""}  `}

          >
            {!isForgetPending ? "ارسال" : <Spinner  />}
          </button>
        </form>
      </div>
      <img
        src={signup}
        alt="signup"
        className="w-[30%] object-contain  hidden lg:block"
      />
    </div>
  );
}
