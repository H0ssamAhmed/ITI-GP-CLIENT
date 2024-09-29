import { useState } from "react";
import { TbMoodBoy } from "react-icons/tb";
import { CgGirl } from "react-icons/cg";
import { PiStudent } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function MultiLevelDropdown({ onOpenDropdown }) {
  const [isSubmenuOpen1, setIsSubmenuOpen1] = useState(false);
  const [isSubmenuOpen2, setIsSubmenuOpen2] = useState(false);
  const [isSubmenuOpen3, setIsSubmenuOpen3] = useState(false);

  // Handle SubMenu toggle using Index
  function handleSubmenuOpen(index) {
    setIsSubmenuOpen1(index === 1 ? !isSubmenuOpen1 : false);
    setIsSubmenuOpen2(index === 2 ? !isSubmenuOpen2 : false);
    setIsSubmenuOpen3(index === 3 ? !isSubmenuOpen3 : false);
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const submenuVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {onOpenDropdown && (
          <motion.div
            id="multi-dropdown"
            className="absolute left-[-27rem] mt-6 z-[200] bg-white divide-y divide-gray-200 rounded-xl shadow-lg w-[40rem] dark:bg-gray-800"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
          >
            <ul className="py-4 text-[1.9rem] font-semibold text-gray-900 dark:text-gray-300">
              {/* First dropdown item with submenu */}
              <li className="relative">
                {/* Parent Button */}
                <button
                  onClick={() => handleSubmenuOpen(1)}
                  className="flex items-center justify-between w-full px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex items-center gap-5">
                    <TbMoodBoy />
                    المرحلة الإبتدائية
                  </div>
                  <svg
                    className={`w-4 h-4 ms-3 transform transition-transform ${isSubmenuOpen1 ? "rotate-90" : ""
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="#6366f1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
                {/* Submenu */}
                <AnimatePresence>
                  {isSubmenuOpen1 && (
                    <motion.ul
                      className="absolute top-0 bg-white divide-y rounded-lg shadow-lg right-full dark:bg-gray-800 w-[35rem]"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={submenuVariants}
                    >
                      <li>
                        <Link to={"/courses/:pri3"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الثالث الإبتدائي
                        </Link>
                      </li>
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الرابع الإبتدائي
                        </Link>
                      </li>
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الخامس الإبتدائي
                        </Link>
                      </li>
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف السادس الإبتدائي
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Second dropdown item with submenu */}
              <li className="relative">
                <button
                  onClick={() => handleSubmenuOpen(2)}
                  className="flex items-center justify-between w-full px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex items-center gap-5">
                    <CgGirl />
                    المرحلة الإعدادية
                  </div>
                  <svg
                    className={`w-4 h-4 ms-3 transform transition-transform ${isSubmenuOpen2 ? "rotate-90" : ""
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="#6366f1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {isSubmenuOpen2 && (
                    <motion.ul
                      className="absolute top-0 bg-white divide-y rounded-lg shadow-lg right-full dark:bg-gray-800 w-[35rem]"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={submenuVariants}
                    >
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الأول الإعدادي
                        </Link>
                      </li>
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الثاني الإعدادي
                        </Link>
                      </li>
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الثالث الإعدادي
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Third dropdown item with submenu */}
              <li className="relative">
                <button
                  onClick={() => handleSubmenuOpen(3)}
                  className="flex items-center justify-between w-full px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex items-center gap-5">
                    <PiStudent />
                    المرحلة الثانوية
                  </div>
                  <svg
                    className={`w-4 h-4 ms-3 transform transition-transform ${isSubmenuOpen3 ? "rotate-90" : ""
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="#6366f1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {isSubmenuOpen3 && (
                    <motion.ul
                      className="absolute top-0 bg-white divide-y rounded-lg shadow-lg right-full dark:bg-gray-800 w-[35rem]"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={submenuVariants}
                    >
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الأول الثانوي
                        </Link>
                      </li>
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الثاني الثانوي
                        </Link>
                      </li>
                      <li>
                        <Link to={"/courses"}
                          className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          الصف الثالث الثانوي
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MultiLevelDropdown;
