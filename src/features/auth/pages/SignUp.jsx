import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpValidation from "../validations/SignUpValidation";
import InputForm from "../components/InputForm";
import signup from "../../../assets/Online learning-amico.svg";
import Logo from "../../../ui/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../apis/authAPI";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
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
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const [selectedLevel, setSelectedLevel] = useState("");
  const levels = [
    {
      title: "المرحلة الابتدائية",
      value: "level1",
      subLevels: [
        { title: "الصف الأول الابتدائي", value: "sublevel1" },
        { title: "الصف الثاني الابتدائي", value: "sublevel2" },
        { title: "الصف الثالث الابتدائي", value: "sublevel3" },
        { title: "الصف الرابع الابتدائي", value: "sublevel4" },
        { title: "الصف الخامس الابتدائي", value: "sublevel5" },
        { title: "الصف السادس الابتدائي", value: "sublevel6" },
      ],
    },
    {
      title: "المرحلة الإعدادية",
      value: "level2",
      subLevels: [
        { title: "الصف الأول الإعدادي", value: "sublevel7" },
        { title: "الصف الثاني الإعدادي", value: "sublevel8" },
        { title: "الصف الثالث الإعدادي", value: "sublevel9" },
      ],
    },
    {
      title: "المرحلة الثانوية",
      value: "level3",
      subLevels: [
        { title: "الصف الأول الثانوي", value: "sublevel10" },
        { title: "الصف الثاني الثانوي", value: "sublevel11" },
        { title: "الصف الثالث الثانوي", value: "sublevel12" },
      ],
    },
  ];

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };
  const selectedLevelData = levels.find(
    (level) => level.value === selectedLevel
  );

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

          <InputForm
            label="المرحلة"
            type="select"
            placeholder="اختر المرحلة"
            error={errors.levelId}
            register={register("levelId", { onChange: handleLevelChange })}
            options={levels.map((level) => ({
              label: level.title,
              value: level.value,
            }))}
          />

          {selectedLevel && selectedLevelData && (
            <InputForm
              label="اختر الصف"
              type="select"
              placeholder="اختر الصف"
              error={errors.levelId}
              register={register("levelId")}
              options={selectedLevelData.subLevels.map((sublevel) => ({
                label: sublevel.title,
                value: sublevel.value,
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
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-3 p-3 w-full rounded-lg"
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
    </div>
  );
}
