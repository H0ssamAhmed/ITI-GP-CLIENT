import { useState } from "react";
import DashboardTable from "../components/DashboardTable";
import { useQuery } from "@tanstack/react-query";
import { deleteCourseId, getCourseDetails, getTeacherCourses } from "../dashboardAPI";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../../../ui/Spinner";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import defaultImage from "../../../assets/dashboard/profileDefualt.jpg";
import { formatDate } from "../../../utils/dateUtils";
import EditCourseModal from "../components/EditCourseModal";

const columns = [
  {
    header: "إسم الكورس",
    accessor: "title",
  },
  {
    header: "سعر الكورس",
    accessor: "price",
  },
  {
    header: "سعر الكورس بعد الخصم",
    accessor: "discountedPrice",
  },
  {
    header: "المرحلة الدراسية",
    accessor: "levelTitle",
    className: "hidden lg:table-cell",
  },
  {
    header: "التوثيق",
    accessor: "courseVerify",
    className: "hidden lg:table-cell",
  },
  {
    header: "تاريخ الإنشاء",
    accessor: "creationDate",
    className: "hidden lg:table-cell",
  },
  {
    header: "المزيد",
    accessor: "more",
    className: "hidden lg:table-cell",
  },
];

const TeacherSubjectsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [modalData, setModalData] = useState({});

  const {
    data: teacherCourses,
    isLoading: isTeacherCoursesLoading,
    error: isTeacherCoursesError,
    refetch: refetchRequests,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getTeacherCourses, // Ensure this function is defined correctly
  });

 
  if (isTeacherCoursesLoading) return <Spinner />;
  if (isTeacherCoursesError)
    return <ErrorMessage message="فشل تحميل بيانات الكورسات" />;

  const courseData = teacherCourses?.data || [];

  console.log(courseData);

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

  const handleEditCourse = (item) => {
    setSelectedCourseId(item.id);
    setIsEditModalOpen(true);
    setModalData (item)
  };

  const handleCloseModal = () => {
    setSelectedCourseId(null);
    setIsEditModalOpen(false);
  };

  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
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
        <h3 className="flex items-center gap-4 font-semibold">
          {item.image ? (
            <img src={`${item.image}`} className="w-10 h-10 rounded-full" />
          ) : (
            <img src={defaultImage} className="w-10 h-10 rounded-full" />
          )}
          {item.title}
        </h3>
      </td>
      <td>{item.price}</td>
      <td>{item.discountedPrice ? item.discountedPrice : "لا يوجد خصم"}</td>
      <td className="hidden lg:table-cell">{item.level?.title}</td>
      <td className="hidden lg:table-cell">
        {item.courseVerify ? "موثق" : "غير موثق"}
      </td>
      <td className="hidden lg:table-cell">{formatDate(item.createdAt)}</td>
      <td className="flex gap-2">
        <button
          className="flex items-center justify-center w-10 h-10"
          title="Edit"
          onClick={() => handleEditCourse(item)}
        >
          <AiOutlineEdit className="text-[1.6rem] text-brand-500 hover:text-brand-300 transition-all duration-300" />
        </button>

        <button
          className="flex items-center justify-center w-10 h-10"
          title="Delete"
          onClick={() => {
            handleDeleteCourse(item.id);
          }}
        >
          <AiOutlineDelete className="text-[1.6rem] text-red-500 hover:text-red-300 transition-all duration-300" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md ">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <h1 className="hidden md:block font-semibold text-[1.9rem]">
            جميع كورسات الخاصة
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

      {/* Edit Course Modal */}
      {isEditModalOpen  && (
        <EditCourseModal
          courseId={selectedCourseId}
          onClose={handleCloseModal}
          refetchCourses={refetchRequests} // Pass the refetch function to the modal
          modalData= {modalData}
        />
      )}
    </div>
  );
};

export default TeacherSubjectsList;
