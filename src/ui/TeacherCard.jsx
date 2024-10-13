import { Link } from "react-router-dom";
import testImg from "../assets/HomePageImages/teacher.png";
// import testImg from "../assets/HomePageImages/english.png";
// import testImg from "../assets/HomePageImages/heroImg.png";
import { FaStar } from "react-icons/fa6";

function TeacherCard() {
  return (
    <div className="relative rounded-[1.6rem] mx-auto bg-brand-200 text-brand-900 w-[25.5rem] flex flex-col items-center justify-center">
      {/* Teacher Image with border */}
      <div className="absolute rounded-4xl overflow-hidden border-4 w-60 h-60 border-yellow-300 p-0 top-[-5rem]">
        <img
          src={testImg}
          alt="Teacher"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Spacing adjustment between image and name */}
      <div className="flex items-center justify-between w-full px-8 mt-[10rem]">
        <p className="font-bold text-[2rem]">أ. سلمى محمود</p>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-[2.5rem]" />
          <p className="font-bold  text-[2.5rem]">5.0</p>
        </div>
      </div>

      <div className=" w-full px-8 mt-4">
        {/* Subject and Level */}
        <p className="font-bold text-[2.5rem] mb-4">اللغة العربية</p>
        <p className="font-bold text-[2rem]">الصف الثالث الثانوي</p>
      </div>
      <div className="flex items-center flex-col gap-4 w-full justify-between  px-8 py-4 mt-4">
        <Link
          to={"/courses/5"}
          className="bg-brand-700 font-bold w-full hover:bg-brand-500 transition-all rounded-md text-white px-4 py-2 text-center capitalize text-2xl"
        >
          المزيد
        </Link>
        <Link
          to={"/courses/5"}
          className="bg-yellow-400 font-bold w-full hover:bg-yellow-200 transition-all rounded-md text-black hover:text-white px-4 py-2 text-center capitalize text-2xl"
        >
          اشترك الان
        </Link>
      </div>
    </div>
  );
}

export default TeacherCard;
