import { useEffect, useState } from "react";
import { TbMoodBoy } from "react-icons/tb";
import { CgGirl } from "react-icons/cg";
import { PiStudent } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllLevels } from "../features/courses/apis/coursesApi";

function MultiLevelDropdown({ onOpenDropdown, setIsOpen }) {
  const [theWholething, setTheWholething] = useState(false);
  const { data: AllLevel, isLoading: isLoadingLevel } = useQuery({
    queryKey: ['levels'],
    queryFn: () => getAllLevels()
  });
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    setTheWholething(AllLevel?.data?.data);
  }, [AllLevel]);

  const closeAll = () => {
    setIsOpen(false)
    setActiveSubmenu(null)
  }
  // Handle submenu toggle using index
  function handleSubmenuOpen(index) {
    setActiveSubmenu(activeSubmenu === index ? null : index);
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
              {/* Mapping over levels */}
              {theWholething?.map((level, index) => (
                <li className="relative" key={index}>
                  {/* Parent Button */}
                  <button
                    onClick={() => handleSubmenuOpen(index)} // Toggle submenu on click
                    className="flex items-center justify-between w-full px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <div className="flex items-center gap-5">
                      <TbMoodBoy />
                      {level?.title}
                    </div>
                  </button>
                  {/* Submenu */}
                  <AnimatePresence>
                    {activeSubmenu === index && (
                      <motion.ul
                        className="absolute top-0 bg-white divide-y rounded-lg shadow-lg right-full dark:bg-gray-800 w-[35rem]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={submenuVariants}
                      >
                        {level?.subLevels?.map((sublevel, subIndex) => (
                          <li key={subIndex}
                            onClick={closeAll}>
                            <Link
                              to={`/courses?level=${sublevel.id}`}
                              className="block px-6 py-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              {sublevel?.title?.replace(/^\d+-\s*/, '')}
                            </Link>
                          </li>
                        )
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MultiLevelDropdown;
