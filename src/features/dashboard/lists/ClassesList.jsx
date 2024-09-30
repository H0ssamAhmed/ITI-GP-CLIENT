import DashbooardPagination from "../../../components/DashboardPagination";
import DashboardTable from "../../../components/DashboardTable";
import TableSearch from "../../../components/TableSearch";
import { role } from "../../../lib/data"; // Assuming role is coming from the data file
import FormModal from "../../../components/FormModal";

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

const ClassesList = ({ data }) => {
  const renderRow = (item) => {
    const totalStudents = item.courses.reduce(
      (acc, course) => acc + course.numberOfSubscribedStudents,
      0
    );

    return (
      <tr
        className="text-[1rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
        key={item.id}
      >
        <td className="flex items-center gap-4 p-4">
          <h3 className="font-semibold">{item.className}</h3>
        </td>

        <td>{item.courses.length}</td>

        <td>{totalStudents}</td>

        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              /* <button className="flex items-center justify-center transition-shadow duration-300 ease-in-out bg-red-400 rounded-full shadow-md w-9 h-9 hover:bg-red-200 hover:shadow-lg">
                <RiDeleteBinLine className="w-5 h-5" />
              </button> */

              <FormModal table="الصف الدراسي" type="delete" item={item.id} />
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md ">
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
              {" "}
              <img className="w-7 h-7" src="/src/assets/dashboard/filter.png" />
            </button>
            <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full">
              {" "}
              <img className="w-7 h-7" src="/src/assets/dashboard/sort.png" />
            </button>

            {role === "admin" && (
              /* <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full">
                {" "}
                <img className="w-7 h-7" src="/src/assets/dashboard/plus.png" />
              </button> */

              <FormModal table="الصف الدراسي" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* Middle */}
      <div>
        <DashboardTable columns={columns} rednderRow={renderRow} data={data} />
      </div>
      {/* Pagination */}
      <div>
        <DashbooardPagination />
      </div>
    </div>
  );
};

export default ClassesList;
