import { Link } from "react-router-dom";
import testImg from "../../../assets/HomePageImages/teacher.png";
import { FaStar } from "react-icons/fa6";

function CourseCard({ course }) {
  const { id, title, description, price, image, teacherId, teacherName, levelTitle } = { ...course }
  // console.log(course);
  const shortTitle = title?.split(" ").length > 2 ? title?.split(" ")[0] + " " + title?.split(" ")[1] : title
  return (
    <div className="relative rounded-[1.6rem] h-[375px] mx-auto bg-brand-200 text-brand-900 w-[25.5rem] flex flex-col items-center justify-center">
      {/* Teacher Image with border */}
      <div className="absolute rounded-4xl overflow-hidden border-4 w-60 h-60 border-yellow-300 p-0 top-[-5rem]">
        <img src={image || testImg} alt="Teacher" className="object-cover h-full w-full" />
      </div>

      {/* Spacing adjustment between image and name */}
      <div className="flex items-start justify-between flex-col w-full px-8 mt-[12rem]">
        <p className="font-bold text-[2rem]">{teacherName}</p>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-[2.5rem]" />
          <p className="font-bold  text-[2.5rem]">5.0</p>
        </div>
      </div>

      <div className=" w-full px-8 mt-4">
        {/* Subject and Level */}
        <p className="font-bold text-[2.5rem] mb-4">{shortTitle}</p>
        <p className="font-bold text-[2rem]">{levelTitle}</p>
      </div>
      <div className="flex items-center justify-between w-full px-8 py-4 mt-4">
        <Link to={`/courses/${id}`} className="bg-brand-400 hover:bg-brand-900 transition-all rounded-lg text-white px-4 py-2 text-center capitalize text-2xl" >المزيد</Link>
        <Link to={`/courses/${id}`} className="bg-yellow-500 hover:bg-yellow-700 transition-all rounded-lg text-black hover:text-white px-4 py-2 text-center capitalize text-2xl" >اشترك الان</Link>

      </div>
    </div>
  );
}

export default CourseCard;
