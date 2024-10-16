import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpValidation from "../validations/SignUpValidation"; 
import InputForm from "../components/InputForm";
import signup from "../../../assets/Online learning-amico.svg";
import Logo from "../../../ui/Logo";
import { Link } from "react-router-dom";
import { useSignup } from "../apis/authAPI";
import { useContext, useEffect, useState } from "react"; 
import {apiGetAllLevels} from '../../../services/apiGetAllLevels'
import SignUpContext from "../../store/signup-context";
import { Spinner } from "@material-tailwind/react";
export default function SignUp() {
  const [levels, setLevel] = useState([]);
  const { type } = useContext(SignUpContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpValidation(type)),
  });

  const { mutate: signupUser, isPending :isSignupPending } = useSignup(type);

  const onSubmit = async (data) => {
    try {
      await signupUser({...data, type});
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubLevel, setSelectedSubLevel] = useState("");

  
 
  useEffect(() => {
    const getAllLevels = async () => {
      const levelsData = await apiGetAllLevels();
      console.log('levelsData:', levelsData);

      setLevel(levelsData);
    };
    getAllLevels();
  }, []);
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
          {type === 'student' ? (

          <>
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
            options={levels.map((level) => ({
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
              options={levels
                .find((level) => level.id === selectedLevel)
                ?.subLevels.map((sub) => ({
                  label: sub.title,
                  value: sub.id,
                }))}
            />
          )}
          </>
          ) : (
            <>
              <InputForm
                label="التخصص"
                type="text"
                placeholder="التخصص"
                error={errors.specialization}
                register={register('specialization')}
              />
              <InputForm
                label="سنة التخرج"
                type="text"
                placeholder="سنة التخرج"
                error={errors.graduationYear}
                register={register('graduationYear')}
              />
              <InputForm
                register={register('educationalQualification')}
                label="المؤهل التعليمي"
                type="text"
                placeholder="المؤهل التعليمي"
                error={errors.educationalQualification}
              />
            </>
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
              disabled={isSignupPending}
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold my-3 p-3 w-full rounded-lg ${isSignupPending ? "flex justify-center " : ""}  `}
            >
              {isSignupPending ? <Spinner  /> : "تسجيل"}
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