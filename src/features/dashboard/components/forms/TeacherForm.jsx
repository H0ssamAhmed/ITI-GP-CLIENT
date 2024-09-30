import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "اسم المستخدم يجب على الأقل أن يكون مكون من 3 أحرف")
    .max(20, "اسم المستخدم لا يجب أن يزيد عن 20 حرف")
    .required("اسم المستخدم مطلوب"),
  email: yup
    .string()
    .email("البريد الإلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  password: yup
    .string()
    .min(8, "الرقم السري يجب أن يكون أكبر من 8 أرقام")
    .required("الرقم السري مطلوب"),
  firstName: yup
    .string()
    .min(1, "هذا الحقل مطلوب")
    .required("الاسم الأول مطلوب"),
  lastName: yup
    .string()
    .min(1, "هذا الحقل مطلوب")
    .required("اسم العائلة مطلوب"),
  phoneNumber: yup
    .string()
    .matches(
      /^(010|011|012|015)[0-9]{8}$/,
      "رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويكون مكون من 11 رقم"
    )
    .required("رقم الهاتف مطلوب"),
  address: yup.string().min(1, "هذا الحقل مطلوب").required("العنوان مطلوب"),
  birthday: yup.date().required("تاريخ الميلاد مطلوب"),
  sex: yup
    .string()
    .oneOf(["male", "female", "other"], "يجب اختيار الجنس بشكل صحيح")
    .required("الجنس مطلوب"),
  image: yup
    .mixed()
    .required("الصورة مطلوبة")
    .test("fileType", "الملف يجب أن يكون صورة", (value) => {
      return value && value instanceof File;
    })
    .test("fileSize", "الملف يجب أن يكون أقل من 2MB", (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB
    }),
});

const TeacherForm = ({ type, table }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    toast.success("تم إرسال النموذج بنجاح!");
    console.log(data);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">أضف {table} جديد</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Username */}
          <div>
            <label className="block text-gray-700">اسم المستخدم</label>
            <input
              {...register("username")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="اسم المستخدم"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">البريد الإلكتروني</label>
            <input
              {...register("email")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              placeholder="البريد الإلكتروني"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">الرقم السري</label>
            <input
              {...register("password")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              placeholder="الرقم السري"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-700">الاسم الأول</label>
            <input
              {...register("firstName")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="الاسم الأول"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700">اسم العائلة</label>
            <input
              {...register("lastName")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="اسم العائلة"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">رقم الهاتف</label>
            <input
              {...register("phoneNumber")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="رقم الهاتف"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700">العنوان</label>
            <input
              {...register("address")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="العنوان"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Birthday */}
          <div>
            <label className="block text-gray-700">تاريخ الميلاد</label>
            <input
              {...register("birthday")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.birthday ? "border-red-500" : "border-gray-300"
              }`}
              type="date"
            />
            {errors.birthday && (
              <p className="mt-1 text-sm text-red-500">
                {errors.birthday.message}
              </p>
            )}
          </div>

          {/* Sex */}
          <div>
            <label className="block text-gray-700">الجنس</label>
            <select
              {...register("sex")}
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.sex ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">اختر الجنس</option>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
              <option value="other">أخرى</option>
            </select>
            {errors.sex && (
              <p className="mt-1 text-sm text-red-500">{errors.sex.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700">تحميل الصورة</label>
            <input
              {...register("image")}
              type="file"
              className={`block w-full px-4 py-2 mt-2 border rounded-lg ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-lg bg-brand-500"
          >
            تسجيل
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TeacherForm;
