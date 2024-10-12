import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginValidation from "../validations/LoginValidation"; // Import validation schema
import InputForm from "../components/InputForm"; // Import input component
import signup from "../../../assets/Online learning-amico.svg";
import logo from "../../../assets/Group 3.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../apis/authAPI";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import { jwtDecode } from "jwt-decode"; // Optional: for decoding JWT tokens

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
      const response = await loginUser(data);

      const accessToken = response.data.accessToken;

      // Store the access token in cookies
      Cookies.set("accessToken", accessToken);

      // Decode the token to get user role (ensure you have a 'role' claim in your token)
      const decodedToken = jwtDecode(accessToken);
      const userRole = decodedToken.role; // Adjust based on your token's structure

      console.log("User Role:", userRole);

      if (userRole === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      setLoginError("Login failed. Please check your credentials.");
      console.error(error);
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
