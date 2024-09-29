import * as yup from "yup";

const SignUpValidation = yup.object({
  FName: yup
    .string()
    .required("الاسم الاول مطلوب")
    .min(3, "يجب أن يكون الاسم على 3 أحرف على الأقل")
    .max(20, "يجب أن يكون الاسم على 20 أحرف على الأكثر")
  ,
  LName: yup
    .string()
    .required("الاسم الثاني مطلوب")
    .min(3, "يجب أن يكون الاسم على 3 أحرف على الأقل")
    .max(20, "يجب أن يكون الاسم على 20 أحرف على الأكثر")
  ,
  email: yup
    .string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: yup
    .string()
    .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "يجب أن تكون كلمة المرور 6 أحرف على الأقل وتحتوي على حروف كبيرة وصغيرة ورقم ورمز"
    ),
  phone: yup
    .string()
    .matches(/^(\+?[0-9]{1,3})?([0-9]{10})$/, "رقم الهاتف غير صالح")
    .required("رقم الهاتف مطلوب"),

  parentPhone: yup
    .string()
    .matches(/^(\+?[0-9]{1,3})?([0-9]{10})$/, "رقم الهاتف غير صالح")
    .required("هاتف ولي الامر مطلوب"),

  nationalID: yup.string().required("رقم الهوية مطلوب"),
  level: yup.string().required("المرحلة مطلوبة"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "كلمات المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
});

export default SignUpValidation;
