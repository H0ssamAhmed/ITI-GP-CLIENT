import * as yup from "yup";

const ForgetPasswordValidation = yup.object({
  password: yup
    .string()
    .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "يجب أن تكون كلمة المرور 6 أحرف على الأقل وتحتوي على حروف كبيرة وصغيرة ورقم ورمز"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "كلمات المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
});

export default ForgetPasswordValidation;
