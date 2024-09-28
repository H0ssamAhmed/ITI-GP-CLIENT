import Logo from "./Logo";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";

function Footer() {
  return (
    <footer>
      <div className="bg-brand-700   rounded-t-[80px]">
        <div className="flex p-4 justify-evenly">
          <Logo className="self-start" />
          <div className="flex gap-[3rem]">
            <ul className="flex flex-col items-center gap-6 font-bold text-white ">
              <span className="text-[1.8rem]">عن المنصة</span>
              <li className="text-[1.4rem]">عن ذاكرلي</li>
              <li className="text-[1.4rem]">إتصل بنا</li>
            </ul>

            <ul className="flex flex-col items-center gap-6 font-bold text-white">
              <span className="text-[1.8rem]">المحتوى</span>

              <li className="text-[1.4rem]">الصفوف الدراسية</li>
              <li className="text-[1.4rem]">جميع المواد</li>
            </ul>
          </div>
        </div>

        <div className=" mb-5 flex gap-10 text-yellow-500  text-[3rem] items-center justify-center">
          <FaFacebook className="cursor-pointer hover:text-yellow-100 " />
          <IoLogoYoutube className="transition-all duration-500 cursor-pointer hover:text-yellow-100" />
          <RiTwitterXLine className="transition-all duration-500 cursor-pointer hover:text-yellow-100" />
        </div>
        <p className="text-center text-yellow-500">
          All rights reserved by ANHAM Team &copy; 2024
        </p>
      </div>
    </footer>
  );
}

export default Footer;
