import Announcement from "../../components/Announcement";
import CoursesList from "../../components/CoursesList";
import EventCalender from "../../components/EventCalender";

const StudentPage = () => {
  return (
    <div className="flex flex-col gap-5 p-4 md:flex-row">
      {/* Right */}
      <div className="items-center justify-start w-full gap-8 md:flex-row lg:w-2/3">
        <CoursesList />
      </div>

      {/* Left */}
      <div className="w-full lg:w-1/3">
        <EventCalender />
        <Announcement />
      </div>
    </div>
  );
};

export default StudentPage;
