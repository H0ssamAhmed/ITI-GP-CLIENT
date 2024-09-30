import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPen, FaCamera } from "react-icons/fa";

const ProfileDetails = () => {
  const [image, setImage] = useState("/src/assets/user-placeholder.jpg");
  const [showModal, setShowModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = () => {
    // Simulate a successful password change
    toast.success("تم تغيير كلمة المرور بنجاح!");
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md p-6 mx-auto space-y-6 bg-white rounded-lg shadow-lg">
      {/* Profile Image Section */}
      <div className="relative w-32 h-32">
        <img
          src={image}
          alt="profile"
          className="object-cover w-32 h-32 rounded-full"
        />
        <label
          htmlFor="imageUpload"
          className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        >
          <FaCamera ra className="text-gray-600" />
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Profile Info */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">اسم المستخدم</h2>
        <p className="text-gray-500">البريد الإلكتروني: user@example.com</p>
        <p className="text-gray-500">الهاتف: 123456789</p>
        <p className="text-gray-500">العنوان: المدينة، الدولة</p>
      </div>

      {/* محفظة Section */}
      <div className="flex items-center justify-between w-full p-4 bg-yellow-100 rounded-lg">
        <h3 className="text-lg font-semibold">محفظة</h3>
        <button className="px-4 py-2 text-white transition duration-200 bg-yellow-400 rounded-lg hover:bg-yellow-300">
          اشحن باستخدام PayPal
        </button>
      </div>

      {/* Change Password Link */}
      <div className="flex justify-center w-full">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setShowModal(true)}
        >
          تغيير كلمة المرور
        </button>
      </div>

      {/* Password Change Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center">
              تغيير كلمة المرور
            </h2>
            <input
              type="password"
              name="currentPassword"
              placeholder="كلمة المرور الحالية"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="كلمة المرور الجديدة"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 transition duration-200 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                إلغاء
              </button>
              <button
                className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handlePasswordSubmit}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProfileDetails;
