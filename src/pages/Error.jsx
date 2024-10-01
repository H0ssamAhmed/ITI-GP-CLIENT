import { Link } from "react-router-dom";
import Footer from "../ui/Footer";
import Navigation from "../ui/Navigation";

const Error = () => {
  return (
    <div className="flex flex-col gap-48">
      <Navigation />
      <main className="flex flex-col items-center justify-center">
        <img className="w-[96rem] h-full" src="/src/assets/404.svg" />
        <h1 className="font-bold text-center text-[3rem] lg:text-[6rem]">
          الصفحة غير موجودة
        </h1>
        <p className="font-semibold text-[2rem]">
          الصفحة التي تحاول الوصول إليها غير موجودة.
        </p>
        <Link
          to="/"
          className="rounded-full px-6 py-4 font-bold mt-10 outline-none ring-1 ring-white bg-yellow-400"
        >
          الصفحة الرئيسية
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Error;
