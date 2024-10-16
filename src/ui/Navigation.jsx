import { motion, useScroll, useTransform } from "framer-motion";
import { useContext, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import Button from "./Button";
import LinkWithUnderline from "./LinkWithUnderline";
import Logo from "./Logo";
import MultiLevelDropdown from "./MultiLevelDropdown";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoggedUser from "./LoggedUser";
import SignUpContext from "../features/store/signup-context";

function Navigation() {
  const userRole = useSelector((state) => state.auth.role);
  const { handleChangeType } = useContext(SignUpContext);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 50], [1, 0.9]); // Shrinks opacity as user scrolls
  const navY = useTransform(scrollY, [0, 50], [0, -10]); // Animates Y position on scroll

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function handleMouseEnterDropdown() {
    setDropdownOpen(true);
  }

  function handleMouseLeaveDropdown() {
    setDropdownOpen(false);
  }

  function toggleLoginDropdown() {
    setLoginDropdownOpen(!loginDropdownOpen);
  }

  function handleMouseEnterLoginDropdown() {
    setLoginDropdownOpen(true);
  }

  function handleMouseLeaveLoginDropdown() {
    setLoginDropdownOpen(false);
  }

  const handleAccountTypeChange = (type) => {
    handleChangeType(type);
    setDropdownOpen(false); // Close signup dropdown after selection
    setLoginDropdownOpen(false); // Close login dropdown after selection
  };

  return (
    <motion.nav
      style={{ opacity: navOpacity, y: navY }}
      className="sticky top-0 left-0 z-[900] flex items-center justify-between w-full p-6 shadow-md text-[1.5rem] bg-brand-700 menu lg:justify-around"
      initial={false}
      animate={isOpen ? "open" : "close"}
    >
      <Logo />
      <BurgerMenu />
      <div className="items-center justify-between hidden lg:flex">
        <div className="hidden gap-4 space-x-8 text-white md:hidden lg:items-end lg:justify-center lg:flex">
          <Link to="/features">
            <LinkWithUnderline>خدمات المنصة</LinkWithUnderline>
          </Link>

          <div className="relative inline-block">
            <LinkWithUnderline
              id="multiLevelDropdownButton"
              dataDropdownToggle="multi-dropdown"
              onMouseOver={toggleIsOpen}
            >
              الفصول الدراسية 
            </LinkWithUnderline>

            <MultiLevelDropdown onOpenDropdown={isOpen} />
          </div>

          <Link to={"/about-us"}>
            <LinkWithUnderline>من نحن</LinkWithUnderline>
          </Link>
          <Link to={"/contact"}>
            <LinkWithUnderline>تواصل معنا</LinkWithUnderline>
          </Link>
        </div>
        <SearchBar />
      </div>
      <div className="relative items-center hidden gap-4 lg:flex">
        {!userRole ? (
          <>
            <div
              className="relative inline-block"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <Button className="px-4 py-2 font-bold text-black transition-all duration-300 bg-yellow-500 rounded-full hover:bg-yellow-300">
                حساب جديد
              </Button>
              {dropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-1 bg-white rounded-md shadow-lg">
                  <Link
                    to={"/signup"}
                    onClick={() => handleAccountTypeChange("student")}
                  >
                    <Button className="block w-full px-4 py-2 text-center text-gray-800 hover:bg-gray-100">
                      طالب
                    </Button>
                  </Link>
                  <Link
                    to={"/signup"}
                    onClick={() => handleAccountTypeChange("teacher")}
                  >
                    <Button className="block w-full px-4 py-2 text-center text-gray-800 hover:bg-gray-100">
                      معلم
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Login Dropdown */}
            <div
              className="relative inline-block"
              onMouseEnter={handleMouseEnterLoginDropdown}
              onMouseLeave={handleMouseLeaveLoginDropdown}
            >
              <Button className="px-4 py-2 font-bold text-white transition-all duration-300 bg-transparent border-2 rounded-full hover:bg-gray-400 ring-white">
                تسجيل الدخول
              </Button>
              {loginDropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-1 bg-white rounded-md shadow-lg">
                  <Link to={"/login"}>
                    <Button
                      onClick={() => handleAccountTypeChange("student")}
                      className="block w-full px-4 py-2 text-center text-gray-800 hover:bg-gray-100"
                    >
                      طالب / معلم
                    </Button>
                  </Link>
                  <Link to={"/parentLogin"}>
                    <Button
                      onClick={() => handleAccountTypeChange("parent")}
                      className="block w-full px-4 py-2 text-center text-gray-800 hover:bg-gray-100"
                    >
                      ولي أمر
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <LoggedUser role={userRole} />
        )}
      </div>
    </motion.nav>
  );
}

export default Navigation;
