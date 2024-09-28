import * as yup from "yup";

const SignUpValidation = yup.object({
  name: yup.string().required("الاسم مطلوب"),
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
  nationalID: yup.string().required("رقم الهوية مطلوب"),
  level: yup.string().required("المرحلة مطلوبة"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "كلمات المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
});

export default SignUpValidation;
