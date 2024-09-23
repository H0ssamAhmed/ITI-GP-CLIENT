const DashbordNavbar = () => {
  return (
    <div className="flex items-center justify-between p-5">
      {/* Search Bar */}
      <div className="items-center justify-center hidden md:flex ring-[1.5px] ring-gray-300 px-2 text-lg rounded-full gap-2 transition-transform duration-300 focus-within:scale-105">
        <img src="/src/assets/dashboard/search.png" className="w-5 h-5" />
        <input
          placeholder="بحث.."
          className="w-[20rem] bg-transparent p-2 focus:outline-none outline-none"
        />
      </div>

      {/* Icon and User */}
      <div className="flex items-center justify-end w-full gap-7">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer">
          <img src="/src/assets/dashboard/message.png" className="w-8 h-8" />
        </div>
        <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer ">
          <img
            src="/src/assets/dashboard/announcement.png"
            className="w-8 h-8 "
          />
          <div className="absolute flex items-center justify-center text-xs text-white rounded-full w-5 h-5 top-[-0.5rem] right-[-0.6rem] bg-brand-500">
            1
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[1.2rem] font-medium leading-3">
            عبدالله شاهين
          </span>
          <span className="text-[1rem] font-bold text-gray-400">أدمن</span>
        </div>
        <img
          src="/src/assets/dashboard/avatar.png"
          alt="avatar-logo"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default DashbordNavbar;
