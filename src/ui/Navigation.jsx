import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import BurgerMenu from "./BurgerMenu";
import Button from "./Button";
import LinkWithUnderline from "./LinkWithUnderline";
import Logo from "./Logo";
import MultiLevelDropdown from "./MultiLevelDropdown";
import SearchBar from "./SearchBar";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 50], [1, 0.9]); // Shrinks opacity as user scrolls
  const navY = useTransform(scrollY, [0, 50], [0, -10]); // Animates Y position on scroll

  // console.log(isOpen);
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <motion.nav
      style={{ opacity: navOpacity, y: navY }}
      className="fixed top-0 left-0 z-[900] flex items-center justify-between w-full p-4 mb-5 shadow-md py-7 bg-brand-700 menu lg:justify-around"
      initial={false}
      animate={isOpen ? "open" : "close"}
    >
      <Logo />
      <BurgerMenu />
      <div className="items-center justify-between hidden lg:flex">
        <div className="hidden gap-4 space-x-8 text-white md:hidden lg:items-end lg:justify-center lg:flex">
          <LinkWithUnderline>خدمات المنصة</LinkWithUnderline>

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

          <LinkWithUnderline>من نحن</LinkWithUnderline>
          <LinkWithUnderline>تواصل معنا</LinkWithUnderline>
        </div>
        <SearchBar />
      </div>
      <div className="hidden gap-4 lg:flex">
        <Button className="px-4 py-2 font-bold text-black transition-all duration-300 bg-yellow-500 rounded-full hover:bg-yellow-100 ">
          حساب جديد
        </Button>
        <Button className="px-4 py-2 font-bold text-white transition-all duration-300 bg-transparent border-2 rounded-full hover:bg-gray-300 ring-white">
          تسجيل الدخول
        </Button>
      </div>
    </motion.nav>
  );
}

export default Navigation;
