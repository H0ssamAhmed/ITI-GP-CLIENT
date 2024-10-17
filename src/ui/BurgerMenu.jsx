import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import LinkWithUnderline from "./LinkWithUnderline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { clearUserRole } from "../features/auth/slices/authSlice";
import { logout } from "../services/currentUser";
import { clearUserRole as logoutAction } from "../features/auth/slices/authSlice.js";
import { toast } from "react-toastify";

function BurgerMenu() {
  const user = useSelector((state) => state.auth.role);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();

      dispatch(logoutAction());
      dispatch(clearUserRole());

      console.log("Before toast");
      toast.success("تم تسجيل الخروج بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("After toast");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.message || "An error occurred during logout.");
    }
  };

  function toggleOverlay() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className="relative block lg:hidden md:flex md:items-center md:justify-center">
        <button onClick={toggleOverlay} className="relative focus:outline-none">
          <motion.svg
            className={`w-16 h-16 transition-transform z-[50] duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="#FFD700"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1100] flex flex-col items-center h-screen justify-center bg-gray-300 bg-opacity-75"
          >
            <motion.div className="relative z-[900] w-5/6 p-8 bg-white bg-opacity-100 rounded-lg shadow-lg h-4/5">
              <button
                onClick={toggleOverlay}
                className="absolute text-gray-400 z-[1000] top-4 right-4"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#FFD700"
                    strokeWidth="5"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              <div className="flex flex-col justify-between h-full text-center">
                <h2 className="mb-16 text-[3rem] font-bold">
                  القائمة الرئيسية
                </h2>
                <div className="flex z-50 flex-col text-[2.5rem] items-center justify-center space-x-8 text-black gap-14">
                  <Link to="/features">
                    <LinkWithUnderline>خدمات المنصة</LinkWithUnderline>
                  </Link>

                  <Link to="/courses">
                    <LinkWithUnderline>الفصول الدراسية</LinkWithUnderline>
                  </Link>

                  <Link to="/about-us">
                    <LinkWithUnderline>من نحن</LinkWithUnderline>
                  </Link>

                  <Link to="/contact">
                    <LinkWithUnderline>تواصل معنا</LinkWithUnderline>
                  </Link>
                </div>

                {!user ? (
                  <div className="flex flex-col z-50 text-[2.5rem] gap-4">
                    <Button className="px-4 py-2 font-bold text-black transition-all duration-300 bg-yellow-500 rounded-full hover:bg-yellow-200">
                      حساب جديد
                    </Button>
                    <Button className="px-4 py-2 font-bold text-white transition-all duration-300 border-2 rounded-full bg-brand-700 hover:bg-brand-500 ring-white">
                      تسجيل الدخول
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      className="flex justify-center w-full items-cente"
                      to="/wallet"
                    >
                      <div className="flex flex-col text-[2rem] w-full text-center items-center gap-2 p-3 transition-all duration-300 bg-yellow-400 rounded-full cursor-pointer hover:bg-yellow-300 hover:shadow-lg hover:scale-105">
                        <FaWallet />
                        <span className="font-semibold font-cairo">
                          {user?.walletBalance
                            ? `${user.walletBalance} EGP`
                            : "المحفظة"}
                        </span>
                      </div>
                    </Link>
                    <Button
                      className="p-4 font-bold rounded-full text-[2rem] bg-brand-600"
                      onClick={handleLogout}
                    >
                      تسجيل الخروج
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BurgerMenu;
