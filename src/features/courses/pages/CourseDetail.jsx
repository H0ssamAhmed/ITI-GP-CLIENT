import testImg from "../../../assets/HomePageImages/teacher.png";
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlay, FaStairs, FaStar } from 'react-icons/fa6';
import { buyACourse, getCourseDetails, getCurrentUserCourses, giveRate } from "../apis/coursesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Rating, Skeleton, Stack, Typography } from "@mui/material";
import { ContentPasteSearchOutlined, Description } from "@mui/icons-material";
import { getCurrentUser } from "../../../services/currentUser";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import RateCourse from "../components/RateCourse";
import RatePopUp from "../components/RatePopUp";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [loadingBuying, setLoadingBuying] = useState(false);
  const [course, setCourse] = useState();
  const [isUserEnroled, setIsUserEnroled] = useState(false);
  const [showConfirmBuying, setShowConfirmBuying] = useState(false);
  const [tototalReivewRate, setTotalReivewsRate] = useState("")

  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser()
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ['courseDetaials'],
    queryFn: () => getCourseDetails(courseId)
  });
  const { data: userCourses } = useQuery({
    queryKey: ['userCourses'],
    queryFn: () => getCurrentUserCourses()
  });
  const { mutate, isLoading: buyLoading } = useMutation({
    mutationFn: () => buyACourse(courseId, user?.data.id),
    onMutate: () => {
      // Show loading toast when the mutation starts
      const toastId = toast.loading("جاري شراء الدورة...");
      setLoadingBuying(true);
      return { toastId }; // Return toastId to update or dismiss later
    },

    onSuccess: (data, variables, context) => {
      toast.update(context.toastId, {
        render: "تم شراء الدورة بنجاح",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        onClose: () => {
          queryClient.invalidateQueries(['userCourses']);
          setLoadingBuying(false);
        }
      });
     
    },
    onError: (error, variables, context) => {
      toast.update(context.toastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        onClose: () => {
          setLoadingBuying(false);
        }
      });
    },
  });
  const handelRating = (data) => {
    RatingCourse(data);

  }

  function isStudentIdInRatings(data, studentId) {
    // Check if any rating belongs to the given studentId
    const studentExists = data?.some(item => item.student.id === studentId);
    // Return false if the student ID exists; otherwise, return true
    return !studentExists;
  }
  const { mutate: RatingCourse } = useMutation({
    mutationFn: (rate) => giveRate(rate),
    onSuccess: (data, variables, context) => {
      toast.update(context.toastId, {
        render: data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        onClose: () => {
          queryClient.invalidateQueries(['courseDetaials']);
        }
      });
    },
    onMutate: () => {
      const toastId = toast.loading("جاري تقييم الدورة...");
      return { toastId }
    },
    onError: (error, variables, context) => {
      toast.update(context.toastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        onClose: () => {
          setLoadingBuying(false);
        }
      });
    },
  })


  useEffect(() => {
    if (data) {
      setCourse(data.data);
      calcReview(data?.data?.reviews)
    }
    userCourses?.data?.courses?.forEach((course) => {
      if (course.id == courseId) {
        setIsUserEnroled(true);
      }
    });
  }, [data, userCourses, courseId]);

  const handleBuyCourse = () => {
    if (!user) {
      toast.error("برجاء تسجيل الدخول اولا", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      setShowConfirmBuying(true)
    }
  };
  const confimrBuyCourse = () => {
    mutate();
    setShowConfirmBuying(false)

  }

  function convertToArabicNumerals(num) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num?.toString().split('').map(digit => arabicNumerals[digit]).join('');
  }
  const calcReview = (reviews) => {
    const ratings = reviews.map(item => item.rate);
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratings.length;
    setTotalReivewsRate(average.toFixed(2));
  }

  return (
    <div className='relative'>
      <div className='mx-auto'>
        {error && (
          <Stack className="w-full h-[70vh]" justifyContent="center" alignItems="center" rowGap={4}>
            <h1 className='text-4xl'>حدث خطأ غير متوقع</h1>
            <p>برجاء التواصل مع أحد المشرفين</p>
          </Stack>
        )}
        {isLoading && <Skeleton variant="rectangular" width={300} height={400} />}
        {!isLoading && !error && (
          <>
            <Stack direction="column">
              <div className='bg-brand-100 py-8'>
                <div className='container mx-auto grid grid-cols-12'>
                  <div className="col-span-12 md:col-span-4 w-80 rounded-md mx-auto bg-rose-5800">
                    <motion.img
                      className='object-cover md:ms-8'
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                      src={course?.image || testImg}
                      alt='Teacher image'
                    />
                  </div>
                  <div className='m-5 col-span-12 md:col-span-8'>
                    <motion.h1
                      transition={{ duration: 0.16 }}
                      initial={{ x: 500 }}
                      animate={{ x: 0 }}
                      className='my-4 text-4xl font-semibold'>{course?.levelTitle?.replace(/^\d+-\s*/, '')}</motion.h1>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="my-8 flex items-center gap-4">
                      <h2 className='font-bold'>{course?.title}</h2>
                      {isUserEnroled ?
                        <Link
                          to={`/courses/${course?.id}/${data?.data?.sections[0]?.lessons[0]?.id}`}
                          // onClick={() => setShowConfirmBuying(true)}
                          className='px-4 py-1 bg-green-500 text-white w-fit rounded-[14px]'>اكمل الدورة
                        </Link>
                        :

                        loadingBuying
                          ? <p className='px-8 py-2 bg-green-500 text-white cursor-pointer w-fit rounded-[14px]'>جاري الشراء...</p>
                          :
                          <>
                            <p onClick={handleBuyCourse} className='px-8 py-2 bg-brand-500 text-white cursor-pointer w-fit rounded-[14px]'> اشترك الآن</p>
                            <p className="font-bold text-[2.5rem]">{convertToArabicNumerals(course?.price)} جنيه</p>
                          </>
                      }
                      <AnimatePresence>
                        {showConfirmBuying && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="px-8 py-2 absolute flex items-center justify-around w-[34rem] h-[14rem]  gap-4 flex-col bg-gray-600 text-white  rounded-[14px]">
                            <p className="text-3xl">سوف يتم خصم <span className="font-bold">{convertToArabicNumerals(course?.price)}</span> جنيه من محفظتك</p>
                            <Stack width={"100%"} justifyContent={"space-between"} direction="row" alignItems="center" spacing={5}>
                              <button onClick={confimrBuyCourse} className="bg-green-400 px-8 py-2 rounded-md hover:bg-green-600 transition-all">تأكيد الشراء</button>
                              <button
                                onClick={() => setShowConfirmBuying(false)}
                                className="bg-red-400 px-8 py-2 rounded-md hover:bg-red-600 transition-all">
                                إلغاء
                              </button>
                            </Stack>
                            <span className="text-red-500"></span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <div className='flex items-center gap-8'>
                      <motion.p initial={{ y: -500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>
                        {`أ/${course?.teacherName}`}
                      </motion.p>
                      <motion.p initial={{ y: -500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>
                        {course?.lessonsCount} دروس
                      </motion.p>
                    </div>
                    {/* <div className="flex items-center justify-start gap-4"> <FaStar className="text-[2.2rem] text-yellow-800" /><p className="text-[2.2rem]">{tototalReivewRate}</p></div> */}
                  </div>
                </div>
              </div>
            </Stack>
            <div className="min-h-[60vh]">
              {isLoading && <Skeleton width={'100%'} sx={{ background: "var(--color-brand-500)" }} height={"100%"} />}
              {!isLoading && (
                <motion.section>
                  <div className="container mx-auto max-h-[600px] mb-32 overflow-y-scroll my-auto">
                    {course?.sections?.map((section, index) => (
                      <Stack key={section?.id} className="container mx-auto h-full my-auto" direction="column">
                        <Typography variant="h2" margin="1rem 2rem">
                          {section?.title}
                        </Typography>
                        {section?.lessons?.map((lesson) => (
                          <motion.div key={lesson?.id}
                            initial={{ x: -2000, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                            className='container mx-auto'>
                            <div className='grid grid-cols-12 gap-8 border-gray-300 border my-4 p-4 rounded-lg'>
                              <div className='col-span-6 flex items-center gap-8'>
                                <p className='bg-brand-500 w-10 h-10 rounded-full text-white'><FaPlay className='w-full h-full p-2' /></p>
                                <Link to={`/courses/${courseId}/${lesson?.id}`}>{lesson?.title}</Link>
                              </div>
                              <div className='col-span-6 flex items-center gap-8'>
                                <Description />
                                <p>{lesson?.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </Stack>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          </>
        )}
      </div>


      <div className="flex container max-h-[400px] overflow-y-scroll mx-auto flex-col md:col-span-4 my-4 items-center justify-center gap-4">
        {data?.data?.reviews.map((review, index) => (
          <RateCourse key={review?.id} review={review} />
        ))}

        {isUserEnroled &&
          <>
            {isStudentIdInRatings(data?.data?.reviews, user?.data?.id) ?
              <RatePopUp
                handelRating={handelRating}
                courseId={courseId}
                studentId={user?.data.id}
              />
              : <p>لقد قيمت هذا الكورس بالفعل</p>
            }</>
        }
      </div>
    </div >
  );
};

export default CourseDetail;
