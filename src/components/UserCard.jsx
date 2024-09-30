const UserCard = ({ type }) => {
  return (
    <div className="rounded-2xl odd:bg-brand-200 even:bg-yellow-200 min-w-[130px] p-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <img
          src="/src/assets/dashboard/more.png"
          className="cursor-pointer w-7 h-7"
        />
        <span className="p-1 text-sm text-green-400 bg-white rounded-full">
          2024/25
        </span>
      </div>
      <h1 className="font-bold text-[2.5rem] my-4">1.234</h1>
      <h2 className="text-[1.1rem] text-gray-600">{type}</h2>
    </div>
  );
};

export default UserCard;
