import { Link } from "react-router-dom";
import DashbooardPagination from "../components/DashboardPagination";
import DashboardTable from "../components/DashboardTable";
import TableSearch from "../components/TableSearch";
import { role } from "../../../lib/data";
import { GrView } from "react-icons/gr";
import FormModal from "../components/FormModal";
import { fetchStudents } from "../dashboardAPI";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../ui/Spinner";
import studentDefault from "../../../assets/dashboard/profileDefualt.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setSortConfig } from "../listSlice";
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
    header: "السنة الدراسية",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "الرقم القومي",
    accessor: "nationalID",
    className: "hidden lg:table-cell",
  },
  {
    header: "رقم الهاتف",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "رقم هاتف الوالد",
    accessor: "parentPhone",
    className: "hidden lg:table-cell",
  },

  {
    header: "المزيد",
    accessor: "more ",
    className: "hidden lg:table-cell",
  },
];

const StudentsList = () => {
  const dispatch = useDispatch();
  const { searchTerm, sortConfig, filter } = useSelector((state) => state.list);

  const {
    data: students,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message="خطأ اثناء تحميل بيانات الطلاب" />;

  let filteredStudents = students?.filter((student) => {
    const studentName = student.firstName?.normalize("NFC") || "";
    const searchTermNormalized = searchTerm?.normalize("NFC") || "";

    return studentName.includes(searchTermNormalized);
  });

  if (filter) {
    filteredStudents = filteredStudents.filter((student) => {
      return student.firstName?.includes(filter);
    });
  }

  if (sortConfig) {
    filteredStudents.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString() || "";
      const bValue = b[sortConfig.key]?.toString() || "";
      const compareResult = aValue.localeCompare(bValue);

      // Fallback to secondary sort (e.g., last name) if values are equal
      if (compareResult === 0 && sortConfig.secondaryKey) {
        const aSecondary = a[sortConfig.secondaryKey]?.toString() || "";
        const bSecondary = b[sortConfig.secondaryKey]?.toString() || "";
        return aSecondary.localeCompare(bSecondary);
      }

      return sortConfig.direction === "asc" ? compareResult : -compareResult;
    });
  }

  const handleSort = () => {
    // Example: toggle sorting by name
    if (sortConfig?.key === "firstName" && sortConfig?.direction === "asc") {
      dispatch(setSortConfig({ key: "firstName", direction: "desc" }));
    } else {
      dispatch(setSortConfig({ key: "firstName", direction: "asc" }));
    }
  };

  // Check if there are no pending requests
  const noStudents = students.length === 0 || students.length === undefined;

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
            src={studentDefault}
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
      <td className="hidden md:table-cell">{item.level.title}</td>
      <td className="hidden md:table-cell">{item.nationalID}</td>
      <td className="hidden md:table-cell">{item.phoneNumber}</td>
      <td className="hidden md:table-cell">{item.parentPhoneNumber}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/list/students/${item.id}`}>
            <button className="flex items-center justify-center transition-shadow duration-300 ease-in-out rounded-full shadow-md w-9 h-9 bg-brand-200 hover:bg-brand-100 hover:shadow-lg">
              <GrView className="w-5 h-5" />
            </button>
          </Link>

          {role === "admin" && (
            <FormModal table="الطالب" type="delete" id={item.id} />
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
          جميع الطلاب
        </h1>
        {/* Search Bar + Buttons */}
        <div className="flex flex-col items-center w-full gap-4 md:flex-row md:w-auto">
          <TableSearch />
          <div className="flex items-center self-start gap-4">
            <button
              onClick={handleSort}
              className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full hover:shadow-lg hover:bg-yellow-100"
            >
              {" "}
              <img className="w-7 h-7" src="/src/assets/dashboard/sort.png" />
            </button>
          </div>
        </div>
      </div>
      {/* Middle */}

      {noStudents ? (
        <div className="text-center flex flex-col gap-4 py-10 text-gray-500 text-[2rem]">
          <span className="text-3xl">
            {/* Add any additional styles here */}⛔
          </span>
          لايوجد طلاب للعرض
        </div>
      ) : (
        <div>
          <DashboardTable
            columns={columns}
            renderRow={renderRow}
            data={filteredStudents}
          />
        </div>
      )}
    </div>
  );
};

export default StudentsList;
