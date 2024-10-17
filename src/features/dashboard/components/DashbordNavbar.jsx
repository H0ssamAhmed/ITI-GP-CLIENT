import { useState } from "react";
import { getCurrentUser } from "../../../services/currentUser";
import { useQuery } from "@tanstack/react-query";

const DashbordNavbar = () => {
  const [isOpenMessages, setIsOpenMessages] = useState(false);
  const [isOpenAnnouncment, setIsOpenAnnouncment] = useState(false);

  const {
    data: currentUser,
    isLoading: isLoadingCurrentUser,
    isError: isErrorCurrentUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const userData = currentUser?.data;

  if (isLoadingCurrentUser) return "";

  return (
    <div className="flex items-center justify-between p-5">
      <div className="relative flex items-center justify-end w-full gap-7">
        <div className="flex items-center justify-center w-10 h-10 transition-transform transform bg-white rounded-full shadow cursor-pointer hover:scale-105">
          <img
            onClick={() => setIsOpenMessages(!isOpenMessages)}
            src="/src/assets/dashboard/message.png"
            className="relative w-8 h-8"
            alt="Messages"
          />
        </div>

        {isOpenMessages && (
          <div className="absolute z-10 p-4 bg-white border rounded-md shadow-md border-brand-500 h-80 w-80 left-36 top-12">
            {/* You can add content inside this div */}
            <h2 className="text-lg font-semibold text-center">Messages</h2>
            <p className="text-sm text-center text-gray-500">
              No new messages.
            </p>
          </div>
        )}
        {/* <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer ">
          <img
            src="/src/assets/dashboard/announcement.png"
            className="w-8 h-8 "
          />
          <div className="absolute flex items-center justify-center text-xs text-white rounded-full w-5 h-5 top-[-0.5rem] right-[-0.6rem] bg-brand-500">
            1
          </div>
        </div> */}

        <div className="flex flex-col gap-2">
          <span className="text-[1.2rem] font-medium leading-3">
            {userData?.firstName
              ? `${userData?.firstName} ${userData?.lastName}`
              : ""}
          </span>
          <span className="text-[1rem] font-bold text-gray-400">
            {userData?.role && userData?.role === "teacher"
              ? "مدرس"
              : userData?.role === "admin"
              ? "أدمن"
              : userData?.role === "student"
              ? "طالب"
              : "ولي أمر"}
          </span>
        </div>

        {userData?.picture ? (
          <img
            src={userData?.picture}
            alt="avatar-picture"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        ) : (
          <img
            src="/src/assets/dashboard/avatar.png"
            alt="avatar-logo"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default DashbordNavbar;
