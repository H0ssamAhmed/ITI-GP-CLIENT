import { Link, Outlet } from "react-router-dom";
import DashboardMenu from "../components/DashboardMenu";
import DashbordNavbar from "../components/DashbordNavbar";

const DashboardLayout = () => (
  <div className="flex h-screen">
    {/* Right */}

    <div className="w-[14%] md:w-[8%] p-4 lg:w-[16%] xl:w-[16%] ">
      <Link to="/dashboard">
        <img src="/src/assets/logo-smalldark.png" alt="logo" />
      </Link>
      <DashboardMenu />
    </div>
    {/* Left */}
    <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[84%] bg-[#F7F8FA] overflow-scroll">
      <DashbordNavbar />
      <Outlet />
    </div>
  </div>
);

export default DashboardLayout;
