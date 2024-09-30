import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

const CreateCourseList = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Field array for sections
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  // State to keep track of lessons for each section
  const [lessons, setLessons] = useState({});

  const appendLesson = (sectionIndex) => {
    const newLessons = {
      ...lessons,
      [sectionIndex]: [
        ...(lessons[sectionIndex] || []),
        { lessonTitle: "", resources: [] },
      ],
    };
    setLessons(newLessons);
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    const newLessons = {
      ...lessons,
      [sectionIndex]: lessons[sectionIndex].filter(
        (_, index) => index !== lessonIndex
      ),
    };
    setLessons(newLessons);
  };

  const onSubmit = (data) => {
    console.log(data);
    toast.success("تم إنشاء الدورة بنجاح!");
  };

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-right text-brand-500">
        إنشاء كورس جديد
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block mb-2 text-[1.4rem] text-sm font-semibold text-right">
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
          <label className="block text-[1.5rem] mb-2 text-sm font-semibold text-right">
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

        {/* Course Preview Image */}
        <div>
          <label className="block text-[1.5rem] mb-2 text-sm font-semibold text-right">
            صورة العرض
          </label>
          <input
            {...register("previewImage", { required: "صورة العرض مطلوبة" })}
            type="file"
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
          />
          {errors.previewImage && (
            <span className="text-[1rem] text-red-500">
              {errors.previewImage.message}
            </span>
          )}
        </div>

        {/* Course Price */}
        <div>
          <label className="block text-[1.5rem] mb-2 text-sm font-semibold text-right">
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

        {/* Course Level */}
        <div>
          <label className="block text-[1.5rem] mb-2 text-sm font-semibold text-right">
            المستوى الدراسي
          </label>
          <select
            {...register("level", { required: "يرجى اختيار المستوى" })}
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
          >
            <option value="">اختر المستوى</option>
            <option value="الصف الاول الابتدائي">الصف الاول الابتدائي</option>
            <option value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</option>
            <option value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</option>
            <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
            <option value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</option>
            <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
            <option value="المرحلة الاعدادية">المرحلة الاعدادية</option>
            <option value="الصف الاول الإعدادي">الصف الاول الإعدادي</option>
            <option value="الصف الثاني الإعدادي">الصف الثاني الإعدادي</option>
            <option value="الصف الثالث الاعدادي">الصف الثالث الاعدادي</option>
            <option value="المرحلة الثانوية">المرحلة الثانوية</option>
            <option value="الصف الاول الثانوي">الصف الاول الثانوي</option>
            <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
            <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
            {/* Add course levels here */}
          </select>
          {errors.level && (
            <span className="text-[1rem] text-red-500">
              {errors.level.message}
            </span>
          )}
        </div>

        {/* Sections */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-right">الوحدة</h3>
          <button
            type="button"
            onClick={() => appendSection({ sectionTitle: "", lessons: [] })}
            className="px-4 py-2 text-white rounded-md bg-brand-200 hover:bg-brand-500"
          >
            إضافة وحدة
          </button>
          {sectionFields.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="p-4 mt-4 border border-gray-300 rounded-md"
            >
              <div>
                <label className="block mb-2 text-sm font-semibold text-right">
                  عنوان الوحدة
                </label>
                <input
                  {...register(`sections.${sectionIndex}.sectionTitle`, {
                    required: "العنوان مطلوب",
                  })}
                  type="text"
                  className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
                  placeholder="أدخل عنوان الوحدة"
                />
                {errors.sections?.[sectionIndex]?.sectionTitle && (
                  <span className="text-[1rem] text-red-500">
                    {errors.sections[sectionIndex].sectionTitle.message}
                  </span>
                )}
              </div>

              {/* Lessons */}
              <div className="mt-4">
                <h4 className="mb-2 text-lg font-semibold text-right">
                  الدروس
                </h4>
                <button
                  type="button"
                  onClick={() => appendLesson(sectionIndex)}
                  className="px-2 py-1 text-white bg-green-500 rounded-md"
                >
                  إضافة درس
                </button>
                <div className="mt-2">
                  {(lessons[sectionIndex] || []).map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="p-2 mt-2 border border-gray-300 rounded-md"
                    >
                      <div>
                        <label className="block mb-2 text-sm font-semibold text-right">
                          عنوان الدرس
                        </label>
                        <input
                          {...register(
                            `sections.${sectionIndex}.lessons.${lessonIndex}.lessonTitle`,
                            { required: "العنوان مطلوب" }
                          )}
                          type="text"
                          className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
                          placeholder="أدخل عنوان الدرس"
                        />
                        {errors.sections?.[sectionIndex]?.lessons?.[lessonIndex]
                          ?.lessonTitle && (
                          <span className="text-[1rem] text-red-500">
                            {
                              errors.sections[sectionIndex].lessons[lessonIndex]
                                .lessonTitle.message
                            }
                          </span>
                        )}
                      </div>

                      {/* Resources */}
                      <div className="mt-4">
                        <h5 className="mb-2 font-semibold text-right text-md">
                          المحتوى
                        </h5>
                        <div>
                          <label className="block text-[1.5rem] mb-2 text-sm font-semibold text-right">
                            تحميل ملف PDF
                          </label>
                          <input
                            {...register(
                              `sections.${sectionIndex}.lessons.${lessonIndex}.lessonPDF`,
                              {
                                required: "ملف PDF مطلوب",
                              }
                            )}
                            type="file"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
                          />
                          {errors.sections?.[sectionIndex]?.lessons?.[
                            lessonIndex
                          ]?.lessonPDF && (
                            <span className="text-[1rem] text-red-500">
                              {
                                errors.sections[sectionIndex].lessons[
                                  lessonIndex
                                ].lessonPDF.message
                              }
                            </span>
                          )}
                        </div>

                        {/* Lesson Videos */}
                        <div>
                          <label className="block text-[1.5rem] mb-2 text-sm font-semibold text-right">
                            تحميل الفيديو
                          </label>
                          <input
                            {...register(
                              `sections.${sectionIndex}.lessons.${lessonIndex}.lessonVideo`,
                              {
                                required: "الفيديو مطلوب",
                              }
                            )}
                            type="file"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
                          />
                          {errors.sections?.[sectionIndex]?.lessons?.[
                            lessonIndex
                          ]?.lessonVideo && (
                            <span className="text-[1rem] text-red-500">
                              {
                                errors.sections[sectionIndex].lessons[
                                  lessonIndex
                                ].lessonVideo.message
                              }
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remove Lesson Button */}
                      <button
                        type="button"
                        onClick={() => removeLesson(sectionIndex, lessonIndex)}
                        className="p-[0.45rem] text-[1.5rem] mt-4 mb-4 text-left text-white bg-red-500 hover:bg-red-400 rounded-md"
                      >
                        حذف الدرس
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remove Section Button */}
              <button
                type="button"
                onClick={() => removeSection(sectionIndex)}
                className="p-[0.45rem] text-[1.5rem] mt-5 mb-5 text-left text-white bg-red-500 hover:bg-red-400 rounded-md ring-0"
              >
                حذف الوحدة
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white rounded-md bg-brand-600 hover:bg-brand-500"
        >
          إنشاء الدورة
        </button>
      </form>
    </div>
  );
};

export default CreateCourseList;
