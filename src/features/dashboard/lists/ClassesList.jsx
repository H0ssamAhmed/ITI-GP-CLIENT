import React, { useEffect, useState } from "react";
import DashbooardPagination from "../components/DashboardPagination";
import DashboardTable from "../components/DashboardTable";
import TableSearch from "../components/TableSearch";
import { role } from "../../../lib/data"; // Assuming role is coming from the data file
import FormModal from "../components/FormModal";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchAllLevels, fetchCoursesInLevel } from "../dashboardAPI";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../components/ErrorMessage";

// Updated columns
const columns = [
  {
    header: "الصف الدراسي",
    accessor: "className",
  },
  {
    header: "عدد الكورسات المتاحة",
    accessor: "coursesCount",
    className: "",
  },
  {
    header: "عدد الطلاب المشتركين",
    accessor: "studentsCount",
    className: "",
  },
  {
    header: "المزيد",
    accessor: "more",
    className: "hidden lg:table-cell",
  },
];

const ClassesList = () => {
  // First query to fetch all levels
  const {
    data: allLevels,
    isLoading: isLevelLoading,
    error: isLevelError,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: fetchAllLevels,
  });

  const [levelAndSubLevelIds, setLevelAndSubLevelIds] = useState([]);

  // UseEffect to set the level and sub-level IDs after `allLevels` is fetched
  useEffect(() => {
    if (allLevels?.data) {
      const extractedIds = allLevels.data.map((level) => ({
        levelId: level.id,
        subLevels: level.subLevels.map((subLevel) => ({
          id: subLevel.id,
          title: subLevel.title,
        })),
      }));
      setLevelAndSubLevelIds(extractedIds);
    }
  }, [allLevels]);

  // UseQueries to fetch courses for each sublevel
  const courseQueries = useQueries(
    levelAndSubLevelIds.flatMap((level) =>
      level.subLevels.map((subLevel) => ({
        queryKey: ["courseInLevel", subLevel.id],
        queryFn: () => fetchCoursesInLevel(subLevel.id),
        enabled: true, // Enable the query
      }))
    )
  );

  // Loading and Error handling for the first query
  if (isLevelLoading) return <Spinner />;
  if (isLevelError || !allLevels)
    return <ErrorMessage message="فشل تحميل بيانات الصفوف" />;

  // Combine courses data with sublevels
  const combinedLevels = levelAndSubLevelIds.map((level, levelIndex) => {
    return {
      ...level,
      subLevels: level.subLevels.map((subLevel, subLevelIndex) => ({
        ...subLevel,
        courses:
          courseQueries[levelIndex * level.subLevels.length + subLevelIndex]
            ?.data || [],
        coursesCount:
          courseQueries[levelIndex * level.subLevels.length + subLevelIndex]
            ?.data?.length || 0,
      })),
    };
  });

  const renderRow = (level) => {
    // Render the main level
    return (
      <React.Fragment key={level.levelId}>
        <tr className="text-[1.2rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200">
          <td className="flex items-center gap-4 p-4">
            <h3 className="font-semibold">{level.levelId}</h3>
          </td>
          <td colSpan="3">
            عدد الكورسات المتاحة:{" "}
            {level.subLevels.reduce(
              (total, sub) => total + (sub.coursesCount || 0),
              0
            ) || "لا يوجد"}
          </td>
        </tr>

        {/* Map through subLevels */}
        {level.subLevels.map((subLevel) => (
          <tr
            className="text-[1rem] bg-gray-50 hover:bg-gray-200 cursor-default border-b border-gray-300"
            key={subLevel.id}
          >
            <td className="pl-8">{subLevel.title}</td>
            <td>عدد الكورسات المتاحة: {subLevel.coursesCount || "N/A"}</td>
            <td>عدد الطلاب المشتركين: {subLevel.studentsCount || "N/A"}</td>
            <td>
              <div className="flex items-center gap-2">
                {role === "admin" && (
                  <FormModal
                    table="الصف الدراسي"
                    type="delete"
                    item={subLevel.id}
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-[1.9rem]">
          جميع الصفوف الدراسية
        </h1>
        {/* Search Bar + Buttons */}
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
              <FormModal table="الصف الدراسي" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* Middle */}
      <div>
        <DashboardTable
          columns={columns}
          renderRow={(level) => renderRow(level)} // Let the table call renderRow once per level
          data={combinedLevels} // Pass combined levels to DashboardTable
        />
      </div>

      {/* Pagination */}
      <div>
        <DashbooardPagination />
      </div>
    </div>
  );
};

export default ClassesList;
