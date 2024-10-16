import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { createCourse, fetchAllLevels } from "../dashboardAPI";
import { CircularProgress } from "@mui/material";

const CreateCourseList = ({ initialData }) => {
  const [levels, setLevels] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [variant, setVariant] = useState("plain");

  const {
    mutate: createCourseMutate,
    isLoading: isCreatingCourse,
    isError: isErrorCourse,
    isPending: isCoursePending,
  } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.warn("تم إنشاء الكورس وسيتم مراجعته وموافاتك بالرد");
    },
    onError: (error) => {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 409) {
          toast.error("هذا الكورس موجود بالفعل");
        } else if (error.response.data) {
          const backendErrorMessage = error.response.data.error;
          toast.error(backendErrorMessage);
        } else {
          toast.error("حدث خطأ أثناء إنشاء الكورس");
        }
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      image: initialData?.image || "",
      discountedPrice: initialData?.discountedPrice || "",
      levelId: initialData?.levelId || "",
      sections: initialData?.sections || [],
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  useEffect(() => {
    const getLevels = async () => {
      try {
        const fetchedLevels = await fetchAllLevels();
        setLevels(Array.isArray(fetchedLevels.data) ? fetchedLevels.data : []);
      } catch (error) {
        console.error("Failed to fetch levels:", error);
        setLevels([]);
      }
    };

    getLevels();
  }, []);

  const onSubmit = (data) => {
    const courseData = {
      title: data.title,
      description: data.description,
      price: +data.price,
      discountedPrice: +data.discountedPrice,
      levelId: data.levelId,
      image: imageFile,
      sections: data.sections.map((section) => ({
        title: section.title,
        description: section.description,
      })),
    };

    console.log("Course Data:", courseData);
    console.log("Image File:", imageFile);
    createCourseMutate(courseData);
  };

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h2 className="mb-8 text-[3rem] text-center font-bold  text-brand-500">
        إنشاء كورس جديد 👨‍🏫
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block mb-2 text-[1.9rem] text-sm font-semibold text-right">
            عنوان الكورس
          </label>
          <input
            {...register("title", { required: "العنوان مطلوب" })}
            type="text"
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
            placeholder="أدخل عنوان الدورة"
          />
          {errors.title && (
            <span className="text-[1rem] text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-[1.9rem] mb-2 text-sm font-semibold text-right">
            وصف الكورس
          </label>
          <textarea
            {...register("description", { required: "الوصف مطلوب" })}
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
            placeholder="أدخل وصف الدورة"
          ></textarea>
          {errors.description && (
            <span className="text-[1rem] text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Course Price */}
        <div>
          <label className="block text-[1.9rem] mb-2 text-sm font-semibold text-right">
            سعر الكورس
          </label>
          <input
            {...register("price", { required: "السعر مطلوب" })}
            type="number"
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
            placeholder="أدخل سعر الدورة"
          />
          {errors.price && (
            <span className="text-[1rem] text-red-500">
              {errors.price.message}
            </span>
          )}
        </div>

        {/* Discounted Price */}
        <div>
          <label className="block text-[1.9rem] mb-2 text-sm font-semibold text-right">
            السعر بعد الخصم
          </label>
          <input
            {...register("discountedPrice")}
            type="number"
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
            placeholder="أدخل السعر بعد الخصم"
          />
          {errors.discountedPrice && (
            <span className="text-[1rem] text-red-500">
              {errors.discountedPrice.message}
            </span>
          )}
        </div>

        <div>
          <label className="block mb-2 text-[1.9rem] text-sm font-semibold text-right">
            صورة الكورس
          </label>
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
          />
        </div>

        {/* Course Level */}
        <div>
          <label className="block text-[1.9rem] mb-2 text-sm font-semibold text-right">
            المستوى الدراسي
          </label>
          <select
            {...register("levelId", { required: "يرجى اختيار المستوى" })}
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
          >
            <option value="">اختر المستوى</option>
            {levels.map((level) =>
              level.subLevels.map((subLevel) => (
                <option key={subLevel.id} value={subLevel.id}>
                  {subLevel.title}
                </option>
              ))
            )}
          </select>
          {errors.levelId && (
            <span className="text-[1rem] text-red-500">
              {errors.levelId.message}
            </span>
          )}
        </div>

        {/* Sections */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-right">الوحدة</h3>
          <button
            type="button"
            onClick={() => appendSection({ title: "", description: "" })}
            className="px-4 py-2 text-white rounded-md bg-brand-200 hover:bg-brand-500"
          >
            إضافة وحدة
          </button>
          {sectionFields.map((section, sectionIndex) => (
            <div key={section.id} className="p-4 my-4 bg-gray-100 rounded-md">
              <div className="flex justify-between">
                <h4 className="text-lg font-bold text-right">
                  الوحدة {sectionIndex + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-700"
                >
                  حذف الوحدة
                </button>
              </div>
              <input
                {...register(`sections.${sectionIndex}.title`, {
                  required: "عنوان الوحدة مطلوب",
                })}
                type="text"
                placeholder="عنوان الوحدة"
                className="w-full p-3 my-2 text-right border border-gray-300 rounded-md focus:outline-none focus:border-brand-200"
              />
              {errors.sections?.[sectionIndex]?.title && (
                <span className="text-[1rem] text-red-500">
                  {errors.sections?.[sectionIndex]?.title.message}
                </span>
              )}
              <textarea
                {...register(`sections.${sectionIndex}.description`, {
                  required: "وصف الوحدة مطلوب",
                })}
                placeholder="وصف الوحدة"
                className="w-full p-3 my-2 text-right border border-gray-300 rounded-md focus:outline-none focus:border-brand-200"
              ></textarea>
              {errors.sections?.[sectionIndex]?.description && (
                <span className="text-[1rem] text-red-500">
                  {errors.sections?.[sectionIndex]?.description.message}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isCoursePending}
            className="flex items-center justify-center w-full h-20 px-6 py-3 text-white rounded-md bg-brand-500 hover:bg-brand-400"
          >
            {isCoursePending ? (
              <span className="flex items-center gap-2">
                جارٍ إنشاء الكورس...
                <CircularProgress
                  sx={{
                    color: "gray",
                    "--CircularProgress-size": "0.1rem",
                    "--CircularProgress-trackThickness": "1px",
                    "--CircularProgress-progressThickness": "1px",
                  }}
                />
              </span>
            ) : (
              "إنشاء كورس"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseList;
