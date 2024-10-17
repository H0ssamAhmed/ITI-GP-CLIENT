import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchParentData } from "../features/dashboard/dashboardAPI";

const ParentLogin = () => {
  const navigate = useNavigate();
  const [parentId, setParentId] = useState("");

  const { refetch } = useQuery({
    queryKey: ["parentData", parentId],
    queryFn: () => fetchParentData(parentId),
    enabled: false,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        navigate(`/dashboard/parent/${parentId}`, {
          state: { parentData: data },
        });
      } else {
        toast.error("رقم ولي الأمر غير موجود. حاول مرة أخرى.");
      }
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    },
  });

  const handleLogin = async () => {
    if (parentId) {
      const result = await refetch();
      navigate(`/dashboard/parent/${parentId}`, {
        state: { parentData: result.data },
      });

      if (result.data && result.data.length === 0) {
        toast.error("رقم ولي الأمر غير موجود. حاول مرة أخرى.");
      }
    } else {
      toast.error("يرجى إدخال رقم ولي الأمر.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2 md:flex-row md:gap-10 lg:gap-48">
      <img
        className="w-full mb-6 md:w-1/2 md:mb-0"
        src="/src/assets/parent.svg"
        alt="Parent"
      />
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-6">
        <h1 className="w-[60rem] mb-6 text-[2rem] font-semibold text-center text-brand-600 md:text-3xl lg:text-[3rem]">
          مع ذاكرلي تـابع مستوى إبنك لحظة بلحظة
        </h1>
        <div className="w-full mb-4">
          <input
            type="text"
            placeholder="أدخل رقم ولي الأمر"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 text-white transition duration-300 rounded-md bg-brand-600 hover:bg-brand-700"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default ParentLogin;
