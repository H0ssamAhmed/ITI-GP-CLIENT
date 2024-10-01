import heroStudent1 from "../assets/heroStudents/heroStudent1.png";
import heroStudent2 from "../assets/heroStudents/heroStudent2.png";
import heroStudent3 from "../assets/heroStudents/heroStudent3.png";
import heroStudent4 from "../assets/heroStudents/heroStudent4.png";
import heroStudent5 from "../assets/heroStudents/heroStudent5.png";
import heroStudent6 from "../assets/heroStudents/heroStudent6.png";

const StudentsAvatar = () => {
  return (
    <div className="flex z-[1000]">
      <img
        className="w-16 h-16 rounded-full -ml-4  border-2 border-yellow-200"
        src={heroStudent1}
      />
      <img
        className="w-16 h-16 rounded-full -ml-4 border-2 border-yellow-200"
        src={heroStudent2}
      />
      <img
        className="w-16 h-16 rounded-full -ml-4 border-2 border-yellow-200"
        src={heroStudent3}
      />
      <img
        className="w-16 h-16 rounded-full -ml-4 border-2 border-yellow-200"
        src={heroStudent4}
      />
      <img
        className="w-16 h-16 rounded-full -ml-4 border-2 border-yellow-200"
        src={heroStudent5}
      />
      <img
        className="w-16 h-16 rounded-full -ml-4 border-2 border-yellow-200"
        src={heroStudent6}
      />
    </div>
  );
};

export default StudentsAvatar;
