import { useQuery } from "@tanstack/react-query";
import { getTeacherCourses } from "../dashboardAPI";
import imageDefault from "../../../assets/dashboard/profileDefualt.jpg";
import { Link } from "react-router-dom";

const CoursesOverview = () => {
  const { data: teacherCourses } = useQuery({
    queryKey: ["coursesHome"],
    queryFn: getTeacherCourses,
  });

  const courseData = teacherCourses?.data || [];

  console.log(courseData);
  return (
    <div className="p-6 bg-white  rounded-lg shadow-md ">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-[1.8rem] font-bold">
          نظرة عامة على الدروس 👨‍🏫
        </h2>

        <Link to="/dashboard/list/teacherSubjects">
          <img className="w-7 h-7" src="/src/assets/dashboard/moreDark.png" />
        </Link>
      </div>
      <div className="space-y-6">
        {courseData?.slice(0, 3).map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
          >
            <div className="flex items-center space-x-5 gap-4">
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-16 h-16 rounded-full"
                />
              ) : (
                <img className="w-16 h-16 rounded-full" src={imageDefault} />
              )}
              <div>
                <h3 className="text-lg font-semibold">{course.title}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">
                {course.students.length} طالب
              </p>
              <p className="text-sm text-gray-400">الملتحقون بهذه الدورة</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverview;
