import Announcement from "../../components/Announcement";
import AttendanceChart from "../../components/AttendanceChart";
import EventCalender from "../../components/EventCalender";
import FinanceChart from "../../components/FinanceChart";
import UserCard from "../../components/UserCard";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-5 p-4 item md:flex-row">
      <div className="flex flex-col w-full gap-8 lg:w-2/3">
        <div className="flex flex-row flex-wrap items-center justify-center gap-5">
          <UserCard type="تلميذ" />
          <UserCard type="معلم" />
          <UserCard type="موظف" />
        </div>

        <div className="w-full lg:w-2/3 h-[45rem]">
          <AttendanceChart />
        </div>

        <div className="w-full h-[50rem]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 ">
        <EventCalender />
        <Announcement />
      </div>
    </div>
  );
};

export default AdminPage;
