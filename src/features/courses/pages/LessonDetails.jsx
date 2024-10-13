
import Button from "../../../ui/Button"
import VideoEmbed from "../../../ui/VideoEmbed"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import AccrdionModule from "../components/AccrdionModule";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { getCourseDetails } from "../apis/coursesApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getFullDetails = async (courseId, lessonId) => {
  try {
    const courseDetaials = await getCourseDetails(courseId)
    // const lessonDetails = await getCourseDetails(lessonId)
    // console.log(courseDetaials);
    // console.log(lessonDetails);
    return courseDetaials
  } catch (err) {
    console.log(err);
    return err

  } finally {
    console.log(false);

  }
}

function LessonDetails() {
  const { courseId, lessonId } = useParams()
  const [courseData, setCourseData] = useState()
  const [videoUrl, setVideoUrl] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [lessonTitle, setLessonTitle] = useState("")
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({ queryKey: ['courseDetaials'], queryFn: () => getFullDetails(courseId) })
  useEffect(() => {
    console.log(data?.data);

    if (data) {
      data?.data.Sections.reverse()
      setCourseData(data?.data)
    }
    courseData?.Sections.map((unit) => {
      unit?.Lessons.map((lesson) => {
        if (lesson.id == lessonId) {
          setLessonTitle(lesson?.title);
          setVideoUrl(lesson?.Videos?.[0].url);
          setPdfUrl(lesson?.Pdfs?.[0].url);
        }
      })
    })

  }, [data, lessonId])

  const goToLesson = (e, where) => {
    let currentLessonIndex, currentUnitIndex;
    courseData?.Sections.forEach((unit, unitIndex) => {
      unit.Lessons.forEach((lesson, lessonIndex) => {
        if (lesson.id === lessonId) {
          currentLessonIndex = lessonIndex;
          currentUnitIndex = unitIndex;
        }
      });
    });

    if (currentLessonIndex !== undefined && currentUnitIndex !== undefined) {
      const currentUnit = courseData.Sections[currentUnitIndex];

      if (where === "next") {
        if (currentLessonIndex < currentUnit.Lessons.length - 1) {
          const nextLesson = currentUnit.Lessons[currentLessonIndex + 1];
          navigate(`/courses/${courseId}/${nextLesson.id}`);
        } else {
          console.log("You're at the last lesson.");
        }
      }

      if (where === "prev") {
        if (currentLessonIndex > 0) {
          const prevLesson = currentUnit.Lessons[currentLessonIndex - 1];
          navigate(`/courses/${courseId}/${prevLesson.id}`);
        } else {
          console.log("You're at the first lesson.");
        }
      }
    } else {
      console.log("Current lesson not found.");
    }
  };


  return (
    <main className='my-8'>
      <div className='container mx-auto'>
        <div className=" grid grid-cols-12 gap-4">
          <section className="col-span-12 md:col-span-9 grid-cols-subgrid">
            <VideoEmbed url={videoUrl} />
            <div className="flex items-center justify-between mx-4">
              <p className="my-8 ms-4 font-bold">{lessonTitle}</p>
              <a download={pdfUrl}>
                تحميل الدرس PDF
              </a>
            </div>
            <div className="flex justify-between mx-4">
              <div
                onClick={(e) => goToLesson(e, "next")}
                className="bg-brand-500 w-fit text-[16px] flex items-center gap-4 hover:bg-brand-400 text-white  rounded-xl px-8  p-2">
                <FaArrowRight />
                <Button children="الدرس التالي" />
              </div>
              <div
                onClick={(e) => goToLesson(e, "prev")}

                className="bg-brand-500 w-fit text-[16px] flex items-center gap-4 hover:bg-brand-400 text-white  rounded-xl px-8 p-2">
                <Button children="الدرس السابق" />
                <FaArrowLeft />
              </div>
            </div>
          </section>
          <nav className="taegetNav col-span-12 md:col-span-3 bg-brand-100 h-fit max-h-[300px] md:max-h-[550px] overflow-y-scroll py-2 align-middle  my-4 border border-brand-500 rounded-lg">
            <div className="h-full">
              {courseData?.Sections?.map((unit = "unit", index) => (
                <AccrdionModule
                  key={index}
                  index={index + 1}
                  unit={unit}
                  lessons={5}
                  exam={1}
                />)
              )}
            </div>
          </nav>
        </div>
      </div>

    </main>
  )
}

export default LessonDetails