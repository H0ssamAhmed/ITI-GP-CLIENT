import Navigation from "../ui/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";

const Mainlayout = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Mainlayout;
