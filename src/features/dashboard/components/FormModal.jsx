import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri"; // Importing the icon
import TeacherForm from "./forms/TeacherForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteUser } from "../dashboardAPI";

const FormModal = ({ table, type, data, id, queryKey }) => {
  const queryClient = useQueryClient();
  console.log(queryKey);
  const { isLoading: isDeleting, mutate } = useMutation({
    // Deleting Fn
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      toast.success(`تم حذف ${table} بنجاح`);

      // invalditae query to detect any change and refetching the data
      queryClient.invalidateQueries(queryKey);
    },
    onError: (err) => toast.error(err.message),
  });

  function handleDelete() {
    mutate();
  }

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
      <form
        className="flex flex-col items-center gap-6 p-6 text-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
          setOpen(false);
        }}
      >
        <span className="text-lg font-semibold">
          سيتم حذف جميع البيانات، هل أنت متأكد أنك تريد حذف {table}؟
        </span>
        <button
          disabled={isDeleting}
          className="px-6 py-3 text-white transition duration-300 bg-red-600 rounded-md shadow-md hover:bg-red-500"
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
          <div className="fixed inset-0 z-20 flex items-center justify-center transition-all duration-300 ease-in-out bg-opacity-50 bg-gray backdrop-blur-sm">
            <div className="relative p-6 bg-white rounded-2xl shadow-2xl w-[90%] md:w-[60%] lg:w-[40%] space-y-6 transform transition-transform duration-300 ease-in-out scale-100">
              {/* Form */}
              <Form />

              {/* Close Icon */}
              <div
                className="absolute top-0 text-gray-400 transition-colors duration-200 cursor-pointer right-4 hover:text-gray-600"
                onClick={() => setOpen(false)}
              >
                {/* Using a more modern close icon from HeroIcons */}
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
