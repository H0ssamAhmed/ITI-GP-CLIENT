import Button from "./Button";

function SubjectCard({ img, subjectName, subjectIcon: Icon, grade }) {
  return (
    <div className="relative rounded-[1.6rem] mx-auto gap-10 bg-brand-700 w-[30.5rem] h-[27.5rem] flex flex-col items-center justify-center">
      <div className="absolute z-[5] flex flex-col items-center justify-center top-10">
        {Icon && <Icon className=" z-[5] text-white text-[5rem]" />}
        <p className="font-bold  text-white text-[2.5rem] mt-4">
          {subjectName}
        </p>
      </div>

      <img className="absolute top-1" src={img} alt="subject Image" />

      <div className="flex flex-col items-center mt-[15rem] gap-9">
        <p className="font-bold text-white text-[2rem]">{grade}</p>
        <Button className="py-3 font-bold text-[2rem] bg-yellow-500 rounded-full px-44 hover:bg-yellow-100">
          إبدأ الأن
        </Button>
      </div>
    </div>
  );
}

export default SubjectCard;
