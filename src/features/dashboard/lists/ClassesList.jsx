import React, { useState } from "react";
import DashbooardPagination from "../components/DashboardPagination";
import DashboardTable from "../components/DashboardTable";
import TableSearch from "../components/TableSearch";
import { role } from "../../../lib/data";
import FormModal from "../components/FormModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLevel, fetchAllLevels } from "../dashboardAPI";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { toast } from "react-toastify";
import CreateLevelForm from "../components/forms/CreateLevelForm";

const columns = [
  {
    header: "الصف الدراسي",
    accessor: "className",
  },
  {
    header: "عدد الكورسات المتاحة",
    accessor: "coursesCount",
  },
  {
    header: "عدد الطلاب المشتركين",
    accessor: "studentsCount",
  },
  {
    header: "المزيد",
    accessor: "more",
    className: "hidden lg:table-cell",
  },
];

const ClassesList = () => {
  const queryClient = useQueryClient();
  const {
    data: allLevels,
    isLoading: isLevelLoading,
    error: isLevelError,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: fetchAllLevels,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: createLevel,

    onSuccess: () => {
      toast.success("تم إنشاء المرحلة الدراسية بنجاح");
      queryClient.invalidateQueries("levels");
    },
  });

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveLevel = (newLevelData) => {
    mutation.mutate(newLevelData);
  };

  if (isLevelLoading) return <Spinner />;
  if (isLevelError || !allLevels)
    return <ErrorMessage message="فشل تحميل بيانات الصفوف" />;

  const renderRow = (level) => {
    return (
      <React.Fragment key={level.id}>
        {/* Main Level Row */}
        <tr className="text-[1.2rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200">
          <td className="flex items-center gap-4 p-4">
            <h3 className="font-semibold">{level.title}</h3>
          </td>
          <td></td>
          <td></td>
          <td colSpan="4">
            <div className="flex items-center gap-2">
              {role === "admin" && (
                <FormModal
                  table="المرحلة الدراسية"
                  type="delete"
                  item={level.id}
                />
              )}
            </div>
          </td>
        </tr>

        {/* Sub-Level Rows */}
        {level.subLevels?.map((subLevel) => (
          <tr
            className="text-[1rem] bg-gray-50 hover:bg-gray-200 cursor-default border-b border-gray-300"
            key={subLevel.id}
          >
            <td className="pl-8">{subLevel.title}</td>
            <td>عدد الكورسات المتاحة: {subLevel.courses.length || "N/A"}</td>
            <td>عدد الطلاب المشتركين: {subLevel.studentsCount || "N/A"}</td>
          </tr>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-[1.9rem]">
          جميع الصفوف الدراسية
        </h1>
        <div className="flex flex-col items-center w-full gap-4 md:flex-row md:w-auto">
          <TableSearch />
          <div className="flex items-center self-start gap-4">
            <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full">
              <img className="w-7 h-7" src="/src/assets/dashboard/filter.png" />
            </button>
            <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full">
              <img className="w-7 h-7" src="/src/assets/dashboard/sort.png" />
            </button>
            {role === "admin" && (
              <button
                onClick={handleCreateClick}
                className="create-button flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full"
              >
                <img
                  className="w-7 h-7"
                  src="/src/assets/dashboard/create.png"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <CreateLevelForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLevel}
      />

      <div>
        <DashboardTable
          columns={columns}
          renderRow={renderRow}
          data={allLevels.data}
        />
      </div>
    </div>
  );
};

export default ClassesList;
