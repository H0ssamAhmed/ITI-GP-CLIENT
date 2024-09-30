import Announcement from "../../../../components/Announcement";
import CoursesOverview from "../../../../components/CoursesOverview ";
import EventCalender from "../../../../components/EventCalender";
import FinanceChart from "../../../../components/FinanceChart";

const TeacherPage = () => {
  return (
    <>
      <h1 className="text-[3rem] font-bold p-5">مرحبا بك, أ / حمادة 👋</h1>
      <div className="flex flex-col gap-5 p-4 md:flex-row">
        {/* Right */}
        <div className="items-center justify-start w-full gap-8 md:flex-row lg:w-2/3">
          <CoursesOverview />
          <div className="w-full h-[50rem]">
            <FinanceChart />
          </div>
        </div>

        {/* Left */}
        <div className="w-full lg:w-1/3">
          <EventCalender />
          <Announcement />
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
