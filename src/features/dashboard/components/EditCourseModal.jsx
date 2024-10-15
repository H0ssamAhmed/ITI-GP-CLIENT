import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCourseDetails, updateCourse } from "../dashboardAPI";
import { toast } from "react-toastify";
import Spinner from "../../../ui/Spinner";

const EditCourseModal = ({ courseId, onClose, refetchCourses }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: !!courseId,
  });

  const mutation = useMutation({
    mutationFn: (updatedCourse) => updateCourse(courseId, updatedCourse),
    onSuccess: (response) => {
      console.log("Update Success Response:", response);
      toast.success(response);
      onClose();
      refetchCourses();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء التحديث");
    },
  });

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      levelTitle: "",
      teacherName: "",
      price: 0,
      lessonsCount: 0,
      sections: [],
      lessons: [],
    },
  });

  // Reset the form with the fetched data whenever it changes
  useEffect(() => {
    if (data) {
      reset({
        title: data?.title,
        description: data?.description,
        image: data?.image,
        levelTitle: data?.levelTitle,
        teacherName: data?.teacherName,
        price: data?.price,
        lessonsCount: data?.lessonsCount,
        sections: data?.sections || [],
        lessons: data?.sections.lessons || [],
      });
    }
  }, [data, reset]);

  const {
    fields: sectionFields,
    append: addSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const {
    fields: lessonFields,
    append: addLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: "lessons",
  });

  const onSubmit = (formData) => {
    const structuredSections = formData.sections.map((section) => ({
      ...section,
      lessons: section.lessons || [], // Ensure lessons are inside their sections
    }));

    console.log("Updated Course Payload:", {
      ...formData,
      sections: structuredSections,
    });

    mutation.mutate({
      ...formData,
      sections: structuredSections,
    });
  };

  const handleAddSection = () => {
    addSection({ title: "", description: "" });
  };

  const handleAddLesson = (sectionIndex) => {
    addLesson(sectionIndex, { title: "", content: "" });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">تعديل الكورس</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("title", { required: "العنوان مطلوب" })}
            placeholder="عنوان الكورس"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            {...register("description", { required: "الوصف مطلوب" })}
            placeholder="الوصف"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            {...register("image", { required: "رابط الصورة مطلوب" })}
            placeholder="رابط الصورة"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            {...register("levelTitle", { required: "عنوان المستوى مطلوب" })}
            placeholder="عنوان المستوى"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            {...register("teacherName", { required: "اسم المعلم مطلوب" })}
            placeholder="اسم المعلم"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="number"
            {...register("price", {
              required: "السعر مطلوب",
              valueAsNumber: true,
            })}
            placeholder="السعر"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="number"
            {...register("lessonsCount", {
              required: "عدد الدروس مطلوب",
              valueAsNumber: true,
            })}
            placeholder="عدد الدروس"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          {/* Add Section Controls */}
          <button
            type="button"
            onClick={handleAddSection}
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          >
            إضافة فصل
          </button>
          {sectionFields.map((section, index) => (
            <div key={section.id} className="mb-2">
              <input
                type="text"
                {...register(`sections.${index}.title`, {
                  required: "عنوان الفصل مطلوب",
                })}
                placeholder="عنوان الفصل"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="px-3 py-1 text-white bg-red-500 rounded"
              >
                حذف
              </button>
              {/* Add lessons controls under each section */}
              {section.lessons?.map((lesson, lessonIndex) => (
                <div key={lessonIndex}>
                  <input
                    type="text"
                    {...register(
                      `sections.${index}.lessons.${lessonIndex}.title`,
                      {
                        required: "عنوان الدرس مطلوب",
                      }
                    )}
                    placeholder="عنوان الدرس"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeLesson(lessonIndex)}
                    className="px-3 py-1 text-white bg-red-500 rounded"
                  >
                    حذف الدرس
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddLesson(index)}
                className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
              >
                إضافة درس
              </button>
            </div>
          ))}
          {lessonFields.map((lesson, index) => (
            <div key={lesson.id} className="mb-2">
              <input
                type="text"
                {...register(`lessons.${index}.title`, {
                  required: "عنوان الدرس مطلوب",
                })}
                placeholder="عنوان الدرس"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => removeLesson(index)}
                className="px-3 py-1 text-white bg-red-500 rounded"
              >
                حذف
              </button>
            </div>
          ))}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded"
          >
            حفظ التعديلات
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default EditCourseModal;
