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
    غائب: 0,
    كورس: 0,
  },
  {
    name: "Mon",
    غائب: 0,
    كورس: 0,
  },
  {
    name: "Tue",
    غائب: 0,
    كورس: 0,
  },
  {
    name: "Wed",
    غائب: 0,
    كورس: 0,
  },
  {
    name: "Thr",
    غائب: 0,
    كورس: 3,
  },
];

const AttendanceChart = () => {
  return (
    <div dir="rtl" className="w-full h-full p-4 mt-4 bg-white rounded-2xl">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold">كورسات المنصة</h1>
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
            dataKey="كورس"
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
