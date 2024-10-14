import testImg from "../../../assets/HomePageImages/teacher.png";
import { motion } from 'framer-motion'
import { FaClock, FaPlay } from 'react-icons/fa6';
import { getCourseDetails } from "../apis/coursesApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton, Stack, Typography } from "@mui/material";
import { Description, Note } from "@mui/icons-material";

const fetchCoourseDetails = async (courseId) => {
  try {
    const fetchedDetails = await getCourseDetails(courseId)
    return fetchedDetails
  } catch (err) {
    console.log(err);
    return err

  } finally {
    console.log(false);

  }
}



const CourseDetail = () => {
  const { courseId } = useParams()
  // console.log(courseId)
  const [course, setCourse] = useState()
  const { data, isLoading, error } = useQuery({ queryKey: ['courseDetaials'], queryFn: () => fetchCoourseDetails(courseId) })
  useEffect(() => {
    if (data) {
      // data?.data.sections.reverse()
      console.log(data)
      setCourse(data.data)
    }
  }, [data])

  return (
    <div className=''>
      <div className='mx-auto'>
        <Stack direction="column" >
          <div className='bg-brand-100 py-8'>

            <div className='container mx-auto grid grid-cols-12'>
              <div className="col-span-12  md:col-span-4 w-80 rounded-md mx-auto sm:m-0 bg-rose-5800">
                <motion.img
                  className='object-cover md:ms-8 lg:ms-8'
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  src={course?.image || testImg} alt='Teacher image'
                />
              </div>

              <div className='m-5 col-span-12 md:col-span-8'>
                <motion.h1
                  transition={{ duration: 0.16 }}
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  className='my-4 text-4xl font-semibold'>{course?.levelTitle}</motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="my-8 flex items-center justify-start gap-4">
                  <h2 className='font-bold'>{course?.title}</h2>
                  <p className='px-8 py-2 bg-brand-500 text-white hover:bg-brand-700 cursor-pointer w-fit rounded-[14px] border'>اشترك الان</p>

                </motion.div>
                <div className='flex items-center justify-start flex-wrap gap-8'>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.493 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>{`أ/${course?.teacherName}`}</motion.p>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.653 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>{course?.lessonsCount} دروس</motion.p>
                </div>
              </div>
            </div>
          </div>
        </Stack>
        <div className="min-h-[60vh]">
          {isLoading &&
            <Skeleton width={'100%'} sx={{ background: "var(--color-brand-500)" }} height={"100%"} />
          }
          {!isLoading &&
            <motion.section className="">
              {course?.sections?.map((section, index) => {
                return (<Stack direction="column" key={section?.id} className="my-auto container mx-auto h-full">
                  <Typography variant="h2" margin="1rem 2rem">
                    {section?.title}
                  </Typography>
                  {section?.lessons?.map((lesson) =>
                    <motion.div key={lesson?.id}
                      initial={{ xOrY: -2000, opacity: 0 }}
                      animate={{ x: 0, y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                      className='container  mx-auto'>
                      <div className='grid grid-cols-12 gap-8 border-gray-300 border my-4 p-4 rounded-lg'>
                        <div className=' col-span-6 flex items-center justify-start gap-8 '>
                          <p className='bg-brand-500 w-10 h-10 rounded-full text-white'><FaPlay className='w-full h-full p-2 ' /></p>
                          <Link to={`/courses/${courseId}/${lesson?.id}`}> {lesson?.title}</Link>
                        </div>
                        <div className='col-span-6 flex items-center justify-start gap-8'>
                          <Description />
                          <p>{lesson.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Stack>)
              })}

            </motion.section>
          }
        </div>

      </div>
    </div >
  )
}

export default CourseDetail


{/* {Array.from({ length: 50 }).map((_, index) => {
            return (<motion.div key={index + 1}
              // initial={{ x: index % 2 == 0 ? -2000 : 2000, opacity: 0 }} // come from left and right
              // initial={{ y: index % 2 == 0 ? -2000 : 2000, opacity: 0 }} // Come from top and bottom
              // initial={{ y: 2000, opacity: 0 }} // come from bottom
              initial={{ xOrY: -2000, opacity: 0 }} // 😂😂واحد بتجري ورا التانية
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              className='container mx-auto'>
              <div className='grid grid-cols-12 gap-8 border-gray-300 border my-4 p-4 rounded-lg'>
                <div className=' col-span-6 flex items-center justify-start gap-8 '>
                  <p className='bg-brand-500 w-10 h-10 rounded-full text-white'><FaPlay className='w-full h-full p-2 ' /></p>
                  <p> الدرس - {index + 1}</p>
                </div>
                <div className='col-span-6 flex items-center justify-start gap-8'>
                  <FaClock />
                  <p>ساعتين</p>
                </div>
              </div>
            </motion.div>

            )
          })} */}