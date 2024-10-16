import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { createLesson, FetchTeacherSections } from "../dashboardAPI";

const CreateLesson = ({ initialData }) => {
  const [sections, setSections] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const {
    mutate: createLessonMutate,
    isLoading: isCreatingLesson,
    isError: isErrorLesson,
    isPending: isLessonPending,
  } = useMutation({
    mutationFn: ({ title, description, pdfFile, videoFile, sectionId }) =>
      createLesson({ title, description, pdfFile, videoFile }, sectionId),
    onSuccess: () => {
      toast.success("تم إنشاء الدرس بنجاح");
      reset();
    },
    onError: (error) => {
      if (error.response) {
        const backendErrorMessage = error.response.data.error;
        toast.error(backendErrorMessage);
      } else {
        toast.error("حدث خطأ غير متوقع");
      }
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      sectionId: initialData?.sectionId || "",
      pdfFile: initialData?.pdfFile || "",
      videoFile: initialData?.videoFile || "",
    },
  });

  useEffect(() => {
    const getSections = async () => {
      try {
        const fetchedSections = await FetchTeacherSections();
        setSections(Array.isArray(fetchedSections) ? fetchedSections : []);
      } catch (error) {
        setSections([]);
      }
    };

    getSections();
  }, []);

  const onSubmit = (data) => {
    const lessonData = {
      title: data.title,
      description: data.description,
      sectionId: data.sectionId,
      pdfFile: pdfFile,
      videoFile: videoFile,
    };

    createLessonMutate({ ...lessonData, sectionId: data.sectionId });
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleDeleteLesson = () => {
    reset();
  };

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h2 className="mb-8 text-[3rem] text-center font-bold text-brand-500">
        إنشاء درس جديد 📚
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Lesson Name */}
        <div>
          <label className="block mb-2 text-[1.9rem] text-sm font-semibold text-right">
            اسم الدرس
          </label>
          <input
            {...register("title", { required: "اسم الدرس مطلوب" })}
            type="text"
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
            placeholder="أدخل اسم الدرس"
          />
          {errors.title && (
            <span className="text-[1rem] text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>

        <div>
          <label className="block mb-2 text-[1.9rem] text-sm font-semibold text-right">
            وصف الدرس
          </label>
          <input
            {...register("description", { required: "وصف الدرس مطلوب" })}
            type="text"
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
            placeholder="أدخل وصف الدرس"
          />
          {errors.description && (
            <span className="text-[1rem] text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Section Selection */}
        <div>
          <label className="block text-[1.9rem] mb-2 text-sm font-semibold text-right">
            الوحدة المضاف اليها الدرس
          </label>
          <select
            {...register("sectionId", { required: "يرجى اختيار الوحدة" })}
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
          >
            <option value="">اختر الوحدة</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
          {errors.sectionId && (
            <span className="text-[1rem] text-red-500">
              {errors.sectionId.message}
            </span>
          )}
        </div>

        {/* Add PDF */}
        <div>
          <label className="block mb-2 text-[1.9rem] text-sm font-semibold text-right">
            إضافة ملف PDF
          </label>
          <input
            {...register("pdfFile")}
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
          />
        </div>

        {/* Add Video */}
        <div>
          <label className="block mb-2 text-[1.9rem] text-sm font-semibold text-right">
            إضافة فيديو
          </label>
          <input
            {...register("videoFile")}
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full p-3 text-right border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-brand-200"
          />
        </div>

        {/* Delete Lesson Button */}
        <div className="flex justify-end">
          <button
            onClick={handleDeleteLesson}
            type="button"
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
          >
            حذف الدرس
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLessonPending}
            className="flex items-center justify-center w-full h-20 px-6 py-3 text-white rounded-md bg-brand-500 hover:bg-brand-400"
          >
            {isLessonPending ? (
              <span className="flex items-center gap-2">
                جارٍ إنشاء الدرس...
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
              "إنشاء درس"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLesson;
