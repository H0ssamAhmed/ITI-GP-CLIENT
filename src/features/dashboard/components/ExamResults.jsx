import React from "react";

const ExamResults = ({ sonName }) => {
  const results = [
    {
      id: 1,
      examName: "الاختبار الأول",
      lessonName: "الدرس الأول",
      score: "90%",
      examTime: "2024-09-20",
      status: "Pass",
    },
    {
      id: 2,
      examName: "الاختبار الثاني",
      lessonName: "الدرس الثاني",
      score: "85%",
      examTime: "2024-09-18",
      status: "Pass",
    },
    {
      id: 3,
      examName: "الاختبار الثالث",
      lessonName: "الدرس الثالث",
      score: "75%",
      examTime: "2024-09-15",
      status: "Fail",
    },
  ];

  return (
    <div className="flex flex-col p-4 mb-6 bg-white rounded-2xl">
      <h2 className="mb-4 text-[2rem] font-semibold">
        نتائج الاختبارات لابني {sonName}
      </h2>
      <table className="min-w-full border border-white">
        <thead>
          <tr className="bg-brand-200">
            <th className="p-2 border border-gray-300">اسم الاختبار</th>
            <th className="p-2 border border-gray-300">اسم الدرس</th>
            <th className="p-2 border border-gray-300">الدرجة</th>
            <th className="p-2 border border-gray-300">وقت الاختبار</th>
            <th className="p-2 border border-gray-300">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr
              key={result.id}
              className={
                result.status === "Pass" ? "bg-green-100" : "bg-red-100"
              }
            >
              <td className="p-2 border border-gray-300">{result.examName}</td>
              <td className="p-2 border border-gray-300">
                {result.lessonName}
              </td>
              <td className="p-2 border border-gray-300">{result.score}</td>
              <td className="p-2 border border-gray-300">{result.examTime}</td>
              <td className="p-2 border border-gray-300">{result.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamResults;
