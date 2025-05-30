
import Button from "../../../ui/Button"
import VideoEmbed from "../../../ui/VideoEmbed"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { Skeleton } from "@mui/material"
import AccrdionModule from "../components/AccrdionModule";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourseDetails, getCurrentUserCourses } from "../apis/coursesApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/currentUser";
import { toast } from "react-toastify";



function LessonDetails() {
  const { courseId, lessonId } = useParams()
  const [courseData, setCourseData] = useState()
  const [isUserEnroled, setIsUserEnroled] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [lessonTitle, setLessonTitle] = useState("")
  const [currentUser, setCurrentUser] = useState()
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['courseDetaials'],
    queryFn: () => getCourseDetails(courseId)
  })
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser()
  });
  const { data: userCourses, isLoading: coursesLaoding, error: CoursesError } = useQuery({
    queryKey: ['userCourses'],
    queryFn: () => getCurrentUserCourses(data.data.id)
  })

  useEffect(() => {
    if (user) {
      setCurrentUser(user?.data)
    }
    userCourses?.data?.courses.map((course) => {
      if (course?.id == courseId) {
        setIsUserEnroled(true)
      }
    })

  }, [user, userCourses])

  useEffect(() => {
    if (data) {
      setCourseData(data?.data)
    }
    courseData?.sections.map((unit) => {
      unit?.lessons.map((lesson) => {
        if (lesson.id == lessonId) {
          setLessonTitle(lesson?.title);
          setVideoUrl(lesson?.videoUrl);
          setPdfUrl(lesson?.pdfUrl);

        }
      })
    })
  }, [data, lessonId, userCourses, user])


  if (coursesLaoding || userLoading) {
    return (
      <Skeleton width={'80vw'} height={"80vh"} sx={{ margin: "0 auto" }} />
    )
  }


  if (isLoading) {
    return <Skeleton width={'80vw'} height={"80vh"} sx={{ margin: "0 auto" }} />
  }
  if (error) {
    return <div className="flex flex-col gap-48">
      <main className="flex flex-col items-center justify-center">
        <img className="w-[96rem] h-full" src="/src/assets/404.svg" />
        <h1 className="font-bold text-center text-[3rem] lg:text-[6rem]">
          الصفحة غير موجودة
        </h1>
        <p className="font-semibold text-[2rem]">
          الصفحة التي تحاول الوصول إليها غير موجودة.
        </p>
        <Link
          to="/courses"
          className="rounded-full px-6 py-4 font-bold mt-10 outline-none ring-1 ring-white bg-yellow-400"
        >
          الصفحة الرئيسية
        </Link>
      </main>
    </div>
  }

  const goToLesson = (e, where) => {
    let currentLessonIndex, currentUnitIndex;
    courseData?.sections.forEach((unit, unitIndex) => {
      unit.lessons.forEach((lesson, lessonIndex) => {
        if (lesson.id === lessonId) {
          currentLessonIndex = lessonIndex;
          currentUnitIndex = unitIndex;
        }
      });
    });

    if (currentLessonIndex !== undefined && currentUnitIndex !== undefined) {
      const currentUnit = courseData.sections[currentUnitIndex];

      if (where === "next") {
        if (currentLessonIndex < currentUnit.lessons.length - 1) {
          const nextLesson = currentUnit.lessons[currentLessonIndex + 1];
          navigate(`/courses/${courseId}/${nextLesson.id}`);
        } else {
          toast.warning("لقد وصلت لاخر درس في الوحدة");
        }
      }

      if (where === "prev") {
        if (currentLessonIndex > 0) {
          const prevLesson = currentUnit.lessons[currentLessonIndex - 1];
          navigate(`/courses/${courseId}/${prevLesson.id}`);
        } else {
          toast.warning("لقد وصلت لاول درس في الوحدة");
        }
      }
    } else {
      toast.error("حدث خطأ إثناء الوصول للدرس");

    }
  };


  return (
    <main className='my-8'>


      {!isUserEnroled &&
        <>
          <div className="flex flex-col gap-48">
            <main className="flex flex-col items-center justify-center">
              <img className="w-[96rem] h-full" src="/src/assets/404.svg" />
              <h1 className="font-bold text-center text-[3rem] lg:text-[6rem]">
                انت غير مشترك في الدورة
              </h1>
              <p className="font-semibold text-[2rem]">
                لا يمكنك الوصول لهذ الصفحة
              </p>
              <Link
                to={`/courses/${courseId}`}
                className="rounded-full px-6 py-4 font-bold mt-10 outline-none ring-1 ring-white bg-yellow-400"
              >
                اشترك في الدورة الان
              </Link>
            </main>
          </div>
        </>
      }

      {isUserEnroled &&
        <div className='container mx-auto'>
          <div className=" grid grid-cols-12 gap-4">
            <section className="col-span-12 md:col-span-9 grid-cols-subgrid">
              <VideoEmbed url={videoUrl} />
              <div className="flex items-center justify-between mx-4">
                <p className="my-8 ms-4 font-bold">{lessonTitle}</p>
                <a download={pdfUrl} href={pdfUrl} className="bg-brand-500  hover:bg-brand-400 text-white  cursor-pointer px-2 py-1 rounded-md">
                  تحميل الدرس PDF
                </a>
              </div>
              <div className="flex justify-between mx-4">
                <div
                  onClick={(e) => goToLesson(e, "next")}
                  className="w-fit text-[16px] flex items-center gap-4 bg-brand-500  hover:bg-brand-400 text-white  rounded-xl px-8  p-2">
                  <FaArrowRight />
                  <Button children="الدرس التالي" />
                </div>
                <div
                  onClick={(e) => goToLesson(e, "prev")}

                  className="w-fit text-[16px] flex items-center gap-4 bg-brand-500  hover:bg-brand-400 text-white  rounded-xl px-8 p-2">
                  <Button children="الدرس السابق" />
                  <FaArrowLeft />
                </div>
              </div>
            </section>
            <nav className="taegetNav col-span-12 md:col-span-3 bg-brand-100 h-fit max-h-[300px] md:max-h-[550px] overflow-y-scroll py-2 align-middle  my-4 border border-brand-500 rounded-lg">
              <div className="h-full ">
                {courseData?.sections?.map((section, index) => (
                  <AccrdionModule
                    key={index}
                    index={index + 1}
                    section={section}
                  />)
                )}
              </div>
            </nav>
          </div>
        </div>
      }
    </main>
  )
}

export default LessonDetails