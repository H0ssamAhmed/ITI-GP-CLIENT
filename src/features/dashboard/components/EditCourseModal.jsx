import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCourseDetails, updateCourse } from "../dashboardAPI";
import { toast } from "react-toastify";
import Spinner from "../../../ui/Spinner";
import Section from "./Section";

const EditCourseModal = ({ courseId, onClose, refetchCourses }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: !!courseId,
  });

  const mutation = useMutation({
    mutationFn: (updatedCourse) => updateCourse(courseId, updatedCourse),
    onSuccess: (response) => {
      toast.success(response);
      onClose();
      refetchCourses();
    },
    onError: () => {
      toast.error("حدث خطأ أثناء التحديث");
    },
  });

  const { register, handleSubmit, reset, control, getValues, setValue } =
    useForm({
      defaultValues: {
        title: "",
        description: "",
        image: "",
        levelTitle: "",
        teacherName: "",
        price: 0,
        discountedPrice: 0,
        sections: [],
      },
    });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        description: data.description,
        image: data.image,
        teacherName: data.teacherId,
        price: data.price,
        discountedPrice: data.discountedPrice,
        sections: data.sections.map((section) => ({
          ...section,
          lessons: section.lessons || [],
        })),
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

  const onSubmit = (formData) => {
    const structuredSections = formData.sections.map((section) => ({
      ...section,
      lessons: section.lessons || [],
    }));

    mutation.mutate({
      ...formData,
      sections: structuredSections,
    });
  };

  const saveSectionChanges = (index) => {
    const sectionData = getValues(`sections.${index}`);
    // Handle saving logic for the section
    toast.success(`تم حفظ تغييرات القسم ${index + 1}`);
  };

  const deleteLesson = (sectionIndex, lessonIndex) => {
    const sectionLessons = getValues(`sections.${sectionIndex}.lessons`);
    sectionLessons.splice(lessonIndex, 1); // Remove the lesson from the array
    setValue(`sections.${sectionIndex}.lessons`, sectionLessons); // Update the form state
    toast.success(`تم حذف الدرس رقم ${lessonIndex + 1}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh]">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          تعديل الكورس
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General Course Info */}
          <div className="flex flex-wrap gap-4">
            <div className="w-full">
              <label>عنوان الكورس</label>
              <input
                type="text"
                {...register("title", { required: "العنوان مطلوب" })}
                placeholder="عنوان الكورس"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full">
              <label>الوصف</label>
              <input
                type="text"
                {...register("description", { required: "الوصف مطلوب" })}
                placeholder="الوصف"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="w-full">
              <label>رابط الصورة</label>
              <input
                type="text"
                {...register("image", { required: "رابط الصورة مطلوب" })}
                placeholder="رابط الصورة"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full">
              <label>عنوان المستوى</label>
              <input
                type="text"
                {...register("levelTitle", { required: "عنوان المستوى مطلوب" })}
                placeholder="عنوان المستوى"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="w-full">
              <label>اسم المعلم</label>
              <input
                type="text"
                {...register("teacherName")}
                placeholder="اسم المعلم"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-1/2">
              <label>السعر</label>
              <input
                type="number"
                {...register("price", {
                  required: "السعر مطلوب",
                  min: {
                    value: 0,
                    message: "السعر يجب أن يكون أكبر من أو يساوي 0",
                  },
                })}
                placeholder="السعر"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-1/2">
              <label>السعر بعد الخصم</label>
              <input
                type="number"
                {...register("discountedPrice")}
                placeholder="السعر بعد الخصم"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          {/* Add Section Button */}
          <button
            type="button"
            onClick={() => addSection({ title: "", lessons: [] })}
            className="px-4 py-2 mb-4 text-white bg-blue-600 rounded"
          >
            إضافة وحدة
          </button>
          {/* Sections and Lessons */}
          <div className="space-y-6 max-h-[60vh] overflow-y-auto">
            {sectionFields.map((section, sectionIndex) => (
              <div key={section.id} className="p-4 border rounded shadow-md">
                <h3 className="text-lg font-semibold">
                  الوحدة رقم {sectionIndex + 1}
                </h3>
                <Section
                  key={section.id}
                  sectionIndex={sectionIndex}
                  control={control}
                  register={register}
                  removeSection={removeSection} // Pass removeSection function
                  deleteLesson={deleteLesson}
                  getValues={getValues} // Pass getValues to Section
                  setValue={setValue} // Pass setValue to Section
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => saveSectionChanges(sectionIndex)}
                    className="px-4 py-2 mt-2 text-white bg-green-600 rounded"
                  >
                    حفظ تغييرات الوحدة
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      removeSection(sectionIndex); // Call removeSection to delete the section
                      toast.success(`تم حذف الوحدة رقم ${sectionIndex + 1}`); // Show success message
                    }}
                    className="px-4 py-2 mt-4 text-white bg-red-600 rounded"
                  >
                    حذف الوحدة
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-500 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 rounded"
            >
              حفظ الكل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
