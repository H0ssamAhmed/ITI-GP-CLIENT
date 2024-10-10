import { motion, useScroll, useTransform } from 'framer-motion';
import { useContext, useState } from 'react';
import BurgerMenu from './BurgerMenu';
import Button from './Button';
import LinkWithUnderline from './LinkWithUnderline';
import Logo from './Logo';
import MultiLevelDropdown from './MultiLevelDropdown';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import SignUpContext from '../features/store/signup-context';
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 50], [1, 0.9]); // Shrinks opacity as user scrolls
  const navY = useTransform(scrollY, [0, 50], [0, -10]); // Animates Y position on scroll
  const { handleChangeType } = useContext(SignUpContext);
  // console.log(isOpen);
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <motion.nav
      style={{ opacity: navOpacity, y: navY }}
      className="sticky top-0 left-0 z-[900] flex items-center justify-between w-full  p-6 shadow-md text-[1.5rem]  bg-brand-700 menu lg:justify-around"
      initial={false}
      animate={isOpen ? 'open' : 'close'}
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

          <Link to={'/about-us'}>
            <LinkWithUnderline>من نحن</LinkWithUnderline>
          </Link>
          <Link to={'/contact'}>
            <LinkWithUnderline>تواصل معنا</LinkWithUnderline>
          </Link>
        </div>
        <SearchBar />
      </div>
      <div className="hidden items-center gap-4 lg:flex">
        <Link to={'/signup'} onClick={() => handleChangeType('student')}>
          <Button className="px-4  py-2 font-bold text-black transition-all duration-300 bg-yellow-500 rounded-full hover:bg-yellow-300 ">
            حساب جديد
          </Button>
        </Link>
        <Link to={'/login'}>
          <Button className="px-4 py-2  font-bold text-white transition-all duration-300 bg-transparent border-2 rounded-full hover:bg-gray-400 ring-white">
            تسجيل الدخول
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}

export default Navigation;
