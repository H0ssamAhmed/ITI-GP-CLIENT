import DashboardTable from "../components/DashboardTable";
import TableSearch from "../components/TableSearch";
import { GiConfirmed } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCourseById,
  deleteTeacherById,
  fetchAllPendingRequests,
  verifyCourseById,
  verifyTeacherById,
} from "../dashboardAPI";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { toast } from "react-toastify";

const columns = [
  {
    header: "نوع الطلب",
    accessor: "requestType",
  },
  {
    header: "الاسم / العنوان",
    accessor: "nameOrTitle",
  },
  {
    header: "البريد الإلكتروني / الوصف",
    accessor: "emailOrDescription",
  },
  {
    header: "التخصص / المستوى",
    accessor: "specializationOrLevel",
  },
  {
    header: "خيارات",
    accessor: "option",
  },
];

const PlatformRequestsList = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: pendingRequests,
    isLoading: isLoadingRequests,
    error: isErrorRequest,
  } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: fetchAllPendingRequests,
  });

  if (isLoadingRequests) return <Spinner />;
  if (isErrorRequest)
    return <ErrorMessage message="فشل تحميل بيانات الطلبات" />;

  // Handling Delete based on Req Type.
  const handleConfirmDelete = async () => {
    try {
      if (itemToDelete.requestType === "teacher") {
        await deleteTeacherById(itemToDelete.id);
      } else if (itemToDelete.requestType === "course") {
        await deleteCourseById(itemToDelete.id);
      }
      toast.success("تم حذف الطلب بنجاح");
      setOpenDeleteModal(false);
      queryClient.invalidateQueries(["pendingRequests"]);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 404) {
        toast.error("لم يتم العثور على العنصر للحذف");
      } else {
        toast.error("حدث خطأ أثناء الحذف");
      }
    }
  };

  const handleVerifyClick = async (item) => {
    try {
      if (item.requestType === "teacher") {
        await verifyTeacherById(item.id);
      } else if (item.requestType === "course") {
        await verifyCourseById(item.id);
      }

      toast.success("تم التحقق من الطلب بنجاح");
      // Invalidate the query to refresh data
      queryClient.invalidateQueries(["pendingRequests"]);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء التحقق");
    }
  };

  // Check if there are no pending requests
  const noPendingRequests =
    pendingRequests.teacherData.length === 0 &&
    pendingRequests.courseData.length === 0;

  const renderRow = (item, type) => (
    <tr
      className="text-[1rem] hover:bg-brand-50 cursor-pointer even:bg-gray-50 border-b border-gray-200 transition-all duration-300"
      key={item.id}
    >
      <td className="p-4">
        {type === "teacher" ? "طلب إضافة مدرس" : "طلب إضافة كورس"}
      </td>
      <td className="p-4">
        {type === "teacher" ? `${item.firstName} ${item.lastName}` : item.title}
      </td>
      <td className="p-4">
        {type === "teacher" ? item.email : item.description}
      </td>
      <td className="p-4">
        {type === "teacher" ? item.specialization : item.level?.title}
      </td>
      <td className="p-2">
        <div className="flex items-center justify-start gap-2">
          {/* Confirm Button */}
          <button
            className="flex items-center justify-center w-10 h-10 text-green-400 transition-all duration-300 rounded-full hover:text-green-200 text:bg-green-300"
            title="Confirm"
            onClick={() => handleVerifyClick(item)}
          >
            <GiConfirmed className="text-[1.6rem]" />
          </button>

          {/* Delete Button */}
          <button
            className="flex items-center justify-center w-10 h-10 "
            title="Delete"
            onClick={() => {
              setItemToDelete(item); // Store the item to delete
              setOpenDeleteModal(true);
            }}
          >
            <AiOutlineDelete className="text-[1.6rem] text-red-500  hover:text-red-300  transition-all duration-300" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="hidden md:block font-semibold text-[1.9rem]">
            جميع طلبات المنصة
          </h1>
          <div className="hidden lg:flex gap-14">
            <span className="text-[1.3rem] text-gray-400">
              إجمالي طلبات إضافة مدرس : {pendingRequests.teacherCount}
            </span>
            <span className="text-[1.3rem] text-gray-400">
              إجمالي طلبات إضافة كورس : {pendingRequests.courseCount}
            </span>
          </div>
        </div>
        {/* Search Bar + Buttons */}
        <div className="flex flex-col items-center w-full gap-4 md:flex-row md:w-auto">
          <TableSearch />
          <div className="flex items-center self-start gap-4">
            <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full hover:bg-yellow-100">
              <img className="w-7 h-7" src="/src/assets/dashboard/sort.png" />
            </button>
          </div>
        </div>
      </div>

      {/* Middle */}

      {noPendingRequests ? (
        <div className="text-center flex flex-col gap-4 py-10 text-gray-500 text-[2rem]">
          <span className="text-3xl">
            {/* Add any additional styles here */}⛔
          </span>
          لا يوجد طلبات للعرض
        </div>
      ) : (
        <div>
          <DashboardTable
            columns={columns}
            data={[
              ...pendingRequests.teacherData.map((teacher) => ({
                ...teacher,
                requestType: "teacher",
              })),
              ...pendingRequests.courseData.map((course) => ({
                ...course,
                requestType: "course",
              })),
            ]}
            renderRow={(item) =>
              item.requestType === "teacher"
                ? renderRow(item, "teacher")
                : renderRow(item, "course")
            }
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-xl shadow-lg w-[100%] md:w-[60%] lg:w-[30%]">
            {/* Warning Icon */}
            <div className="flex justify-center mb-5">
              <div className="p-4 bg-yellow-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-[2rem] font-bold text-center text-black">
              تأكيد الحذف
            </h2>
            <p className="mt-4 text-center text-gray-500">
              هل تريد حذف هذا الطلب؟ عند حذف هذا الطلب لا يمكن العودة إليه.
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                className="px-6 py-2 text-white transition-all duration-300 bg-red-600 rounded-lg shadow hover:bg-red-500"
                onClick={handleConfirmDelete}
              >
                حذف
              </button>
              <button
                className="px-6 py-2 text-gray-800 transition-all duration-300 bg-gray-300 rounded-lg shadow hover:bg-gray-400"
                onClick={() => setOpenDeleteModal(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformRequestsList;
