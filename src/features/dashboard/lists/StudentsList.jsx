import { Link } from "react-router-dom";
import DashbooardPagination from "../../../components/DashboardPagination";
import DashboardTable from "../../../components/DashboardTable";
import TableSearch from "../../../components/TableSearch";
import { role, studentsData } from "../../../lib/data";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import FormModal from "../../../components/FormModal";
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
    header: "رقم الهاتف",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "العنوان",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "المزيد",
    accessor: "more ",
    className: "hidden lg:table-cell",
  },
];

const StudentsList = () => {
  const rednderRow = (item) => (
    <tr
      className="text-[1rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
      key={item.id}
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={item.photo}
          alt="teacherImage"
          className="object-cover w-10 h-10 rounded-full md:hidden lg:block "
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-gray-400">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/list/students/${item.id}`}>
            <button className="flex items-center justify-center transition-shadow duration-300 ease-in-out rounded-full shadow-md w-9 h-9 bg-brand-200 hover:bg-brand-100 hover:shadow-lg">
              <GrView className="w-5 h-5" />
            </button>
          </Link>

          {role === "admin" && (
            /* <button className="flex items-center justify-center transition-shadow duration-300 ease-in-out bg-red-400 rounded-full shadow-md w-9 h-9 hover:bg-red-200 hover:shadow-lg">
              <RiDeleteBinLine className="w-5 h-5" />
            </button> */

            <FormModal table="student" type="delete" id={item.id} />
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
            <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full hover:bg-yellow-100 hover:shadow-lg">
              {" "}
              <img className="w-7 h-7" src="/src/assets/dashboard/filter.png" />
            </button>
            <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full hover:shadow-lg hover:bg-yellow-100">
              {" "}
              <img className="w-7 h-7" src="/src/assets/dashboard/sort.png" />
            </button>

            {role === "admin" && (
              /* <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full">
                {" "}
                <img className="w-7 h-7" src="/src/assets/dashboard/plus.png" />
              </button> */
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* Middle */}
      <div>
        <DashboardTable
          columns={columns}
          rednderRow={rednderRow}
          data={studentsData}
        />
      </div>
      {/* Pagiantion */}
      <div>
        <DashbooardPagination />
      </div>
    </div>
  );
};

export default StudentsList;
