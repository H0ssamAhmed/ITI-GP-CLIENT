import * as yup from "yup";

const LoginValidation = yup.object({
  email: yup
    .string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: yup.string().required("كلمة المرور مطلوبة"),
});

export default LoginValidation;
