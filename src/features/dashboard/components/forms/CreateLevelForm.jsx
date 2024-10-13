import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const CreateLevelForm = ({ isOpen, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields: subLevels, append } = useFieldArray({
    control,
    name: "subLevels",
  });

  const onSubmit = (data) => {
    onSave(data);
    onClose();
  };

  const handleAddSubLevel = () => {
    append({ title: "" });
  };

  return isOpen ? (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white relative rounded-lg shadow-lg w-full max-w-3xl p-8 overflow-y-auto max-h-[90vh]">
        <button
          className="absolute text-gray-400 top-1 right-3 hover:text-gray-500 duration-300 transition-all"
          onClick={onClose}
        >
          &#10006;
        </button>
        <h2 className="text-[2rem] font-bold mt-2 mb-4">
          👨‍🎓 إنشاء مرحلة دراسية
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[1.3rem] font-medium mb-1">
              المرحلة الدراسية
            </label>
            <input
              type="text"
              {...register("title", {
                required: "عنوان المرحلة مطلوب",
              })}
              placeholder="عنوان المرحلة الدراسية"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">الصفوف الدراسية</h3>
            {subLevels.map((subLevel, index) => (
              <div key={subLevel.id} className="mb-2">
                <input
                  type="text"
                  {...register(`subLevels.${index}.title`, {
                    required: "عنوان الصف مطلوب",
                  })}
                  placeholder={`الصف الدراسي رقم ${index + 1}`}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                />
                {errors.subLevels && errors.subLevels[index] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subLevels[index].title.message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubLevel}
              className="mt-2 px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600"
            >
              أضف فصل دراسي
            </button>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              إنشاء
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default CreateLevelForm;
