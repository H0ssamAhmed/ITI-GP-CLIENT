import Announcement from "../../components/Announcement";
import AttendanceChart from "../../components/AttendanceChart";
import CountChart from "../../components/CountChart";
import EventCalender from "../../components/EventCalender";
import FinanceChart from "../../components/FinanceChart";
import UserCard from "../../components/UserCard";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-5 p-4 md:flex-row">
      {/* Rigth */}
      <div className="flex flex-col w-full gap-8 lg:w-2/3">
        <div className="flex flex-row flex-wrap items-center justify-center gap-5">
          <UserCard type="تلميذ" />
          <UserCard type="معلم" />
          {/* <UserCard type="ولي أمر" /> */}
          <UserCard type="موظف" />
        </div>
        {/* Middle Charts */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Students */}
          <div className="w-full lg:w-1/3 h-[45rem]">
            <CountChart />
          </div>

          {/* Attendance */}
          <div className="w-full lg:w-2/3 h-[45rem]">
            <AttendanceChart />
          </div>
        </div>
        {/* Bottom Charts */}
        <div className="w-full h-[50rem]">
          <FinanceChart />
        </div>
      </div>
      {/* Left */}
      <div className="w-full lg:w-1/3 ">
        <EventCalender />
        <Announcement />
      </div>
    </div>
  );
};

export default AdminPage;
