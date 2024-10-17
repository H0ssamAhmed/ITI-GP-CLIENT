import { useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import FinanceChart from "../components/FinanceChart";
import TeacherPerformanceChart from "../components/TeacherPerformanceChart";
import { useQuery } from "@tanstack/react-query";
import { fetchUserById, getTeacherCourses } from "../dashboardAPI";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "./ErrorMessage";
import teacherDefault from "../../../assets/dashboard/profileDefualt.jpg";
import UploadImageButton from "../../../ui/UploadImageButton";

const TeacherDetails = () => {
  const { id } = useParams();

  const {
    data: teacher,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teacher"],
    queryFn: () => fetchUserById(id),
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message="فشل تحميل بيانات المعلم" />;

  console.log(teacher);

  return (
    <div className="flex flex-col flex-1 gap-4 p-4 xl:flex-row">
      {/* Right */}
      <div className="w-full xl:w-2/3">
        {/* TOP Section */}
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* USER Info Card */}
          <div className="flex flex-1 gap-4 px-6 py-6 rounded-md bg-brand-100">
            <div className="w-1/3 ">
              {teacher.picture ? (
                <div className="relative">
                  <img
                    src={teacher.picture}
                    alt="teacherImage"
                    className="object-cover w-10 h-10 rounded-full md:hidden lg:block "
                  />

                  <UploadImageButton />
                </div>
              ) : (
                <div className="relative">
                  {/* User Profile Image */}
                  <img
                    src={teacherDefault}
                    alt="userdefaultprofileimage"
                    className="object-cover w-32 h-32 rounded-full md:hidden lg:block"
                  />

                  <UploadImageButton />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between w-2/3 gap-4">
              <h1 className="text-[2rem] font-bold">
                {`${teacher.firstName}  ${teacher.lastName}`}
              </h1>
              <p className="text-[1rem] text-gray-400">
                {`مدرس لمادة ${teacher.specialization}`}
              </p>
              <div className="flex flex-col flex-wrap items-start justify-around font-medium text-[0.7rem] gap-2 w-full">
                {/* Graduation Year */}
                <div className="flex items-center w-full gap-2">
                  <img className="w-5" src="/src/assets/dashboard/date.png" />
                  <span className="flex-grow text-[0.9rem]">{`سنة التخرج : ${teacher.graduationYear}`}</span>
                </div>

                {/* Email */}
                <div className="flex items-center w-full gap-2">
                  <img className="w-5" src="/src/assets/dashboard/mail.png" />
                  <span className="flex-grow text-[0.9rem]">
                    {teacher.email}
                  </span>
                </div>

                {/* Phone Number */}
                <div className="flex items-center w-full gap-2">
                  <img
                    className="w-5 rotate-[270deg]"
                    src="/src/assets/dashboard/phone.png"
                  />
                  <span className="flex-grow text-[0.9rem]">
                    {teacher.phoneNumber}
                  </span>
                </div>

                {/* Educational Qualification */}
                <div className="flex items-center w-full gap-2">
                  <img
                    className="w-5"
                    src="/src/assets/dashboard/edutcation.png"
                  />
                  <span className="flex-grow text-[0.9rem]">{`المؤهل الدراسي : ${teacher.educationalQualification}`}</span>
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
                <span className="text-base text-gray-400">كورس يتم تدرسيه</span>
              </div>
            </div>
            <div className="flex md:w-[48%] xl:w-[45%] 2xl:w-[48%] w-full gap-4 bg-white p-4 rounded-md  ">
              <img
                className="w-10 h-10"
                src="/src/assets/dashboard/singleLesson.png"
              />
              <div className="flex flex-col">
                <h1>3</h1>
                <span className="text-[1rem] text-gray-400">
                  صف دراسي إنضم إليه{" "}
                </span>
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
          <FinanceChart />
        </div>
      </div>
      {/* Left  */}
      <div className="w-full xl:w-1/3">
        <TeacherPerformanceChart />
        <Announcement />
      </div>
    </div>
  );
};

export default TeacherDetails;
