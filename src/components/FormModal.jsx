import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri"; // Importing the icon
import TeacherForm from "../features/dashboard/components/forms/TeacherForm";

const FormModal = ({ table, type, data, id }) => {
  const size = type === "create" ? "w-9 h-9" : "w-10 h-10";
  const bgColor =
    type === "create"
      ? "bg-yellow-200"
      : type === "update"
      ? "bg-brand-200"
      : "bg-red-400";

  const hoverColor =
    type === "create"
      ? "hover:shadow-lg hover:bg-yellow-100"
      : type === "update"
      ? "hover:bg-brand-100 hover:shadow-lg"
      : "hover:bg-red-200 hover:shadow-lg";

  const typeToImage = {
    create: "create.png",
    update: "update.png",
  };

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" ? (
      <form className="flex flex-col items-center gap-6 p-6 text-center">
        <span className="text-lg font-semibold">
          سيتم حذف جميع البيانات، هل أنت متأكد أنك تريد حذف {table}؟
        </span>
        <button className="px-6 py-3 text-white transition duration-300 bg-red-600 rounded-md shadow-md hover:bg-red-500">
          حذف
        </button>
      </form>
    ) : (
      <TeacherForm type="create" table="معلم" />
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={` ${size} ${hoverColor} rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-300 ease-in-out ${bgColor}`}
      >
        {type === "delete" ? (
          <RiDeleteBinLine className="w-5 h-5 text-black" />
        ) : (
          <img
            className="w-7 h-7"
            alt=""
            src={`/src/assets/dashboard/${typeToImage[type]}`}
          />
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setOpen(false)}
          ></div>

          {/* Modal */}
          <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] lg:w-[50%] space-y-4">
            <Form />
            <div
              className="absolute cursor-pointer top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <img
                src="/src/assets/dashboard/close.png"
                alt="closeicon"
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
