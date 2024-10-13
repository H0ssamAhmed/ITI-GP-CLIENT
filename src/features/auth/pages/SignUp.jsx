import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SignUpValidation from '../validations/SignUpValidation'; // Import validation schema
import InputForm from '../components/InputForm'; // Import input component
import signup from '../../../assets/Online learning-amico.svg';
import logo from '../../../assets/Group 3.svg';
import Logo from '../../../ui/Logo';
import { Link } from 'react-router-dom';
export default function SignUp() {
  const [levels, setLevel] = useState([]);
  const { type } = useContext(SignUpContext);
  console.log(getSignUpValidationSchema(type));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getSignUpValidationSchema(type)),
  });

  const onSubmit = (data) => {
    console.log(data);

    mutate(data);
  };
  const { mutate } = useMutation({
    mutationFn: (data) => apiCreateUser(data, type),
    onSuccess: (message) => {
      toast.success(message || 'تم تسجيل حسابك بنجاح');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  //  get levels data
  useEffect(() => {
    const getAllLevels = async () => {
      const levelsData = await apiGetAllLevels();
      console.log('levelsData:', levelsData);
      const levelsArray = levelsData.map((level) => {
        return { label: level.title, value: level.id };
      });
      setLevel(levelsArray);
    };
    getAllLevels();
  }, []);

  return (
    <div className="flex flex-col items-center justify-around h-screen lg:flex-row bg-gradient-to-b from-brand-200 ">
      <div className="flex flex-col text-right  justify-items-around lg:w-[30%] w-[90%] h-[100%]">
        <div className=" flex  items-center justify-end  mt-[30px] mb-[30px] w-[100%] ">
          <h2 className="text-4xl font-bold text-brand-700 ">
            تسجيل حساب جديد
          </h2>
          <Logo type="dark" />
          {/* <img src={logo} alt="signup" className="w-[20%] object-contain" /> */}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="text-right w-[100%] "
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-items-between">
            <InputForm
              label=" الاسم الاول"
              type="text"
              placeholder="اسمك"
              error={errors.firstName}
              register={register('firstName')}
            />
            <InputForm
              label="الاسم الثاني"
              type="text"
              placeholder="اسمك"
              error={errors.lastName}
              register={register('lastName')}
            />
          </div>
          <InputForm
            label="البريد الإلكتروني"
            type="email"
            placeholder="بريدك الإلكتروني"
            error={errors.email}
            register={register('email')}
          />
          <InputForm
            label="رقم الهاتف"
            type="text"
            placeholder="رقم الهاتف"
            error={errors.phoneNumber}
            register={register('phoneNumber')}
          />
          <InputForm
            label="الرقم القومي"
            type="text"
            placeholder="الرقم القومي"
            error={errors.nationalID}
            register={register('nationalID')}
          />
          {type === 'student' ? (
            <>
              <InputForm
                label="رقم الهاتف ولي الأمر"
                type="text"
                placeholder="رقم الهاتف ولي الأمر"
                error={errors.parentPhoneNumber}
                register={register('parentPhoneNumber')}
              />

              <InputForm
                label="المرحلة"
                type="select"
                placeholder="اختر المرحلة"
                error={errors.levelId}
                register={register('levelId')}
                options={levels}
              />
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
            register={register('password')}
          />
          <InputForm
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="تأكيد كلمة المرور"
            error={errors.confirmPassword}
            register={register('confirmPassword')}
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full p-3 my-3 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700"
            >
              تسجيل
            </button>
          </div>
        </form>
        <p className="text-center">
          هل لديك حساب؟{' '}
          <Link to={'/login'} className="text-brand-700">
            تسجيل الدخول
          </Link>
        </p>
      </div>
      <img
        src={signup}
        alt="signup"
        className="w-[30%] object-contain   hidden lg:block"
      />
      <ToastContainer />
    </div>
  );
}
