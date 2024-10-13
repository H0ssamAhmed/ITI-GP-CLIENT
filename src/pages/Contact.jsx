import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios.post("Put url", data);
    console.log(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center h-screen p-4"
    >
      <div className="grid grid-cols-12 container  w-full h-full items-center justify-center">
        <div className="col-span-12 md:col-span-6">
          <h1 className="px-1 sm:px-4 md:px-6 py-6 text-6xl font-extrabold text-brand-600">
            اتصل بنا
          </h1>
          <p className="px-1 sm:px-4 md:px-6 py-4 font-bold">
            يمكنك طرح أي سؤال أو مشكلة توجهها أو اقتراح لتطوير التطبيق عبر
            النموذج أسفله، سنحاول الرد عليك في أقرب وقت ممكن.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="py-6 px-2">
            <input
              type="text"
              placeholder="الاسم"
              className="w-full p-2 mt-10 rounded-sm broder border-2 outline-none  border-brand-200 focus:border-brand-700  focus:outline-none  focus:border-1 transition-all"
              {...register("name", {
                required: "الاسم مطلوب",
                minLength: {
                  value: 3,
                  message: "يجب أن يحتوي الاسم على 3 أحرف على الأقل",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-[1.5rem]">
                {errors.name.message}
              </span>
            )}

            <input
              type="email"
              placeholder="البريد الالكتروني"
              className="w-full p-2 mt-10 rounded-sm broder border-2 outline-none  border-brand-200 focus:border-brand-700  focus:outline-none  focus:border-1 transition-all"
              {...register("email", {
                required: "البريد الالكتروني مطلوب",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "صيغة بريد غير صالحة",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-[1.5rem]">
                {errors.email.message}
              </span>
            )}

            <input
              type="text"
              placeholder="رقم الهاتف"
              className="w-full p-2 mt-10 rounded-sm broder border-2 outline-none  border-brand-200 focus:border-brand-700  focus:outline-none  focus:border-1 transition-all"
              {...register("phone", {
                required: "رقم الهاتف مطلوب",
                validate: (value) =>
                  /^01[0,1,2,5][0-9]{8}$/.test(value) ||
                  "رقم الهاتف غير صالح يجب ان يكون 11 رقم",
              })}
            />
            {errors.phone && (
              <span className="text-red-500 text-[1.5rem]">
                {errors.phone.message}
              </span>
            )}

            <textarea
              placeholder="الرسالة"
              rows="6"
              className="w-full p-2 mt-10 rounded-sm broder border-2 outline-none  border-brand-200 focus:border-brand-700  focus:outline-none  focus:border-1 transition-all"
              {...register("message", { required: "الرسالة مطلوبة" })}
            />
            {errors.message && (
              <span className="text-red-500 text-[1.5rem]">
                {errors.message.message}
              </span>
            )}

            <input
              type="submit"
              value="ارسال"
              className="w-full p-2 mt-10 rounded-sm broder-none bg-brand-500 text-white cursor-pointer transition-colors duration-400 hover:bg-brand-700 hover:text-white font-semibold"
            />
          </form>
        </div>
        <div className="col-span-12 md:col-span-6">
          <img src="/src/assets/contact.png" />
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
