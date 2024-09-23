import UserCard from "../../../../components/UserCard";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-5 p-4 md:flex-row">
      {/* Rigth */}
      <div className="w-full lg:w-2/3">
        <UserCard type="student" />
        <UserCard type="teacher" />
        <UserCard type="parent" />
        <UserCard type="staff" />
      </div>
      {/* Left */}
      <div className="w-full lg:w-1/3 bg-slate-700">Left</div>
    </div>
  );
};

export default AdminPage;
