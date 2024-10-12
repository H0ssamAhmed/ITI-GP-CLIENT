import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidation from "../validations/LoginValidation";
import InputForm from "../components/InputForm";
import signup from "../../../assets/Online learning-amico.svg";
import logo from "../../../assets/Group 3.svg";
import { Link } from "react-router-dom";
import { useLogin } from "../apis/authAPI";
import { ToastContainer } from "react-toastify";
// import { useSelector } from "react-redux";

export default function Login() {
  // const userRole = useSelector((state) => state.auth.role);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });
  const { mutate: loginUser, isLoading } = useLogin();
  const onSubmit = async (data) => {
    try {
      await loginUser(data);
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  // console.log(userRole)
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center h-screen bg-gradient-to-b from-brand-200  ">
      <div className="flex flex-col text-right  justify-items-center lg:w-[30%] w-[90%] h-[60%]">
        <div className=" flex  items-center justify-end  mt-[0px] mb-[60px] w-[100%] ">
          <h2 className="text-4xl text-brand-700 font-bold  ">
            مرحبا بك مجددا في مجتمع ذاكرلي{" "}
          </h2>
          <img src={logo} alt="signup" className="w-[20%] object-contain" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="text-right w-[100%] "
        >
          <InputForm
            label="البريد الإلكتروني"
            type="email"
            placeholder="بريدك الإلكتروني"
            error={errors.email}
            register={register("email")}
          />

          <InputForm
            label="كلمة المرور"
            type="password"
            placeholder="كلمة المرور"
            error={errors.password}
            register={register("password")}
          />
          <Link
            to={"/forget-password-email"}
            className="text-brand-700 text-right"
            href="/"
          >
            نسيت كلمة المرور؟
          </Link>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-10 p-3 w-full rounded-lg"
          >
            {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
        <p className="text-center">
          هل ليس لديك حساب؟{" "}
          <Link to="/signup" className="text-brand-700">
            انشئ حساب
          </Link>
        </p>
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
