import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    غائب: 65,
    حاضر: 47,
  },
  {
    name: "Mon",
    غائب: 45,
    حاضر: 55,
  },
  {
    name: "Tue",
    غائب: 52,
    حاضر: 48,
  },
  {
    name: "Wed",
    غائب: 35,
    حاضر: 55,
  },
  {
    name: "Thr",
    غائب: 78,
    حاضر: 22,
  },
];

const AttendanceChart = () => {
  return (
    <div dir="rtl" className="w-full h-full p-4 mt-4 bg-white rounded-2xl">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold">الحضور</h1>
        <img
          src="/src/assets/dashboard/moreDark.png"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      {/* Chart */}

      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} color="#dddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            reversed
            tick={{ color: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis
            tickMargin={25}
            orientation="right"
            axisLine={false}
            tick={{ color: "#d1d5db" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="right"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "40px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
            iconSize={20}
            itemStyle={{ marginRight: "20px" }}
          />
          <Bar
            dataKey="غائب"
            fill="#fef08a"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="حاضر"
            fill="#7dd3fc"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
