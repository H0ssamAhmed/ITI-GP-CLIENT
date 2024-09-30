import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";

Modal.setAppElement("#root");

const AnnouncementList = ({ userRole }) => {
  const [announcements, setAnnouncements] = useState([
    {
      header: "مرحبًا بكم",
      description: "مرحبًا بكم في المنصة! نأمل أن تجدوا كل ما تحتاجونه.",
      time: "2024-09-20 10:30",
    },
    {
      header: "دورات جديدة",
      description: "تم إضافة دورات جديدة في مختلف التخصصات، لا تفوتوا الفرصة!",
      time: "2024-09-25 15:00",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddAnnouncement = (data) => {
    const currentTime = new Date().toISOString().slice(0, 16).replace("T", " ");

    setAnnouncements([
      ...announcements,
      {
        header: data.header,
        description: data.description,
        time: currentTime,
      },
    ]);

    // Show toast notification with custom responsive styles
    toast.success("تم إضافة الإعلان بنجاح!", {
      position: window.innerWidth > 768 ? "top-right" : "bottom-center", // Responsive positioning
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { width: window.innerWidth > 768 ? "350px" : "100%" }, // Responsive width
    });

    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="p-4" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="mb-4 text-[2.5rem] font-bold">الإعلانات</h2>
        {userRole === "admin" && (
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 text-white rounded-full bg-brand-500 hover:bg-brand-200"
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            <h3 className="mb-2 text-xl font-semibold text-blue-600">
              {announcement.header}
            </h3>
            <p className="mb-2 text-gray-700">{announcement.description}</p>
            <small className="text-gray-500">
              تمت الإضافة: {announcement.time}
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
        <div className="w-5/6 p-6 bg-white rounded-lg md:w-2/6 ">
          <h2 className="mb-4 text-[2rem] font-bold">إضافة إعلان جديد</h2>
          <form onSubmit={handleSubmit(handleAddAnnouncement)}>
            <div className="mb-4">
              <label className="block mb-2">عنوان الإعلان</label>
              <input
                type="text"
                {...register("header", { required: "هذا الحقل مطلوب" })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.header && (
                <p className="text-red-600">{errors.header.message}</p>
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
