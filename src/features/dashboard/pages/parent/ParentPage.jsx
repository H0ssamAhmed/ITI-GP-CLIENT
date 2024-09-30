import Announcement from "../../../../components/Announcement";
import ExamResults from "../../../../components/ExamResults";
import ParentCourseList from "../../../../components/ParentCourseList";
import { sons } from "../../../../lib/data";

const ParentPage = () => {
  return (
    <div className="flex flex-col gap-5 p-4 md:flex-row">
      {/* Right */}
      <div className="items-center justify-start w-full gap-8 md:flex-row lg:w-2/3">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[2.5rem] font-bold">نتائج الإختبارات</h1>
          <span className="text-[1.3rem] text-gray-300 cursor-pointer">
            شاهد المزيد
          </span>
        </div>
        <ExamResults sonName="أحمد علي" />
        <ExamResults sonName="محمد علي" />
        <ParentCourseList sons={sons} />
      </div>

      {/* Left */}
      <div className="w-full lg:w-1/3">
        <Announcement />
      </div>
    </div>
  );
};

export default ParentPage;
