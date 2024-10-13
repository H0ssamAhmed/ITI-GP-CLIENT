import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAllAnnouncements } from "../dashboardAPI";
import { formatDate } from "../../../utils/dateUtils";

const Announcement = () => {
  const { data: mainAnnouncements } = useQuery({
    queryFn: fetchAllAnnouncements,
    queryKey: ["mainAnnouncements"],
  });

  return (
    <div className="w-full p-4 bg-white rounded-md ">
      <div className="flex items-center justify-between mt-8 mb-8">
        <h1 className="font-bold">أهم الإعلانات</h1>
        <Link
          to="/dashboard/list/announcements"
          className="text-[1.3rem] text-gray-300 cursor-pointer"
        >
          شاهد المزيد
        </Link>
      </div>
      {mainAnnouncements?.data?.slice(0, 3).map((announcement) => (
        <div
          className="p-4 mt-4 odd:bg-brand-100 even:bg-yellow-100 rounded-xl"
          key={announcement.id}
        >
          <div className="flex items-center justify-between mb-4 ">
            <h2 className="font-semibold">{announcement.title}</h2>
            <span className="text-[1rem] text-gray-400 bg-white rounded-full py-1 px-2 ">
              {announcement.start ? formatDate(announcement?.start) : ""}
            </span>
          </div>
          <p className="font-light">{announcement.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
