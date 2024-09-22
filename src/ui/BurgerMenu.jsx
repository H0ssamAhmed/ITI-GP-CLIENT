import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import LinkWithUnderline from "./LinkWithUnderline";
function BurgerMenu() {
  const [isOpen, setIsopen] = useState(false);

  // Handling The Open/Close
  function toggleOverlay() {
    setIsopen(!isOpen);
  }

  return (
    <div className="relative block lg:hidden md:flex md:items-center md:justify-center">
      <button onClick={toggleOverlay} className="relative focus:outline-none">
        <motion.svg
          className={`w-16 h-16 transition-transform z-50 duration-300 ${
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

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gray-400 bg-opacity-65"
          >
            <motion.div className="relative w-5/6 p-8 bg-white rounded-lg shadow-lg h-4/5">
              <button
                onClick={toggleOverlay}
                className="absolute z-50 text-gray-400 top-4 right-4"
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
              {/* Contnet */}
              <div className="flex flex-col justify-between h-full text-center ">
                <h2 className="mb-16 text-[3rem] font-bold ">
                  القائمة الرئيسية
                </h2>

                <div className="flex z-50 flex-col text-[2.5rem] items-center justify-center space-x-8 text-black gap-14">
                  <LinkWithUnderline>خدمات المنصة</LinkWithUnderline>
                  <LinkWithUnderline>الفصول الدراسية</LinkWithUnderline>
                  <LinkWithUnderline>من نحن</LinkWithUnderline>
                  <LinkWithUnderline>تواصل معنا</LinkWithUnderline>
                </div>

                <div className="flex flex-col z-50 text-[2.5rem] gap-4">
                  <Button className="px-4 py-2 font-bold text-black transition-all duration-300 bg-yellow-500 rounded-full hover:bg-yellow-200 ">
                    حساب جديد
                  </Button>
                  <Button className="px-4 py-2 font-bold text-white transition-all duration-300 border-2 rounded-full bg-brand-700 hover:bg-brand-500 ring-white">
                    تسجيل الدخول
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BurgerMenu;
