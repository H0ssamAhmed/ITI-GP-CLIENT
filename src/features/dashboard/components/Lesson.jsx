import { toast } from "react-toastify";

const Lesson = ({
  lessonIndex,
  sectionIndex,
  control,
  removeLesson,
  deleteLesson,
  getValues,
  setValue,
  register,
}) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h4 className="font-semibold text-md">الدرس رقم {lessonIndex + 1}</h4>
      <div>
        <label>عنوان الدرس</label>
        <input
          type="text"
          {...register(
            `sections.${sectionIndex}.lessons.${lessonIndex}.title`,
            { required: "عنوان الدرس مطلوب" }
          )}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="عنوان الدرس"
        />
      </div>
      <div>
        <label>رابط PDF</label>
        <input
          type="text"
          {...register(
            `sections.${sectionIndex}.lessons.${lessonIndex}.pdfUrl`,
            { required: "رابط PDF مطلوب" }
          )}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="رابط PDF"
        />
      </div>
      <div>
        <label>رابط الفيديو</label>
        <input
          type="text"
          {...register(
            `sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`,
            { required: "رابط الفيديو مطلوب" }
          )}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="رابط الفيديو"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => {
            deleteLesson(sectionIndex, lessonIndex);
          }}
          className="px-4 py-2 text-white bg-red-600 rounded"
        >
          حذف الدرس
        </button>
        <button
          type="button"
          onClick={() => {
            const lessonData = getValues(
              `sections.${sectionIndex}.lessons.${lessonIndex}`
            );
            // Handle saving logic for the lesson
            toast.success(`تم حفظ تغييرات الدرس ${lessonIndex + 1}`);
          }}
          className="px-4 py-2 text-white bg-green-600 rounded"
        >
          حفظ تغييرات الدرس
        </button>
      </div>
    </div>
  );
};

export default Lesson;
