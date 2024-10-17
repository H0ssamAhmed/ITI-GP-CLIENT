import { useQuery } from "@tanstack/react-query";
import { courseEnrolledByStudent } from "../dashboardAPI";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const {
    data: enrolledCourses,
    isLoading: isenrolledCourses,
    isError: enrolledCoursesError,
  } = useQuery({
    queryKey: ["enrollCourses"],
    queryFn: courseEnrolledByStudent,
  });

  if (isenrolledCourses) return <Spinner />;
  if (enrolledCoursesError)
    return <ErrorMessage message="فشل تحميل بيانات الكورسات الخاصة " />;

  console.log(enrolledCourses);
  return (
    <>
      {enrolledCourses?.courses && enrolledCourses.courses.length > 0 ? (
        <>
          <div className="flex items-center justify-between mt-8 mb-8">
            <h1 className="font-bold text-[2rem]">الكورسات 👨‍🎓</h1>
          </div>
          {enrolledCourses.courses.map((course) => (
            <div
              key={course?.id}
              className="flex gap-8 p-4 mb-4 bg-white cursor-pointer rounded-2xl"
            >
              <div>
                <img
                  src={`${course?.image}`}
                  alt={course?.courseName}
                  className="w-24 h-24 rounded-lg"
                />
              </div>

              <div className="flex flex-col w-full gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="text-[1.6rem] font-bold">{course?.title}</p>
                    <p className="text-[1rem] text-gray-400 font-bold">
                      {course?.description}
                    </p>
                  </div>

                  <Link to={`/courses/${course?.id}`} key={course?.id}>
                    <p className="text-[1.2rem] text-brand-400 underline">
                      الذهاب إلى الكورس &larr;
                    </p>
                  </Link>
                </div>
                <span className="text-[1.3rem] text-gray-500">
                  {course?.lessonName}
                </span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-center text-gray-500">لا توجد كورسات مسجلة</p>
      )}
    </>
  );
};

export default CoursesList;
