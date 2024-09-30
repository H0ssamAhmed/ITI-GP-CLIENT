import { CiMoneyBill } from "react-icons/ci";
import CoursesList from "../components/CoursesList";
import Announcement from "../components/Announcement";
import StudentPerformanceChart from "../components/StudentPerformanceChart";

const StudentsDetails = () => {
  return (
    <div className="flex flex-col flex-1 gap-4 p-4 xl:flex-row">
      {/* Right */}
      <div className="w-full xl:w-2/3">
        {/* TOP Section */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* USER Info Card */}
          <div className="flex flex-1 gap-4 px-6 py-6 rounded-md bg-brand-100">
            <div className="w-1/3 ">
              <img
                className="object-cover rounded-full w-36 h-36"
                alt="teacher Image"
                src="/src/assets/videoalt.svg"
              />
            </div>
            <div className="flex flex-col justify-between w-2/3 gap-4">
              <h1 className="text-[2rem] font-bold">محمود محمد</h1>
              <p className="text-[1rem] text-gray-400">
                طالب بالصف الثالث الثانوي{" "}
              </p>
              <div className="flex flex-wrap items-center justify-between font-medium text-[0.7rem] gap-2">
                <div className="flex items-center w-full gap-2 2xl:w-1/3 lg:w-full md:w-1/3">
                  <img className="w-5" src="/src/assets/dashboard/date.png" />
                  <span className="text-[0.9rem]">يناير 2025</span>
                </div>
                <div className="flex items-center w-full gap-2 2xl:w-1/3 lg:w-full md:w-1/3">
                  <img className="w-5" src="/src/assets/dashboard/mail.png" />
                  <span className="text-[0.9rem]">user@gmail.com</span>
                </div>
                <div className="flex items-center w-full gap-2 2xl:w-1/3 lg:w-full md:w-1/3">
                  <img
                    className="w-5 rotate-[270deg]"
                    src="/src/assets/dashboard/phone.png"
                  />
                  <span className="text-[0.9rem]">01092006446</span>
                </div>
              </div>
            </div>
          </div>
          {/*  Summury  Cards */}
          <div className="flex flex-wrap justify-between flex-1 gap-4 ">
            <div className="flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 p-4  bg-white rounded-md ">
              <img
                className="w-10 h-10"
                src="/src/assets/dashboard/singleClass.png"
              />
              <div className="">
                <h1 className="text-2xl font-semibold">5</h1>
                <span className="text-base text-gray-400">
                  كورس تم الإشتراك به
                </span>
              </div>
            </div>
            <div className="flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 bg-white p-4 rounded-md  ">
              <CiMoneyBill className="w-10 h-10 text-brand-500" />

              <div className="flex flex-col">
                <h1>70 EGP</h1>
                <span className="text-[1rem] text-gray-400">رصيد الطالب</span>
              </div>
            </div>
            <div className="flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 p-4 bg-white rounded-md  ">
              <img
                className="w-10 h-10"
                src="/src/assets/dashboard/student.png"
              />
              <div className="flex flex-col">
                <h1>200</h1>
                <span className="text-[1rem] text-gray-400">تلميذ مشترك </span>
              </div>
            </div>
            <div className="flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 p-4  bg-white rounded-md  ">
              <img
                className="w-10 h-10"
                src="/src/assets/dashboard/singleClass.png"
              />
              <div className="flex flex-col">
                <h1>5</h1>
                <span className="text-[1rem] text-gray-400">
                  كورس يتم تدرسيه
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="w-full h-[70rem]">
          <CoursesList />
        </div>
      </div>
      {/* Left  */}
      <div className="w-full xl:w-1/3">
        <StudentPerformanceChart />
        <Announcement />
      </div>
    </div>
  );
};

export default StudentsDetails;
