import { useState } from "react";
import DashboardTable from "../components/DashboardTable";
import { role } from "../../../lib/data"; // Removed `subjectsData` as data comes from API
import FormModal from "../components/FormModal";
import { useQuery } from "@tanstack/react-query";
import { deleteCourseId, fetchAllCourses } from "../dashboardAPI";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../../../ui/Spinner";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";

const columns = [
  {
    header: "إسم الكورس",
    accessor: "title", // Changed to match your API data structure
  },
  {
    header: "سعر الكورس",
    accessor: "price",
  },
  {
    header: "المرحلة الدراسية",
    accessor: "levelTitle",
  },
  {
    header: "المدرسين",
    accessor: "teacherName",
    className: "hidden md:table-cell",
  },
  {
    header: "المزيد",
    accessor: "more",
    className: "hidden lg:table-cell",
  },
];

const SubjectsList = () => {
  // State for search and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const {
    data: courses,
    isLoading: isCoursesLoading,
    error: isCourseError,
    refetch: refetchRequests,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchAllCourses,
  });

  if (isCoursesLoading) return <Spinner />;
  if (isCourseError)
    return <ErrorMessage message="فشل تحميل بيانات الكورسات" />;

  const courseData = courses?.data || [];

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourseId(id);
      toast.success("تم حذف الكورس بنجاح");
      refetchRequests();
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  // Filter courses based on search query
  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort courses based on sortField and sortOrder
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // If already sorted by this field, toggle order
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Set new sort field and default to ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderRow = (item) => (
    <tr
      className="text-[1rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
      key={item.id}
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.title}</h3>
      </td>
      <td>{item.price}</td>
      <td>{item.levelTitle}</td>
      <td>{item.teacherName}</td>
      <td>
        <button
          className="h-10 w-10 flex items-center justify-center"
          title="Delete"
          onClick={() => {
            handleDeleteCourse(item.id);
          }}
        >
          <AiOutlineDelete className="text-[1.6rem] text-red-500  hover:text-red-300  transition-all duration-300" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md ">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-4">
          <h1 className="hidden md:block font-semibold text-[1.9rem]">
            جميع كورسات المنصة
          </h1>
          <p className="text-[1.3rem] text-gray-400">
            إجمالي عدد الكورسات {filteredCourses.length}
          </p>
        </div>
        {/* Search Bar + Buttons */}
        <div className="flex flex-col items-center w-full gap-4 md:flex-row md:w-auto">
          <div className="items-center justify-start w-full flex md:w-auto ring-[1.5px] ring-gray-300 px-2 text-lg rounded-full gap-2 transition-transform duration-300 focus-within:scale-105">
            <img src="/src/assets/dashboard/search.png" className="w-5 h-5" />
            <input
              type="text"
              placeholder="بحث.."
              className="w-[15rem] bg-transparent p-2 focus:outline-none outline-none"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center self-start gap-4">
            <button
              className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full"
              onClick={() => handleSort("price")}
            >
              <AttachMoneyIcon />
            </button>
            <button
              className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full"
              onClick={() => handleSort("title")}
            >
              <img
                className="w-7 h-7"
                src="/src/assets/dashboard/sort.png"
                alt="Sort by title"
              />
            </button>
          </div>
        </div>
      </div>
      {/* Middle */}
      <div>
        <DashboardTable
          columns={columns}
          renderRow={renderRow}
          data={sortedCourses}
        />
      </div>
    </div>
  );
};

export default SubjectsList;
