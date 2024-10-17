import { Link } from "react-router-dom";
import Button from "./Button";

function SubjectCard({ subject }) {
  const { levelTitle, title, image, id } = { ...subject }

  return (
    <div className="relative rounded-[1.6rem] mx-auto gap-10 bg-brand-300 w-[30.5rem] h-[27.5rem] flex flex-col items-center justify-center">
      <div className="absolute z-[5] flex flex-col items-center justify-center top-10">
        {/* {Icon && <Icon className=" z-[5] text-white text-[5rem]" />} */}
        <p className="font-bold  text-white text-[2.5rem] mt-4">
          {title}
        </p>
      </div>

      <img className="absolute top-1 w-[400px] h-[160px] object-cover " src={image} alt="subject Image" />

      <div className="flex flex-col items-center mt-[15rem] gap-9">
        <p className="font-bold text-brand-900 text-[2rem]">{levelTitle?.replace(/^\d+-\s*/, '')}</p>
        <Link to={`courses/${id}`} className="py-3 font-bold text-[2rem] bg-yellow-400 rounded-full px-44 hover:bg-yellow-200">
          إبدأ الأن
        </Link>
      </div>
    </div>
  );
}

export default SubjectCard;
