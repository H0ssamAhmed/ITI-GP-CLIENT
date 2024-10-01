import Logo from "./Logo";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Using React Router Link

function Footer() {
  return (
    <footer className="bg-brand-700 rounded-t-[25px] text-white py-10">
      <div className="max-w-7xl mx-auto px-4  ">
        {/* Upper Section: Logo & Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-16">
          <Logo className="self-start" />

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* About Section */}
            <ul className="space-y-4 text-center">
              <li className="text-2xl font-semibold">عن المنصة</li>
              <li>
                <Link
                  to="/about"
                  className="text-lg hover:text-yellow-400 transition-colors"
                >
                  عن ذاكرلي
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-lg hover:text-yellow-400 transition-colors"
                >
                  إتصل بنا
                </Link>
              </li>
            </ul>

            {/* Content Section */}
            <ul className="space-y-4 text-center">
              <li className="text-2xl font-semibold">المحتوى</li>
              <li>
                <Link
                  to="/classes"
                  className="text-lg hover:text-yellow-400 transition-colors"
                >
                  الصفوف الدراسية
                </Link>
              </li>
              <li>
                <Link
                  to="/subjects"
                  className="text-lg hover:text-yellow-400 transition-colors"
                >
                  جميع المواد
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-10 flex justify-center gap-5 text-4xl text-yellow-500">
          <FaFacebook className="cursor-pointer hover:text-yellow-300 transition-colors" />
          <IoLogoYoutube className="cursor-pointer hover:text-yellow-300 transition-colors" />
          <RiTwitterXLine className="cursor-pointer hover:text-yellow-300 transition-colors" />
        </div>

        {/* Copyright Section */}
        <p className="text-center mt-8 text-yellow-500">
          حقوق الطبع والنشر © ٢٠٢٤ ذاكرلي
          <br /> جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}

export default Footer;
