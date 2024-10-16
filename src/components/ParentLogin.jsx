// ParentLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ParentLogin = () => {
  const navigate = useNavigate();
  const [parentId, setParentId] = useState(""); // State for parent ID input

  const handleLogin = async () => {
    // Your login logic here (e.g., fetch the student data based on parentId)
    // If login is successful:
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="flex gap-48">
      <img className="w-[50%]" src="/src/assets/parent.svg" />
      <div className="flex flex-col items-center justify-center h-screen gap-6 ">
        <h1 className="mb-6 text-[3rem] font-semibold text-brand-600">
          مع ذاكرلي تـابع مستوى إبنك لحظة بلحظة
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="أدخل رقم ولي الأمر"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="p-3 border border-gray-300 rounded-md shadow-sm w-96 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="py-3 text-white transition duration-300 rounded-md bg-brand-600 w-72 hover:bg-brand-700"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default ParentLogin;
