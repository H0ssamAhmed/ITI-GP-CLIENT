import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "يناير",
    profit: 4000,
  },
  {
    name: "فبراير",
    profit: 3000,
  },
  {
    name: "مارس",
    profit: 2000,
  },
  {
    name: "إبريل",
    profit: 2780,
  },
  {
    name: "مايو",
    profit: 1890,
  },
  {
    name: "يونيو",
    profit: 2390,
  },
  {
    name: "يوليو",
    profit: 3490,
  },
  {
    name: "أغسطس",
    profit: 3490,
  },
  {
    name: "سبتمبر",
    profit: 3490,
  },
  {
    name: "أكتوبر",
    profit: 3490,
  },
  {
    name: "نوفمبر",
    profit: 3490,
  },
  {
    name: "ديسمبر",
    profit: 3490,
  },
];

const FinanceChart = () => {
  return (
    <div
      dir="rtl"
      className="flex flex-col w-full h-full p-4 mt-4 bg-white rounded-2xl"
    >
      {/* TITLE */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-bold">العائد</h1>
        <img
          src="/src/assets/dashboard/moreDark.png"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={500} height={400} data={data}>
          <CartesianGrid color="#dddd" strokeDasharray="3 3" />
          <XAxis tickMargin={10} dataKey="name" reversed />
          <YAxis tickMargin={40} orientation="right" />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#6366f1"
            fill="#6366f1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
