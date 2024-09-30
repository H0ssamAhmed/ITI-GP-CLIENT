import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "",
    count: 100,
    fill: "white",
  },
  {
    name: "البنات",
    count: 53,
    fill: "#fef08a",
  },
  {
    name: "الأولاد",
    count: 47,
    fill: "#7dd3fc",
  },
];

const CountChart = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 mt-4 bg-white rounded-2xl">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold">التلاميذ</h1>
        <img
          src="/src/assets/dashboard/moreDark.png"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      {/* Charts */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="35%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <img
          src="/src/assets/dashboard/maleFemale.png"
          className="absolute -translate-x-1/2 translate-y-1/2 w-16 h-16 top-[39%] left-1/2"
        />
      </div>
      {/* Bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col items-center justify-center ">
          <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
          <span className="font-semibold text-[1.8rem]">1.254</span>
          <span className="text-[1.2rem] text-gray-400">الأولاد (55%)</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
          <span className="font-semibold text-[1.8rem]">1.254</span>
          <span className="text-[1.2rem] text-gray-400">البنات (45%) </span>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
