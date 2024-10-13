import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { createCourse, fetchAllLevels } from "../dashboardAPI";
import CircularSize from "../../../ui/CircularSize";

const CreateCourseList = ({ initialData }) => {
  const [levels, setLevels] = useState([]);
  const {
    mutate: createCourseMutate,
    isLoading: isCreatingCourse,
    isError: isErrorCourse,
  } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.warn("تم إنشاء الكورس وسيتم مراجعته وموافاتك بالرد");
    },
    onError: (error) => {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 409) {
          // Handle duplicate course error (conflict)
          toast.error("هذا الكورس موجود بالفعل");
        } else if (error.response.data) {
          // Specific backend error message
          const backendErrorMessage = error.response.data.error;
          toast.error(backendErrorMessage);
        } else {
          // General error message
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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      discountedPrice: initialData?.discountedPrice || "",
      levelId: initialData?.levelId || "",
      sections: initialData?.sections || [],
    },
  });

  // Field array for sections
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });
  const [lessons, setLessons] = useState([[]]);

  const appendLesson = (sectionIndex) => {
    setLessons((prevLessons) => ({
      ...prevLessons,
      [sectionIndex]: [
        ...(prevLessons[sectionIndex] || []),
        { title: "", description: "", pdfUrl: "", videoUrl: "" },
      ],
    }));
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    setLessons((prevLessons) => ({
      ...prevLessons,
      [sectionIndex]: prevLessons[sectionIndex].filter(
        (_, index) => index !== lessonIndex
      ),
    }));
  };

  useEffect(() => {
    const getLevels = async () => {
      try {
        const fetchedLevels = await fetchAllLevels();
        console.log("All level ya hossam:", fetchAllLevels);
        // Check if fetchedLevels is an array, otherwise set it as an empty array
        setLevels(Array.isArray(fetchedLevels.data) ? fetchedLevels.data : []);
      } catch (error) {
        console.error("Failed to fetch levels:", error);
        setLevels([]); // Set to an empty array if there's an error
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
      sections: data.sections.map((section) => ({
        title: section.title,
        lessons: section.lessons.map((lesson) => ({
          title: lesson.title,
          description: lesson.description,
          pdfUrl: lesson.pdfUrl,
          videoUrl: lesson.videoUrl,
        })),
      })),
    };

    console.log(courseData);
    createCourseMutate(courseData);
    reset();
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
            onClick={() => appendSection({ title: "", lessons: [] })}
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

              {/* Lessons */}
              <div className="mt-4">
                <h5 className="mb-2 text-right">الدروس</h5>
                <button
                  type="button"
                  onClick={() => appendLesson(sectionIndex)}
                  className="px-3 py-1 text-white rounded-md bg-brand-200 hover:bg-brand-500"
                >
                  إضافة درس
                </button>
                {(lessons[sectionIndex] || []).map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="p-3 my-2 bg-gray-200 rounded-md"
                  >
                    <div className="flex justify-between">
                      <h6 className="text-right">الدرس {lessonIndex + 1}</h6>
                      <button
                        type="button"
                        onClick={() => removeLesson(sectionIndex, lessonIndex)}
                        className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-700"
                      >
                        حذف الدرس
                      </button>
                    </div>
                    <input
                      {...register(
                        `sections.${sectionIndex}.lessons.${lessonIndex}.title`,
                        { required: "عنوان الدرس مطلوب" }
                      )}
                      type="text"
                      placeholder="عنوان الدرس"
                      className="w-full p-2 my-2 text-right border border-gray-300 rounded-md focus:outline-none focus:border-brand-200"
                    />
                    {errors.sections?.[sectionIndex]?.lessons?.[lessonIndex]
                      ?.title && (
                      <span className="text-[1rem] text-red-500">
                        {
                          errors.sections?.[sectionIndex]?.lessons?.[
                            lessonIndex
                          ]?.title.message
                        }
                      </span>
                    )}
                    <textarea
                      {...register(
                        `sections.${sectionIndex}.lessons.${lessonIndex}.description`,
                        { required: "وصف الدرس مطلوب" }
                      )}
                      placeholder="وصف الدرس"
                      className="w-full p-2 my-2 text-right border border-gray-300 rounded-md focus:outline-none focus:border-brand-200"
                    ></textarea>
                    {errors.sections?.[sectionIndex]?.lessons?.[lessonIndex]
                      ?.description && (
                      <span className="text-[1rem] text-red-500">
                        {
                          errors.sections?.[sectionIndex]?.lessons?.[
                            lessonIndex
                          ]?.description.message
                        }
                      </span>
                    )}

                    <input
                      {...register(
                        `sections.${sectionIndex}.lessons.${lessonIndex}.pdfUrl`,
                        { required: "ملف PDF مطلوب" }
                      )}
                      type="text"
                      className="w-full p-2 my-2 text-right border border-gray-300 rounded-md focus:outline-none focus:border-brand-200"
                    />
                    {errors.sections?.[sectionIndex]?.lessons?.[lessonIndex]
                      ?.pdfUrl && (
                      <span className="text-[1rem] text-red-500">
                        {
                          errors.sections?.[sectionIndex]?.lessons?.[
                            lessonIndex
                          ]?.pdfUrl.message
                        }
                      </span>
                    )}

                    <input
                      {...register(
                        `sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`,
                        { required: "رابط الفيديو مطلوب" }
                      )}
                      type="text"
                      placeholder="رابط الفيديو"
                      className="w-full p-2 my-2 text-right border border-gray-300 rounded-md focus:outline-none focus:border-brand-200"
                    />
                    {errors.sections?.[sectionIndex]?.lessons?.[lessonIndex]
                      ?.videoUrl && (
                      <span className="text-[1rem] text-red-500">
                        {
                          errors.sections?.[sectionIndex]?.lessons?.[
                            lessonIndex
                          ]?.videoUrl.message
                        }
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isCreatingCourse}
            className="px-4 py-2 text-white rounded-md w-full  bg-brand-600 hover:bg-brand-500"
          >
            {isCreatingCourse ? <CircularSize /> : "إنشاء الكورس"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseList;
