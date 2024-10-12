import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnnouncements, fetchAllAnnouncements } from "../dashboardAPI";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const AnnouncementList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: announcements,
    isLoading: isLoadingAnnouncements,
    isError: isErrorAnnouncements,
    error: queryError,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAllAnnouncements,
  });

  console.log(announcements?.data); // Make sure you're checking the correct structure

  const mutation = useMutation({
    mutationFn: createAnnouncements,
    onSuccess: () => {
      toast.success("تم إضافة الإعلان بنجاح!", {
        position: window.innerWidth > 768 ? "top-right" : "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { width: window.innerWidth > 768 ? "350px" : "100%" },
      });
      queryClient.invalidateQueries(["announcements"]);
      setIsModalOpen(false);
      reset();
    },
    onError: (error) => {
      console.error(error);
      toast.error("حدث خطأ أثناء إضافة الإعلان.", {
        position: window.innerWidth > 768 ? "top-right" : "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { width: window.innerWidth > 768 ? "350px" : "100%" },
      });
    },
  });

  if (isLoadingAnnouncements) return <Spinner />;
  if (isErrorAnnouncements) {
    console.error("Query error:", queryError);
    return <ErrorMessage message="فشل تحميل بيانات الإعلانات" />;
  }

  const handleAddAnnouncement = (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      start: new Date(data.start).toISOString(),
      end: new Date(data.end).toISOString(),
      eventUrl: data.eventUrl || null, // Adjust this if needed
    };

    mutation.mutate(payload);
  };

  return (
    <div className="p-4" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-[2.5rem] font-bold">الإعلانات</h2>

        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-white rounded-full bg-brand-500 hover:bg-brand-200"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements?.data?.map((announcement, index) => (
          <div
            key={announcement.id}
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            <h3 className="mb-2 text-xl font-semibold text-blue-600">
              {announcement.title}
            </h3>
            <p className="mb-2 text-gray-700">{announcement.description}</p>
            {announcement.eventUrl && (
              <p className="mb-2 text-blue-500 underline cursor-pointer">
                <a
                  href={announcement.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  الذهاب إلى الكورس
                </a>
              </p>
            )}
            <small className="text-gray-500">
              تمت الإضافة: {announcement.start}
            </small>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="w-5/6 p-6 bg-white rounded-lg md:w-2/6">
          <h2 className="mb-4 text-[2rem] font-bold">إضافة إعلان جديد</h2>
          <form onSubmit={handleSubmit(handleAddAnnouncement)}>
            <div className="mb-4">
              <label className="block mb-2">عنوان الإعلان</label>
              <input
                type="text"
                {...register("title", { required: "هذا الحقل مطلوب" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">وصف الإعلان</label>
              <textarea
                {...register("description", { required: "هذا الحقل مطلوب" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.description && (
                <p className="text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label>تاريخ البدء</label>
              <input
                type="datetime-local"
                {...register("start", { required: "هذا الحقل مطلوب" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.start && (
                <p className="text-red-600">{errors.start.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label>تاريخ الإنتهاء</label>
              <input
                type="datetime-local"
                {...register("end", { required: "هذا الحقل مطلوب" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.end && (
                <p className="text-red-600">{errors.end.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">رابط الكورس (اختياري)</label>
              <input
                type="text"
                {...register("eventUrl")}
                placeholder="https://example.com/course"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-400"
              >
                إضافة
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-400"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AnnouncementList;
