const TableSearch = () => {
  return (
    <div className="items-center justify-start w-full flex md:w-auto ring-[1.5px] ring-gray-300 px-2 text-lg rounded-full gap-2 transition-transform duration-300 focus-within:scale-105">
      <img src="/src/assets/dashboard/search.png" className="w-5 h-5" />
      <input
        placeholder="بحث.."
        className="w-[15rem] bg-transparent p-2 focus:outline-none outline-none"
      />
    </div>
  );
};

export default TableSearch;
