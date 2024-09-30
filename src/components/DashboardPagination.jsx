import React from "react";

const DashbooardPagination = () => {
  return (
    <div className="flex items-center justify-between p-4 text-gray-500">
      <button
        disabled
        className="px-4 py-2 text-lg font-semibold rounded-md bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        السابق
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="px-3 py-1 font-bold text-white transition-colors rounded-sm shadow-lg bg-brand-600 hover:bg-brand-500">
          ١
        </button>
        <button className="px-3 py-1 transition-colors rounded-sm hover:bg-gray-300">
          ٢
        </button>
        <button className="px-3 py-1 transition-colors rounded-sm hover:bg-gray-300">
          ٣
        </button>
        ...
        <button className="px-3 py-1 transition-colors rounded-sm hover:bg-gray-300">
          ١٠
        </button>
      </div>
      <button className="px-4 py-2 text-lg font-semibold transition-colors rounded-md bg-slate-200 hover:bg-gray-300">
        التالي
      </button>
    </div>
  );
};

export default DashbooardPagination;
