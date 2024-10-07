import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidation from "../validations/LoginValidation"; // Import validation schema
import InputForm from "../components/InputForm"; // Import input component
import signup from "../../../assets/Online learning-amico.svg";
import logo from "../../../assets/Group 3.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../apis/authAPI";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      // Call loginUser function
      const accessToken = await loginUser(data.email, data.password);

      // Assuming the backend returns the role in the response
      const userRole = parseJwt(accessToken).role; // Assuming the token has a 'role' field

      if (userRole === "admin") {
        // Redirect to admin dashboard
        navigate("/dashboard/admin");
      } else {
        // Redirect to user dashboard
        navigate("/user/dashboard");
      }
    } catch (error) {
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  // Function to decode JWT (if your token is a JWT and includes role information)
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-around h-screen lg:flex-row bg-gradient-to-b from-brand-200 ">
      <div className="flex flex-col text-right  justify-items-center lg:w-[30%] w-[90%] h-[60%]">
        <div className=" flex  items-center justify-end  mt-[30px] mb-[60px] w-[100%] ">
          <h2 className="text-4xl font-bold text-brand-700 ">
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

          {loginError && <p className="text-red-500">{loginError}</p>}
          <Link
            to={"/reset-password"}
            className="text-right text-brand-700"
            href="/"
          >
            نسيت كلمة المرور؟
          </Link>

          <button
            type="submit"
            className="w-full p-3 my-10 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700"
          >
            تسجيل الدخول
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
    </div>
  );
}
