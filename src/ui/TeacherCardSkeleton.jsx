import React from "react";

function TeacherCardSkeleton() {
  return (
    <div className="relative rounded-[1.6rem] mx-auto bg-brand-200 text-brand-900 w-[25.5rem] flex flex-col items-center justify-center animate-pulse">
      {/* Teacher Image Placeholder */}
      <div className="absolute rounded-4xl overflow-hidden border-4 w-60 h-60 border-yellow-300 top-[-5rem] bg-gray-300"></div>

      {/* Spacing adjustment between image and name */}
      <div className="flex items-center justify-between w-full px-8 mt-[10rem]">
        <div className="bg-gray-300 w-2/3 h-8 rounded"></div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
          <div className="bg-gray-300 w-12 h-8 rounded"></div>
        </div>
      </div>

      <div className="w-full px-8 mt-4">
        {/* Subject and Level Placeholders */}
        <div className="bg-gray-300 w-full h-8 rounded mb-4"></div>
        <div className="bg-gray-300 w-3/4 h-6 rounded"></div>
      </div>
      
      <div className="flex items-center flex-col gap-4 w-full justify-between px-8 py-4 mt-4">
        <div className="bg-gray-300 w-full h-10 rounded"></div>
        <div className="bg-gray-300 w-full h-10 rounded"></div>
      </div>
    </div>
  );
}

export default TeacherCardSkeleton;
