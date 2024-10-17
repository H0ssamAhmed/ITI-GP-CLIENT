import React from "react";

const ExamResults = ({ son }) => {
  console.log(son);
  return (
    <div className="flex flex-col p-4 mb-6 bg-white rounded-2xl">
      <table className="min-w-full border border-white">
        <thead>
          <tr className="bg-brand-200">
            <th className="p-2 border border-gray-300">اسم الاختبار</th>
            <th className="p-2 border border-gray-300">الدرجة</th>
            <th className="p-2 border border-gray-300">درجة الطالب</th>
            <th className="p-2 border border-gray-300">مدة الإختبار</th>
            <th className="p-2 border border-gray-300">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {son.map((result) => (
            <tr
              key={result.id}
              className={
                result.score >= 0.6 * result.maxScore
                  ? "bg-green-100"
                  : "bg-red-100"
              }
            >
              <td className="p-2 border border-gray-300">
                {result.Quiz.title}
              </td>
              <td className="p-2 border border-gray-300">{result.maxScore}</td>
              <td className="p-2 border border-gray-300">{result.score}</td>
              <td className="p-2 border border-gray-300">
                {result.Quiz.Duration}
              </td>
              <td className="p-2 border border-gray-300">
                {result.score >= 0.6 * result.maxScore ? "ناجح" : "راسب"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamResults;
