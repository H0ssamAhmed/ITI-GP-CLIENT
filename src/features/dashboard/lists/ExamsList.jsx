import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createQuiz, FetchTeacherSections } from "../dashboardAPI";
import { MdOutlineQuiz } from "react-icons/md";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const schema = yup.object().shape({
  title: yup.string().required("عنوان الإمتحان مطلوب"),
  section: yup.string().required("يجب اختيار القسم"),
  duration: yup
    .number()
    .positive("المدة يجب ان تكون رقم موجب")
    .required("المدة مطلوبة")
    .integer("المدة يجب الا تكون مكونة من رقم عشري"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        questionTitle: yup.string().required("عنوان السؤال مطلوب"),
        mark: yup
          .number()
          .positive("الدرجة يجب ان تكون رقم موجب")
          .required("الدرجة مطلوبة"),
        answers: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().required("الحقل يجب ان يحتوي على إجابة"),
              isCorrect: yup
                .boolean()
                .required("يجب تحديد ما إذا كانت الإجابة صحيحة"),
            })
          )
          .min(4, "يجب على الأقل ان يتواجد اربع إجابات")
          .required("الإجابات مطلوبة"),
      })
    )
    .min(1, "الأختبار يجب على الأقل ان يحتوي على سؤال واحد"),
});

const ExamsList = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      section: "",
      duration: 30,
      questions: [],
    },
  });

  const { mutate: createQuizMutate, isLoading: isCreatingQuiz } = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      toast.success("تم إنشاء الأمتحان بنجاح");
      reset(); // Reset after successful creation
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إنشاء الأمتحان");
    },
  });

  const { data: teachersSections } = useQuery({
    queryKey: ["teachersSections"],
    queryFn: FetchTeacherSections,
  });

  const addQuestion = () => {
    const newQuestion = {
      questionTitle: "",
      mark: 1,
      answers: Array(4).fill({ title: "", isCorrect: false }),
    };
    setValue("questions", [...watch("questions"), newQuestion]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = watch("questions").filter((_, i) => i !== index);
    setValue("questions", updatedQuestions);
  };

  const onSubmit = (data) => {
    const structuredData = {
      title: data.title,
      sectionId: data.section,
      Duration: +data.duration,
      questions: data.questions.map((q) => ({
        questionTitle: q.questionTitle,
        mark: q.mark,
        answers: q.answers.map((answer) => ({
          title: answer.title,
          isCorrect: answer.isCorrect,
        })),
      })),
    };

    createQuizMutate(structuredData);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h2 className="text-[2.5rem] flex items-center justify-center gap-6 font-bold mb-4">
        إنشاء إمتحان <MdOutlineQuiz className="text-brand-500" />
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">عنوان الامتحان:</label>
          <input
            type="text"
            {...register("title")}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="أدخل عنوان الامتحان"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">الوحدة:</label>
          <select
            {...register("section")}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">اختر الوحدة</option>
            {teachersSections?.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
          {errors.section && (
            <p className="text-red-500">{errors.section.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">المدة (بالدقائق):</label>
          <input
            type="number"
            {...register("duration")}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="اتركه فارغاً لدقيقة واحدة لكل سؤال"
          />
          {errors.duration && (
            <p className="text-red-500">{errors.duration.message}</p>
          )}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">الأسئلة</h3>
          {watch("questions")?.map((question, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
              <QuestionComponent
                index={index}
                register={register}
                question={question}
                errors={errors}
                setValue={setValue}
                watch={watch}
              />
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="px-4 py-2 mt-2 text-white bg-red-500 rounded-md"
              >
                حذف السؤال
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-5">
          <button
            type="button"
            onClick={addQuestion}
            className="px-4 py-2 mr-3 text-white rounded-md bg-brand-600"
          >
            إضافة سؤال
          </button>

          <button
            disabled={isCreatingQuiz}
            type="submit"
            className="flex items-center justify-between gap-4 px-4 py-2 ml-4 text-white bg-green-500 rounded-md"
          >
            {isCreatingQuiz ? (
              <>
                <CircularProgress size="15px" />
                <span> جارِ الإرسال : إنشاء امتحان</span>
              </>
            ) : (
              "إنشاء امتحان"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const QuestionComponent = ({
  index,
  register,
  question,
  errors,
  setValue,
  watch,
}) => {
  const answersField = `questions[${index}].answers`;

  const handleCorrectAnswerChange = (answerIndex) => {
    const updatedAnswers = watch(answersField).map((answer, i) => ({
      ...answer,
      isCorrect: i === answerIndex,
    }));
    setValue(answersField, updatedAnswers);
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <label className="font-semibold">عنوان السؤال:</label>
        <input
          type="text"
          {...register(`questions[${index}].questionTitle`)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="أدخل السؤال"
        />
        {errors?.questions?.[index]?.questionTitle && (
          <p className="text-red-500">
            {errors.questions[index].questionTitle.message}
          </p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="font-semibold">الدرجة:</label>
        <input
          type="number"
          {...register(`questions[${index}].mark`)}
          className="p-2 border border-gray-300 rounded-md"
        />
        {errors?.questions?.[index]?.mark && (
          <p className="text-red-500">{errors.questions[index].mark.message}</p>
        )}
      </div>

      <div className="space-y-4">
        {watch(answersField)?.map((answer, answerIndex) => (
          <div key={answerIndex} className="flex items-center gap-4">
            <input
              type="text"
              {...register(`${answersField}.${answerIndex}.title`)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder={`إجابة ${answerIndex + 1}`}
            />
            <input
              type="radio"
              checked={answer.isCorrect}
              onChange={() => handleCorrectAnswerChange(answerIndex)}
            />
            {errors?.questions?.[index]?.answers?.[answerIndex]?.title && (
              <p className="text-red-500">
                {errors.questions[index].answers[answerIndex].title.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamsList;
