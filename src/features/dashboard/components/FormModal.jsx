import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import TeacherForm from "./forms/TeacherForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../dashboardAPI";

const FormModal = ({ table, type, id, queryKey }) => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toast.success(`تم حذف ${table} بنجاح`);
      queryClient.invalidateQueries([`${queryKey}`]);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleDelete = () => {
    mutate();
  };

  const size = type === "create" ? "text-[1.6rem]" : "text-[1.6rem]";
  const bgColor =
    type === "create"
      ? "bg-yellow-200"
      : type === "update"
      ? "bg-blue-200"
      : "";

  const hoverColor =
    type === "create"
      ? "hover:bg-yellow-100"
      : type === "update"
      ? "hover:bg-blue-100 "
      : "hover:text-red-200 ";

  const typeToImage = {
    create: "create.png",
    update: "update.png",
  };

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" ? (
      <form
        className="flex flex-col items-center gap-6 p-8 text-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
          setOpen(false);
        }}
      >
        <span className="text-lg font-semibold text-gray-800">
          سيتم حذف جميع البيانات، هل أنت متأكد أنك تريد حذف {table}؟
        </span>
        <button
          disabled={isDeleting}
          className="px-6 py-3 text-white transition duration-300 bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          {isDeleting ? "جار الحذف..." : "حذف"}
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
        className={` ${size} flex items-center justify-center p-2 rounded-md  transition-shadow duration-300 ease-in-out ${bgColor}`}
      >
        {type === "delete" ? (
          <RiDeleteBinLine
            className={`text-red-500 ${size} ${hoverColor} transition-all duration-300 ease-in-out`}
          />
        ) : (
          <img
            className="w-7 h-7"
            alt="actionIcons"
            src={`/src/assets/dashboard/${typeToImage[type]}`}
          />
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gray-800 opacity-70"
            onClick={() => setOpen(false)}
          ></div>

          {/* Modal */}
          <div className="relative z-20 flex items-center justify-center w-full p-6 md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out">
            <div className="relative p-6 space-y-6">
              {/* Form */}
              <Form />

              {/* Close Icon */}
              <div
                className="absolute top-4 right-4 text-gray-400 transition-colors duration-200 cursor-pointer hover:text-gray-600"
                onClick={() => setOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
