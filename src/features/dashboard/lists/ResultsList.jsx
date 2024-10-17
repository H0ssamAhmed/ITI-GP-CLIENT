import DashboardTable from "../components/DashboardTable";
import TableSearch from "../components/TableSearch";
import { useQuery } from "@tanstack/react-query";
import { getStudentQuizes } from "../dashboardAPI";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setSortConfig } from "../listSlice";

const columns = [
  {
    header: "المادة",
    accessor: "subject",
  },
  {
    header: "درجةالإختبار",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "درجة الطالب",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "التوقيت",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },
];

const ResultsList = () => {
  const dispatch = useDispatch();
  const { searchTerm, sortConfig } = useSelector((state) => state.list);

  const {
    data: studentQuizes,
    isLoading: isStudentQuizesLoading,
    isError: isStudentQuizesError,
  } = useQuery({
    queryKey: ["studentQuizes"],
    queryFn: getStudentQuizes,
  });

  console.log(studentQuizes);

  if (isStudentQuizesLoading) return <Spinner />;
  if (isStudentQuizesError)
    return <ErrorMessage message="فشل تحميل بيانات الأختبارات" />;

  // Search and Filter
  let filteredQuizes = studentQuizes?.quizzes?.filter((quiz) => {
    const quizTitle = quiz?.quizTitle?.toLowerCase() || "";
    const searchTermNormalized = searchTerm?.toLowerCase() || "";

    return quizTitle.includes(searchTermNormalized);
  });

  // Sort Logic
  if (sortConfig) {
    filteredQuizes.sort((a, b) => {
      const aValue = a[sortConfig.key] || 0;
      const bValue = b[sortConfig.key] || 0;

      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    });
  }

  // Handle sorting by score
  const handleSort = () => {
    if (sortConfig?.key === "score" && sortConfig?.direction === "asc") {
      dispatch(setSortConfig({ key: "score", direction: "desc" }));
    } else {
      dispatch(setSortConfig({ key: "score", direction: "asc" }));
    }
  };

  // Render row for the table
  const renderRow = (item) => (
    <tr
      className="text-[1rem] p-2 hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
      key={item.maxScore}
    >
      <td className="hidden p-3 md:table-cell">{item.quizTitle}</td>
      <td className="hidden p-3 md:table-cell">{item.maxScore}</td>
      <td className="hidden p-3 md:table-cell">{item.score}</td>
      <td className="hidden p-3 md:table-cell">{item.duration}</td>
      <td className="hidden p-3 md:table-cell">{item.date}</td>
    </tr>
  );

  return (
    <div className="flex-1 p-4 m-4 mt-0 bg-white rounded-md">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block font-semibold text-[1.9rem]">
          جميع نتائج الإختبارات
        </h1>
        {/* Search Bar + Buttons */}
        <div className="flex flex-col items-center w-full gap-4 md:flex-row md:w-auto">
          <TableSearch
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <button
            onClick={handleSort}
            className="flex items-center justify-between w-10 h-10 p-2 bg-yellow-200 rounded-full"
          >
            <img className="w-7 h-7" src="/src/assets/dashboard/sort.png" />
          </button>
        </div>
      </div>
      {/* Middle */}
      <div>
        <DashboardTable
          columns={columns}
          renderRow={renderRow}
          data={filteredQuizes}
        />
      </div>
    </div>
  );
};

export default ResultsList;
