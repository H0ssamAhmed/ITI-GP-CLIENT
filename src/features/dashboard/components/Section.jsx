import { useFieldArray } from "react-hook-form";
import Lesson from "./Lesson";

const Section = ({
  sectionIndex,
  control,
  register,
  removeSection,
  deleteLesson,
  getValues,
  setValue,
}) => {
  const {
    fields: lessonFields,
    append: addLesson,
    remove: removeLesson,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons`,
  });

  return (
    <div className="my-4">
      <div>
        <label>عنوان الوحدة</label>

        <input
          type="text"
          {...register(`sections.${sectionIndex}.title`, {
            required: "عنوان الوحدة مطلوب",
          })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="عنوان الوحدة"
        />
      </div>
      <button
        type="button"
        onClick={() => addLesson({ title: "", pdfUrl: "", videoUrl: "" })}
        className="px-4 py-2 mt-2 mb-4 text-white bg-blue-600 rounded"
      >
        إضافة درس
      </button>
      <div className="space-y-4">
        {lessonFields.map((lesson, lessonIndex) => (
          <Lesson
            key={lesson.id}
            lessonIndex={lessonIndex}
            sectionIndex={sectionIndex}
            control={control}
            removeLesson={removeLesson}
            deleteLesson={deleteLesson}
            getValues={getValues} // Pass getValues to Lesson
            setValue={setValue} // Pass setValue to Lesson
            register={register} // Pass register to Lesson for validation
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
