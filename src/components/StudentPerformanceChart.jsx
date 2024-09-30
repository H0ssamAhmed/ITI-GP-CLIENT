import { Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [{ name: "التقييم العام", value: 80 }];

const StudentPerformanceChart = () => {
  return (
    <div className="relative p-4 mb-10 bg-white rounded-md h-[30rem]">
      <h1 className="text-[2rem] font-semibold">التقييم</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#fef9c3"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <h1 className="font-bold text-[2rem]">80%</h1>
        <p className="text-[1.2rem] text-gray-400">من تقييم نهائي 100%</p>
      </div>
      <h1 className="absolute left-0 right-0 mx-auto font-semibold text-center bottom-20">
        متوسط تقييم الطالب
      </h1>
    </div>
  );
};

export default StudentPerformanceChart;
