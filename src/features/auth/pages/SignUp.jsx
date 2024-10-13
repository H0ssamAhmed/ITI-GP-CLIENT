import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpValidation from "../validations/SignUpValidation"; 
import InputForm from "../components/InputForm";
import signup from "../../../assets/Online learning-amico.svg";
import Logo from "../../../ui/Logo";
import { Link } from "react-router-dom";
import { useSignup } from "../apis/authAPI";
import { useState } from "react"; 
import {  ToastContainer } from "react-toastify";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpValidation),
  });

  const { mutate: signupUser, isLoading } = useSignup();

  const onSubmit = async (data) => {
    try {
      await signupUser(data);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubLevel, setSelectedSubLevel] = useState("");

  const levelsData = [
    {
      id: "17fcf78b-aeb1-48ac-8044-555c5a413fb9",
      title: "المرحله الثانوية",
      subLevels: [
        {
          id: "17fcf78b-aeb1-48ac-8044-555c5a413fb9",
          title: "الصف الاول الثانوي",
        },
        {
          id: "a8dea5b4-ca88-4884-be18-7748387f6cfb",
          title: "الصف الثالث الثانوي",
        },
        {
          id: "db311981-84e9-4877-96eb-8944ce59e2e1",
          title: "الصف الثاني الثانوي",
        },
      ],
    },
    {
      id: "5a073624-80c6-4570-8288-7e270bc87ff3",
      title: "المرحله الاعدادية",
      subLevels: [
        {
          id: "70c99a0a-d19a-4c1d-baff-581b01c83243",
          title: "الصف الاول الأعدادي",
        },
        {
          id: "7f494b20-9e6e-45f8-9b63-860602176628",
          title: "الصف الثاني الأعدادي",
        },
        {
          id: "f569d4ce-30da-4250-ae86-5bf7b0aa6dd8",
          title: "الصف الثالث الأعدادي",
        },
      ],
    },
  ];

  const handleLevelChange = (e) => {
    const selected = e.target.value;
    setSelectedLevel(selected);
    setSelectedSubLevel("");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center h-screen bg-gradient-to-b from-brand-200 overflow-y-auto">
      <div className="flex flex-col text-right lg:w-[30%] w-[90%] h-[100%]">
        <div className="flex items-center justify-start mt-[30px] mb-[30px] w-[100%]">
          <h2 className="text-4xl text-brand-700 font-bold">تسجيل حساب جديد</h2>
          <Logo type="dark" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="text-right w-[100%]"
        >
          <div className="flex flex-col lg:flex-row lg:justify-items-between gap-4">
            <InputForm
              label="الاسم الاول"
              type="text"
              placeholder="اسمك"
              error={errors.firstName}
              register={register("firstName")}
            />
            <InputForm
              label="الاسم الثاني"
              type="text"
              placeholder="اسمك"
              error={errors.lastName}
              register={register("lastName")}
            />
          </div>
          <InputForm
            label="البريد الإلكتروني"
            type="email"
            placeholder="بريدك الإلكتروني"
            error={errors.email}
            register={register("email")}
          />
          <InputForm
            label="رقم الهاتف"
            type="text"
            placeholder="رقم الهاتف"
            error={errors.phoneNumber}
            register={register("phoneNumber")}
          />
          <InputForm
            label="الرقم القومي"
            type="text"
            placeholder="الرقم القومي"
            error={errors.nationalID}
            register={register("nationalID")}
          />
          <InputForm
            label="رقم الهاتف ولي الأمر"
            type="text"
            placeholder="رقم الهاتف ولي الأمر"
            error={errors.parentPhoneNumber}
            register={register("parentPhoneNumber")}
          />

          {/* Level Selection */}
          <InputForm
            label="المرحلة"
            type="select"
            placeholder="اختر المرحلة"
            error={errors.levelId}
            register={register("levelId", { onChange: handleLevelChange })} // Handle level change
            options={levelsData.map((level) => ({
              label: level.title,
              value: level.id,
            }))}
          />

          {/* Sub-level Selection (Dynamic based on selected level) */}
          {selectedLevel && (
            <InputForm
              label="اختر الصف"
              type="select"
              placeholder="اختر الصف"
              error={errors.subLevelId}
              register={register("subLevelId")}
              options={levelsData
                .find((level) => level.id === selectedLevel)
                ?.subLevels.map((sub) => ({
                  label: sub.title,
                  value: sub.id,
                }))}
            />
          )}

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
              className="w-full p-3 my-3 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700"
            >
              {isLoading ? "جاري التسجيل..." : "تسجيل"}
            </button>
          </div>
        </form>
        <p className="text-center">
          هل لديك حساب؟{" "}
          <Link to="/login" className="text-brand-700">
            تسجيل الدخول
          </Link>
        </p>
      </div>
      <img
        src={signup}
        alt="signup"
        className="w-[30%] object-contain hidden lg:block"
      />
      <ToastContainer />
    </div>
  );
}
