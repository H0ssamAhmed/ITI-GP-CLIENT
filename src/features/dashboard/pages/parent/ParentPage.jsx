import { Link, useLocation } from "react-router-dom";
import Announcement from "../../components/Announcement";
import ExamResults from "../../components/ExamResults";
import ParentCourseList from "../../components/ParentCourseList";
import EventCalender from "../../components/EventCalender";
import { useMoveBack } from "../../../../hooks/useMoveBack";

const ParentPage = () => {
  const location = useLocation();

  // Ensure parentData has a valid structure
  const parentData = location.state?.parentData || {
    students: [],
    courses: [],
  };

  const moveBack = useMoveBack();

  console.log(parentData);

  return (
    <div className="flex flex-col gap-5 p-4 md:flex-row">
      {/* Right */}
      <div className="items-center justify-start w-full gap-8 md:flex-row lg:w-2/3">
        <Link
          to="#"
          onClick={moveBack}
          className="cursor-pointer text-brand-500 mb-9"
        >
          &rarr; الرجوع
        </Link>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[2.5rem] font-bold">نتائج الإختبارات</h1>
        </div>
        {parentData.students.length > 0 ? (
          parentData.students.map((son, index) => (
            <div key={index}>
              {/* Show Exam Results */}
              <ExamResults son={son.quizAttempts} />

              {/* Show Courses for Each Student */}
              {son.courses && son.courses.length > 0 ? (
                <>
                  <h1 className="text-[2.5rem] mb-4 font-bold">الكورسات</h1>
                  <ParentCourseList son={son.courses} />
                </>
              ) : (
                <p className="text-gray-500">لا توجد دورات متاحة</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">لا توجد نتائج متاحة</p>
        )}
      </div>

      {/* Left */}
      <div className="w-full lg:w-1/3">
        <EventCalender />
        <Announcement />
      </div>
    </div>
  );
};

export default ParentPage;
