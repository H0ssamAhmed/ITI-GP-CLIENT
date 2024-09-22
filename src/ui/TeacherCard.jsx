import testImg from "../assets/HomePageImages/TestTeacher.png";
import { FaStar } from "react-icons/fa6";

function TeacherCard() {
  return (
    <div className="relative rounded-[1.6rem] mx-auto gap-16 bg-brand-700 w-[30.5rem] h-[27.5rem] flex flex-col items-center justify-center">
      {/* Teacher Image with border */}
      <div className="absolute border-4 border-yellow-500 top-[-10rem]">
        <img src={testImg} alt="Teacher" />
      </div>

      {/* Spacing adjustment between image and name */}
      <div className="flex items-center justify-between gap-x-16 mt-[10rem]">
        <p className="font-bold text-white text-[2rem]">أ. سلمى محمود</p>
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500 text-[2.5rem]" />
          <p className="font-bold  text-white text-[2.5rem]">5.0</p>
        </div>
      </div>

      {/* Subject */}
      <p className="font-bold text-white text-[2.5rem] mt-4">اللغة العربية</p>
    </div>
  );
}

export default TeacherCard;
