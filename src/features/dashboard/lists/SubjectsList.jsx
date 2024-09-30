import { Link } from "react-router-dom";
import DashbooardPagination from "../../../components/DashboardPagination";
import DashboardTable from "../../../components/DashboardTable";
import TableSearch from "../../../components/TableSearch";
import { role, subjectsData } from "../../../lib/data";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import FormModal from "../../../components/FormModal";
const columns = [
  {
    header: "إسم المادة",
    accessor: "subjectName",
  },
  {
    header: "المدرسين",
    accessor: "teachers ",
    className: "hidden md:table-cell",
  },

  {
    header: "المزيد",
    accessor: "more ",
    className: "hidden lg:table-cell",
  },
];

const SubjectsList = () => {
  const rednderRow = (item) => (
    <tr
      className="text-[1rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
      key={item.id}
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.name}</h3>
      </td>

      <td>{item.teachers.join(" , ")}</td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="المادة" type="update" data={item} />
              <FormModal table="المادة" type="delete" item={item.id} />
            </>
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
          جميع المواد الدراسية
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

              <FormModal table="المادة" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* Middle */}
      <div>
        <DashboardTable
          columns={columns}
          rednderRow={rednderRow}
          data={subjectsData}
        />
      </div>
      {/* Pagiantion */}
      <div>
        <DashbooardPagination />
      </div>
    </div>
  );
};

export default SubjectsList;
