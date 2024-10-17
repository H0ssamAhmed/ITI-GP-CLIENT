import { Link } from "react-router-dom";
import DashbooardPagination from "../components/DashboardPagination";
import DashboardTable from "../components/DashboardTable";
import TableSearch from "../components/TableSearch";
import { role } from "../../../lib/data";
import { GrView } from "react-icons/gr";
import FormModal from "../components/FormModal";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchTeacherLevel, fetchTeachers } from "../dashboardAPI";
import teacherDefault from "../../../assets/dashboard/profileDefualt.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setSortConfig } from "../listSlice";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../components/ErrorMessage";
const columns = [
  {
    header: "معلومات",
    accessor: "info",
  },
  {
    header: "الرقم التعريفي",
    accessor: "teacherId ",
    className: "hidden md:table-cell",
  },

  {
    header: "المواد",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },

  // {
  //   header: "الفصول",
  //   accessor: "classes",
  //   className: "hidden md:table-cell",
  // },
  {
    header: "رقم الهاتف",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "المؤهل الدراسي",
    accessor: "educationalQualification",
    className: "hidden lg:table-cell",
  },
  {
    header: "المزيد",
    accessor: "more ",
    className: "hidden lg:table-cell",
  },
];

const TeachersList = () => {
  const dispatch = useDispatch();
  const { searchTerm, sortConfig, filter } = useSelector((state) => state.list);

  // Fetch teachers
  const {
    data: teachers,
    isLoading: isTeachersLoading,
    error: isTeachersError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchTeachers,
  });

  const teacherIds = teachers ? teachers.map((teacher) => teacher.id) : [];

  const teacherLevelQueries = useQueries({
    queries: teacherIds.map((id) => ({
      queryKey: ["teacherLevel", id],
      queryFn: () => fetchTeacherLevel(id),
      staleTime: Infinity,
      cacheTime: 5 * 60 * 1000,
      enabled: !!id,
    })),
  });

  const teacherLevels = teacherLevelQueries.map((query, index) => {
    if (query.isError) {
      console.log(`Error fetching level for teacher ${teacherIds[index]}`);
      return "لا يوجد";
    } else if (query.isSuccess && query.data) {
      const level = query.data[0]?.level?.title || "لا يوجد فصول محددة";
      console.log(`Fetched level for teacher ${teacherIds[index]}: ${level}`);
      return level;
    }
  });

  console.log(teacherLevels);

  if (isTeachersLoading) return <Spinner />;
  if (isTeachersError)
    return <ErrorMessage message="فشل تحميل بيانات المعلمين" />;

  let filteredTeachers = teachers?.filter((teacher) => {
    const teacherName = teacher.firstName?.normalize("NFC") || "";
    const searchTermNormalized = searchTerm?.normalize("NFC") || "";

    return teacherName.includes(searchTermNormalized);
  });

  if (filter) {
    filteredTeachers = filteredTeachers.filter((teacher) => {
      return teacher.firstName?.includes(filter);
    });
  }

  if (sortConfig) {
    filteredTeachers.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString() || "";
      const bValue = b[sortConfig.key]?.toString() || "";
      const compareResult = aValue.localeCompare(bValue);

      if (compareResult === 0 && sortConfig.secondaryKey) {
        const aSecondary = a[sortConfig.secondaryKey]?.toString() || "";
        const bSecondary = b[sortConfig.secondaryKey]?.toString() || "";
        return aSecondary.localeCompare(bSecondary);
      }

      return sortConfig.direction === "asc" ? compareResult : -compareResult;
    });
  }

  const handleSort = () => {
    if (sortConfig?.key === "firstName" && sortConfig?.direction === "asc") {
      dispatch(setSortConfig({ key: "firstName", direction: "desc" }));
    } else {
      dispatch(setSortConfig({ key: "firstName", direction: "asc" }));
    }
  };

  const renderRow = (item, index) => (
    <tr
      className="text-[1rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
      key={item.id}
    >
      <td className="flex items-center gap-4 p-4">
        {item.picture ? (
          <img
            src={item.picture}
            alt="teacherImage"
            className="object-cover w-10 h-10 rounded-full md:hidden lg:block "
          />
        ) : (
          <img
            src={teacherDefault}
            alt="userdefaultprofileimage"
            className="object-cover w-10 h-10 rounded-full md:hidden lg:block "
          />
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.firstName}</h3>
          <p className="text-gray-400">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.id.slice(0, 8).toUpperCase()}
      </td>
      <td className="hidden md:table-cell">{item.specialization}</td>

      <td className="hidden md:table-cell">{item.phoneNumber}</td>
      <td className="hidden md:table-cell">{item.educationalQualification}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/list/teachers/${item.id}`}>
            <button className="flex items-center justify-center transition-shadow duration-300 ease-in-out rounded-full shadow-md w-9 h-9 bg-brand-200 hover:bg-brand-100 hover:shadow-lg">
              <GrView className="w-5 h-5" />
            </button>
          </Link>

          {role === "admin" && (
            <FormModal
              table="المعلم"
              queryKey="teachers"
              type="delete"
              id={item.id}
            />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md ">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-[1.9rem]">
          جميع المعلمين
        </h1>
        {/* Search Bar + Buttons */}
        <div className="flex flex-col items-center w-full gap-4 md:flex-row md:w-auto">
          <TableSearch />
          <div className="flex items-center self-start gap-4">
            <button
              onClick={handleSort}
              className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full"
            >
              {" "}
              <img className="w-7 h-7" src="/src/assets/dashboard/sort.png" />
            </button>
          </div>
        </div>
      </div>
      {/* Middle */}
      <div>
        <DashboardTable
          columns={columns}
          renderRow={renderRow}
          data={filteredTeachers}
        />
      </div>
      {/* Pagiantion */}
      <div>
        <DashbooardPagination />
      </div>
    </div>
  );
};

export default TeachersList;
