import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createQuiz, FetchTeacherSections } from "../dashboardAPI";
import { MdOutlineQuiz } from "react-icons/md";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

// Define Yup schema for validation
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
  } = useForm({
    resolver: yupResolver(schema), // Use yupResolver with the schema
    defaultValues: {
      title: "",
      sectionId: "", // Default value for the section
      duration: 30,
      questions: [],
    },
  });

  const {
    mutate: createQuizMutate,
    isLoading: isCreatingQuiz,
    isError: isErrorQuiz,
  } = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      toast.success("تم إنشاء الأمتحان بنجاح");
    },
    onError: (error) => {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 409) {
          // Handle duplicate course error (conflict)
          toast.error("هذا الأمتحان موجود بالفعل");
        } else if (error.response.data) {
          // Specific backend error message
          const backendErrorMessage = error.response.data.error;
          toast.error(backendErrorMessage);
        } else {
          // General error message
          toast.error("حدث خطأ أثناء إنشاء الأمتحان");
        }
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    },
  });

  const [questions, setQuestions] = useState([]);

  const { data: teachersSections } = useQuery({
    queryKey: ["teachersSections"],
    queryFn: FetchTeacherSections,
  });

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionTitle: "",
        mark: 1,
        answers: [
          { title: "", isCorrect: false },
          { title: "", isCorrect: false },
          { title: "", isCorrect: false },
          { title: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleAddQuestion = () => {
    addQuestion();
    setValue("questions", [...questions, ...questions]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setValue("questions", updatedQuestions); // Update form state with the new list
  };

  const onSubmit = (data) => {
    // Prepare data to match backend structure
    const structuredData = {
      title: data.title,
      sectionId: data.section,
      Duration: +data.duration,
      questions: data.questions.map((q) => ({
        questionTitle: q.questionTitle,
        mark: q.mark,
        answers: q.answers.map((answer, index) => ({
          title: answer.title,
          isCorrect: answer.isCorrect,
        })),
      })),
    };

    createQuizMutate(structuredData);
    reset();
    // Send 'structuredData' to backend via an API call
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-[2.5rem] flex items-center justify-center gap-6 font-bold mb-4">
        إنشاء إمتحان <MdOutlineQuiz className="text-brand-500" />
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* عنوان الامتحان */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">عنوان الامتحان:</label>
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

        {/* اختيار القسم */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">الوحدة:</label>
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

        {/* مدة الامتحان */}
        <div className="flex flex-col">
          <label className="font-semibold mb-2">المدة (بالدقائق):</label>
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

        {/* الأسئلة */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">الأسئلة</h3>
          {questions.map((question, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              <QuestionComponent
                index={index}
                register={register}
                control={control}
                question={question}
                errors={errors}
              />

              {/* Delete Question Button */}
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
              >
                حذف السؤال
              </button>
            </div>
          ))}
        </div>

        {/* زر إضافة سؤال */}
        <div className="flex gap-5">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-brand-600 text-white px-4 mr-3 py-2 rounded-md"
          >
            إضافة سؤال
          </button>

          {/* زر إرسال الامتحان */}
          <button
            disabled={isCreatingQuiz}
            type="submit"
            className="bg-green-500 flex items-center gap-4 justify-between text-white px-4 ml-4 py-2 rounded-md"
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

const QuestionComponent = ({ index, register, control, question, errors }) => {
  return (
    <div>
      {/* Question Title */}
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

      {/* Mark */}
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

      {/* Answers */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">الإجابات:</h4>
        <span className="text-[1.3rem] text-gray-400 -mt-6">
          قم باختيار الإجابة الصحيحة عن طريق الضغط على مربع الاختيار
        </span>
        {question.answers.map((answer, answerIndex) => (
          <div
            key={answerIndex}
            className="flex justify-between items-center mb-2"
          >
            <div>
              <input
                type="text"
                {...register(
                  `questions[${index}].answers[${answerIndex}].title`
                )}
                className="p-2 border border-gray-300 rounded-md"
                placeholder={`الإجابة ${answerIndex + 1}`}
              />
              {errors?.questions?.[index]?.answers?.[answerIndex]?.title && (
                <p className="text-red-500">
                  {errors.questions[index].answers[answerIndex].title.message}
                </p>
              )}
            </div>
            <input
              type="checkbox"
              {...register(
                `questions[${index}].answers[${answerIndex}].isCorrect`
              )}
              className="ml-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamsList;
