import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

const ErrorMessage = ({ message = "An error occurred" }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
      <AiOutlineWarning className="w-12 h-12 mb-4 text-red-600" />
      <h2 className="text-lg font-semibold text-red-700">{message}</h2>
      <p className="mt-2 text-gray-600">
        من فضلك حاول مرة أخرى أو تواصل مع الدعم الفني
      </p>
    </div>
  );
};

export default ErrorMessage;
