import { Link } from "react-router-dom";

const TeacherShortcuts = () => {
  return (
    <div className="flex flex-wrap items-center justify-center flex-1 p-4 bg-white">
      <h1>إختصارات</h1>
      <div className="p-2 rounded-md font-semibold text-[1.5rem] text-gray-400 bg-brand-200">
        <Link to="list/lessons">كورسات المعلم</Link>
      </div>
      <div className="p-2 rounded-md font-semibold text-[1.5rem] text-gray-400 bg-yellow-200">
        <Link to=""></Link>
      </div>
      <div className="p-2 rounded-md font-semibold text-[1.5rem] text-gray-400 bg-purple-200">
        <Link to=""></Link>
      </div>
      <div className="p-2 rounded-md font-semibold text-[1.5rem] text-gray-400 bg-blue-200">
        <Link to=""></Link>
      </div>
    </div>
  );
};

export default TeacherShortcuts;
