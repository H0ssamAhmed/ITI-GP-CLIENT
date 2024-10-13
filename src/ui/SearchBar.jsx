import { HiMagnifyingGlass } from "react-icons/hi2";

function SearchBar() {
  return (
    <div className="relative flex items-center w-full md:w-[25rem] lg:w-[35rem]">
      <HiMagnifyingGlass className="absolute w-5 h-5 text-gray-500 left-3" />
      <input
        type="text"
        placeholder="بحث..."
        className="w-full py-2 pl-10 pr-4 transition-all duration-500 bg-gray-300 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}

export default SearchBar;
