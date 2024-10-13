import DashbooardPagination from "../components/DashboardPagination";
import DashboardTable from "../components/DashboardTable";
import TableSearch from "../components/TableSearch";
import { resultsData, role } from "../../../lib/data";
import { RiDeleteBinLine } from "react-icons/ri";
import FormModal from "../components/FormModal";
const columns = [
  {
    header: "المادة",
    accessor: "info",
  },
  {
    header: "الطالب",
    accessor: "teacherId ",
    className: "hidden md:table-cell",
  },

  {
    header: "الدرجة",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },

  {
    header: "المدرس",
    accessor: "phoneNumber",
    className: "hidden lg:table-cell",
  },

  {
    header: "السنة الدراسية",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "التاريخ",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "المزيد",
    accessor: "more ",
    className: "hidden lg:table-cell",
  },
];

const ResultsList = () => {
  const renderRow = (item) => (
    <tr
      className="text-[1rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
      key={item.id}
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.subject}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <button className="flex items-center justify-center transition-shadow duration-300 ease-in-out bg-red-400 rounded-full shadow-md w-9 h-9 hover:bg-red-200 hover:shadow-lg">
              <RiDeleteBinLine className="w-5 h-5" />
            </button>
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
          جميع نتائج الإختبارات
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
            {(role === "admin" || role === "teacher") && (
              /* <button className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full">
                {" "}
                <img className="w-7 h-7" src="/src/assets/dashboard/plus.png" />
              </button> */
              <FormModal table="النتيجة" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* Middle */}
      <div>
        <DashboardTable
          columns={columns}
          renderRow={renderRow}
          data={resultsData}
        />
      </div>
      {/* Pagiantion */}
      <div>
        <DashbooardPagination />
      </div>
    </div>
  );
};

export default ResultsList;
