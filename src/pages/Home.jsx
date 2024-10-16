import { motion } from "framer-motion";
import heroImg from "../assets/HomePageImages/heroImg.png";
import {
  PiArrowBendDownLeftBold,
  PiArrowBendDownRightBold,
} from "react-icons/pi";
import Button from "../ui/Button";
import HeroFeatureCard from "../ui/HeroFeatureCard";
import { HiOutlineLightBulb } from "react-icons/hi";
import { GiOpenBook } from "react-icons/gi";
import { MdOutlineQuiz } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import TeacherCard from "../ui/TeacherCard";
import SubjectCard from "../ui/SubjectCard";
import mathImg from "../assets/HomePageImages/math.png";
import historyImg from "../assets/HomePageImages/history.png";
import chemistryImg from "../assets/HomePageImages/chmestriy.png";
import englishImg from "../assets/HomePageImages/english.png";
import { TfiBlackboard } from "react-icons/tfi";
import { MdHistoryEdu } from "react-icons/md";
import { FaChalkboardTeacher, FaFlask } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import SeeMore from "../ui/SeeMore";
import VideoEmbed from "../ui/VideoEmbed";
import teacherImg from "../assets/HomePageImages/teacher.png";
import studentsImg from "../assets/HomePageImages/students.png";
import { FaArrowLeft } from "react-icons/fa6";

import ScrollToTopButton from "../ui/ScrollToTopButton";
import { Link, useNavigate } from "react-router-dom";
import StudentsAvatar from "../ui/StudentsAvatar";
import { useContext, useState } from "react";
import SignUpContext from "../features/store/signup-context";
import { getTeachers } from "../services/getTeachersApi";
import { useQuery } from "@tanstack/react-query";
import TeacherCardSkeleton from "../ui/TeacherCardSkeleton";
//  Temporary Data
const subjects = [
  {
    img: mathImg,
    subjectName: "الرياضيات",
    subjectIcon: TfiBlackboard,
    grade: "الصف الأول الثانوي",
  },
  {
    img: historyImg,
    subjectName: "التاريخ",
    subjectIcon: MdHistoryEdu,
    grade: "الصف الثالث الإعدادي",
  },
  {
    img: chemistryImg,
    subjectName: "الكيمياء",
    subjectIcon: FaFlask,
    grade: "الصف الثالث الثانوي",
  },
  {
    img: englishImg,
    subjectName: "اللغة الإنجليزية",
    subjectIcon: FaLanguage,
    grade: "الصف السادس الإبتدائي",
  },
];

function Home() {
  const { handleTypeChange } = useContext(SignUpContext);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,});
    const fetchTeachers = async () => {
      const response = await getTeachers(pagination);
      return response;
    };
  const handleNavigate = () => {
    navigate("/signup");
    handleTypeChange("teacher");
  };
  const {
    data: fetchedTeachersData,
    isPending: isFetchingTeachers,
    isError: isTeachersError,
  } = useQuery({
    queryKey: ["teachers", pagination],
    queryFn: fetchTeachers
  });
 
  return (
    <>
      <motion.div
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-center bg-cover -z-30 bg-custom-pattern "></div>

        <motion.div
          className="relative min-h-screen"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative bg-brand-700">
            <div className="flex items-center justify-center">
              <ScrollToTopButton />
            </div>
            <motion.div
              className="flex z-[60] flex-col top-[5rem]  lg:grid lg:grid-cols-2 relative bg-gray-50 w-[35rem] lg:w-[128rem] h-[49.6rem] mx-auto rounded-[32px]"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Hero Image Container */}
              <motion.div
                className="mx-auto mt-16 flex relative lg:w-[45rem] lg:h-[45rem] bg-brand-700 w-[21.8rem] h-[21.4rem] rounded-[50%]"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <img className="rounded-full" src={heroImg} />
                {/* Animated text */}
                <motion.div
                  className="absolute px-4 lg:text-[2rem] lg:top-[4rem] lg:left-[-5rem] bg-yellow-500 rounded-full top-[1rem] left-[-2rem] font-bold text-[1rem]"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  نخبة من أفضل المعلمين
                </motion.div>
                <motion.div
                  className="absolute px-4 lg:text-[2rem] lg:top-[9rem] lg:left-[-10rem] bg-yellow-500 rounded-full top-[4rem] left-[-4rem] font-bold text-[1rem]"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  شرح مبسط لجميع الدروس
                </motion.div>
                <motion.div
                  className="absolute px-4 lg:text-[2rem] lg:top-[14rem] lg:left-[-15rem] bg-yellow-500 rounded-full top-[7rem] left-[-6.5rem] font-bold text-[1rem]"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  محتوى تفاعلي ومتابعة دورية
                </motion.div>
              </motion.div>

              {/* Hero Text and Button */}
              <motion.div
                className="flex flex-col items-center justify-center gap-6 mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="flex items-center justify-center gap-8">
                  <p className="font-bold lg:text-[2rem]">
                    رحلة التفوق تبدأ هنا مع
                  </p>
                  <span className="text-[3.6rem] lg:text-[8rem] font-bold text-brand-700 font-cairo">
                    ذاكرلي
                  </span>
                </div>
                <p className="p-5 text-center lg:text-[2rem]">
                  توفير محتوى تعليمي مبتكر يساعدك على التفوق
                  <br className="lg:hidden" /> في كل مرحلة دراسية.
                </p>

                <div className=" hidden mt-2 mb-5 lg:flex flex-col items-center w-[50rem] justify-between">
                  <StudentsAvatar />
                  <span className="text-[1.8rem] font-bold">
                    معانا هتضمن نجاح ابنك في كل خطوة تعليمية{" "}
                  </span>
                </div>
                <Button className="px-6 py-3 font-bold bg-yellow-500 rounded-full hover:bg-yellow-300">
                  انضم لآلاف الطلاب الناجحين
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="bg-gray-200  z-[50] absolute top-[38rem] w-[100%] h-[47rem] lg:h-[37rem] border-t-4 border-l-4 border-r-4 rounded-t-[106px] p-4 mx-auto flex justify-evenly items-center">
            {/* Features Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4   lg:gap-56 gap-x-15 mt-[20rem]">
              <HeroFeatureCard>
                <HiOutlineLightBulb className="text-[7rem] font-bold" />
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold text-[2rem]">إدرس</p>
                  <p className="text-[1rem] text-center">
                    إدرس بالطرق الحديثة وتميز عن زملائك
                  </p>
                </div>
              </HeroFeatureCard>
              <HeroFeatureCard>
                <GiOpenBook className="text-[5rem] font-bold" />
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold text-[1.7rem]">إحجز درسك</p>
                  <p className="text-[1.1rem] text-center">
                    إحجز كل دروسك بسهولة
                  </p>
                </div>
              </HeroFeatureCard>
              <HeroFeatureCard>
                <MdOutlineQuiz className="text-[5rem] font-bold" />
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold text-[1.5rem]">إختبر نفسك</p>
                  <p className="text-[1.1rem] text-center">
                    إمتحانات لقياس مستواك
                  </p>
                </div>
              </HeroFeatureCard>
              <HeroFeatureCard>
                <GiTeacher className="text-[5rem] font-bold" />
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold text-[1.1rem]">تواصل مع معلمك</p>
                  <p className="text-[0.9rem] text-center">
                    اطرح الأسئلة وأحصل على الأجوبة
                  </p>
                </div>
              </HeroFeatureCard>
            </div>
          </div>

          {/* Section One */}
          <motion.section
            className="relative mt-[30rem] px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <h1 className="text-[2.5rem] mt-[40rem] lg:text-[3.5rem] mb-60 font-bold">
              إبدا رحلتك مع نخبة من أفضل المدرسين
            </h1>
            <div className="grid items-center justify-center grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4 gap-y-60">
              {isFetchingTeachers ? (
                <TeacherCardSkeleton />
              ) : (
                fetchedTeachersData?.teachers.map((teacher, index) => (
                  <TeacherCard key={teacher.id} teacherData={teacher} />
                ))
              )}
            </div>
            <SeeMore  />
          </motion.section>

          {/* Further sections continue... */}

          <motion.section
            className="mt-[15rem]  px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <div className="relative ">
              <h1 className="text-[2.5rem] mb-40 lg:text-[3.5rem] font-bold ">
                إستكشف موادنا التعليمية
              </h1>
              <div className="grid items-center justify-center grid-cols-1 gap-5 mb-16 md:grid-cols-2 lg:grid-cols-4 gap-y-36">
                {subjects.map((subject, index) => (
                  <SubjectCard
                    key={index}
                    img={subject.img}
                    subjectName={subject.subjectName}
                    subjectIcon={subject.subjectIcon}
                    grade={subject.grade}
                  />
                ))}
              </div>
            </div>
            <SeeMore />
          </motion.section>

          <motion.section
            className="mt-[10rem] mb-40 lg:grid lg:grid-cols-2  px-6 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <div className="relative ">
              <h1 className="text-[2.5rem] mb-5 lg:text-[4rem]  font-bold ">
                مين{" "}
                <span className="text-brand-700 text-[3rem] lg:text-[6rem]">
                  ذاكرلي
                </span>{" "}
                ؟
              </h1>
              <p className="font-bold">فيديو توضحي لطريقة عمل المنصة</p>
            </div>
            <div></div>
            <PiArrowBendDownLeftBold className="text-brand-700 flex mx-auto rotate-[-60deg] lg:rotate-[-10deg] text-[8rem] mt-14" />

            <VideoEmbed />

            <PiArrowBendDownRightBold className="text-yellow-500 flex mx-auto lg:mx-[100rem] rotate-[45deg] text-[8rem] mt-14" />
          </motion.section>

          <motion.section
            className="flex flex-col items-center justify-center gap-12 px-4 mx-auto mb-20 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            {/* Teachers */}
            <div className="relative  flex flex-col lg:flex-row items-center justify-around max-w-7xl bg-brand-700 h-auto lg:h-[30rem] rounded-lg p-4">
              {/* Text + Button on the left */}
              <div className="flex flex-col w-full gap-4 p-4 lg:w-1/2">
                <h2 className="text-[2.5rem] lg:text-[3rem] font-bold text-white">
                  كن مدرساً في منصة
                  <span className="text-yellow-500 lg:text-[3.5rem]">
                    ذاكرلي
                  </span>
                </h2>
                <p className="text-white text-[1.8rem] lg:text-[1.5rem]">
                  شارك بالتعليم من خلال منصة ذاكرلي مع نخبة كبيرة من معلمين
                  المراحل الابتدائية والاعدادية والثانوية للمناهج العربي
                  والانجليزي والفرنساوي{" "}
                </p>
                <Button
                  onClick={handleNavigate}
                  className="flex items-center self-start gap-4 px-6 py-3 mt-4 font-bold bg-yellow-500 text-[1.6rem] rounded-full hover:bg-yellow-100"
                >
                  <FaChalkboardTeacher className="text-[3rem]" /> إشترك كمعلم
                </Button>
              </div>

              {/* Image on the right */}
              <div className="w-full max-w-sm overflow-hidden border-4 border-yellow-500 lg:w-auto">
                <img
                  src={teacherImg}
                  alt="Teacher"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Students */}
            <div className="relative flex flex-col lg:flex-row items-center justify-around max-w-7xl w-full bg-yellow-500 h-auto lg:h-[30rem] rounded-lg p-6">
              {/* Text + Button on the left */}
              <div className="flex flex-col w-full gap-4 p-4 lg:w-1/2">
                <h2 className="text-[2.5rem] lg:text-[3rem] font-bold text-black">
                  ذاكر في اي وقت واي مكان <br /> مع منصة{" "}
                  <span className="text-brand-700 lg:text-[4rem]">ذاكرلي</span>
                </h2>
                <p className="text-black text-[1.8rem] lg:text-[2rem]">
                  تقدر تفتح حسابك على منصة ذاكرلي من اي مكان وتكمل تعليمك بسهولة
                </p>
                <Link to="/signup">
                  <Button className="flex items-center self-start gap-4 px-6 py-3 mt-4 font-bold text-white text-[1.6rem] rounded-full bg-brand-700 hover:bg-brand-500">
                    <FaArrowLeft className="text-white text-[3rem]" />
                    إشترك الأن
                  </Button>
                </Link>
              </div>

              {/* Image on the right */}
              <div className="w-full max-w-sm overflow-hidden border-4 lg:w-auto border-brand-700">
                <img
                  src={studentsImg}
                  alt="Students"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Home;
