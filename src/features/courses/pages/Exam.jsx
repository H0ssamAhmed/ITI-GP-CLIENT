import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Divider } from '@mui/material';
import Question from '../components/Question';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetSectionQuiz, sendQuizAns } from '../apis/coursesApi.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';


// const SubmitQuiz = async (payload) => {
//   try {
//     const response = await sendQuizAns(payload).then((res) => res)
//     console.log(response)
//     return response
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
const Exam = () => {
  const { quizId, courseId } = useParams()
  const [questionsPerPage, setQuestionsPerPage] = useState(1); // Set the number of questions per page
  const [currentPage, setCurrentPage] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [leftTime, setLeftTime] = useState("00:00")
  const [quizTitle, setQuizTitle] = useState()
  const [quizTime, setQuizTime] = useState()
  const [isStarted, setIsStarted] = useState(false)
  const [ShowAlertSubmit, setShowAlertSubmit] = useState(false)
  const [isQuizEnd, setIsQuizEnd] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['getSectinQuiz', quizId],
    queryFn: () => GetSectionQuiz(quizId),
    retry: false,  // Optionally disable retries if an error occurs
    onError: (err) => {
      console.log('Error fetching quiz:', err.message);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  })
  // console.log(data);


  const { mutate, isLoading: LoadingMutation } = useMutation({
    mutationFn: (data) => sendQuizAns(data),
    onSuccess: (response) => {
      console.log(response);
      toast.success("تم ارسال الاجابات بنجاح");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setQuizTime(data.data.Duration);
      setQuizTitle(data.data.title);
      const initializedQuestions = data?.data?.Questions?.map(question => ({
        ...question,
        selectedAnswer: ""
      }));
      setAllQuestions(initializedQuestions);
    }

  }, [data]);


  const handleSelectAns = (value, questionIndex) => {
    const updatedQuestions = [...allQuestions];
    updatedQuestions[questionIndex].selectedAnswer = value;
    // console.log(updatedQuestions);
    // setAllQuestions(updatedQuestions);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(allQuestions.length / questionsPerPage) - 1) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setCurrentPage(currentPage - 1);
    }
  };
  const allQuestionsAnswered = () => {
    return allQuestions.every(question => question.selectedAnswer !== "")
  };
  let countdownInterval;
  useEffect(() => {
    let countdownInterval;
    if (isStarted) {
      let totalMinutes = quizTime - 1;
      let totalSeconds = 60;
      countdownInterval = setInterval(() => {
        setLeftTime(`${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`);
        totalSeconds--;

        if (totalSeconds < 0) {
          totalMinutes--;
          totalSeconds = 59;
        }

        if (totalMinutes < 0) {
          clearInterval(countdownInterval);
          saveDataAndRedirect();
        }
      }, 1000);

      return () => clearInterval(countdownInterval); // Cleanup on component unmount or restart
    }
  }, [isStarted, quizTime]);

  const startQuiz = () => {
    // startCountdown(quizTime)
    setIsStarted(true)
  }


  const handleShowAlert = () => {
    setShowAlertSubmit(!ShowAlertSubmit)
  }
  const saveDataAndRedirect = () => {
    clearInterval(countdownInterval);
    setShowAlertSubmit(false)
    setIsQuizEnd(true)
    let studentAnswers = []

    allQuestions?.map((question) => {
      question?.Answers.map((ans) => {
        if (ans.title == question.selectedAnswer) {
          studentAnswers.push({ questionId: question?.id, answerId: ans.id })
        }
      })
    })
    const postQuiz = {
      courseId: courseId,
      quizId: data?.data?.id,
      answers: studentAnswers
    }
    mutate(postQuiz)
    // setQuizDataPost(postQuiz)
    console.log(postQuiz);

    const AllQuizeData = {
      title: quizTitle,
      questions: allQuestions
    }
    sessionStorage.setItem("quizData", JSON.stringify(AllQuizeData))
    setTimeout(() => {
      // console.log(JSON.parse(sessionStorage.getItem("quizData")));
      // navigate('/courses/review/:examId', { replace: false });
    }, 500);
  }

  const handleNavigate = () => {
    navigate(`/courses/${courseId}`, { replace: false });
  }

  return (
    <div className="py-0">
      <div className="container  bg-brand-100 flex items-center justify-center mx-auto py-8" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {!isLoading && error && <Stack justifyContent="center" alignItems="center" rowGap={4}>
          <h1 className='text-4xl'>{error.message}</h1>
          <Button variant='contained' sx={{ fontSize: "26px" }} onClick={handleNavigate}>
            العودة للصفحة الرئيسية
          </Button>
        </Stack>
        }
        {isLoading && !error && <Stack justifyContent="center" alignItems="center" rowGap={4}>
          <h1 className='text-4xl'>جاري التحميل</h1>
          <CircularProgress />
        </Stack>
        }
        {!isLoading && !error &&
          <div className='h-full w-full '>
            <AnimatePresence>
              {!isStarted &&
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex items-center justify-center flex-col'>
                  <Typography variant='h2' sx={{ fontWeight: "bold", padding: "1rem 0", margin: "1rem 0" }}>{quizTitle}</Typography>
                  <Typography variant='h2' sx={{ fontWeight: "semibold", padding: "1rem 0", margin: "1rem 0" }} >وقت الامتحان <span className='text-brand-500 font-extrabold' > {quizTime} </span>دقيقة </Typography>
                  <p className="bg-brand-600  text-white m-14 text-5xl cursor-pointer hover:bg-brand-800 py-4 px-20  text-center  rounded-md"
                    onClick={startQuiz}
                  >
                    ابدأ
                  </p>
                </motion.div>
              }
            </AnimatePresence>
            <AnimatePresence>

              {isStarted && !isQuizEnd && <motion.form
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-2">
                <div className='flex items-center rounded-lg justify-between sticky top-[8.5rem] bg-brand-400 text-white z-10 px-8'>
                  <Typography variant='h3' sx={{ fontWeight: "bold", padding: "1rem 0", margin: "1rem 0" }}>اختبار الرياضيات</Typography>
                  <Typography variant='h4' className="text-2xl p-4 font-bold flex items-center gap-8">الوقت المتبقي<span className='bg-brand-600 text-white m-0 py-2  block  w-fit text-center  px-6 rounded-md'>{leftTime}</span> دقيقة</Typography>
                </div>
                {allQuestions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map((question, index) => (
                  <Question
                    key={question.id}
                    question={question}
                    index={index}
                    handleSelectAns={handleSelectAns}
                    currentPage={currentPage}
                    questionsPerPage={questionsPerPage}
                  />
                ))}
                <div className="flex justify-between mt-4 mx-16">
                  <Button
                    variant="contained"
                    color="primary"
                    className='bg-orange-600'
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                  >
                    السابق
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={currentPage >= Math.ceil(allQuestions.length / questionsPerPage) - 1}
                  >
                    التالي
                  </Button>
                </div>
                {currentPage >= Math.ceil(allQuestions.length / questionsPerPage) - 1 && (
                  <div className='text-center'>

                    {!allQuestionsAnswered() && <p className="font-bold text-red-600 text-4xl my-4" >برجاء الاجابة علي جميع الاسئلة</p>}
                    <Button
                      variant="contained"
                      disabled={!allQuestionsAnswered()}
                      sx={{ fontSize: "2rem", width: "100%", marginTop: "1rem", fontWeight: "bold" }}
                      onClick={handleShowAlert}
                    >
                      إرسال
                    </Button>
                  </div>
                )}
              </motion.form>
              }
              {isQuizEnd &&
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className='text-center p-20 '
                >
                  <Typography variant='h2' sx={{ fontWeight: "bold", padding: "1rem 0", margin: "1rem 0" }}>⭐ تهانينا ⭐</Typography>
                  <Typography variant='h2' sx={{ fontWeight: "bold", padding: "1rem 0", margin: "1rem 0" }}>تم حفظ الامتحان بنجاح</Typography>
                  <Typography variant='h2' sx={{ fontWeight: "bold", padding: "1rem 0", margin: "1rem 0" }}>
                    <Link to={`/courses/quiz/quizReview/${quizTitle}`}>
                      راجع اجاباتك
                    </Link>
                  </Typography>
                  <Typography variant='h2' sx={{ fontWeight: "bold", padding: "1rem 0", margin: "1rem 0" }}>
                    <Link to={`/courses/${courseId}`}>
                      العود الي الدروس
                    </Link>
                  </Typography>
                </motion.div>
              }
              {ShowAlertSubmit &&
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, type: 'spring', damping: 10 }}
                  className='fixed-center-center container  bg-white text-black h-80  w-1/2 rounded-lg p-4'>
                  <Stack sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                    direction="column" spacing={2}>
                    <Typography variant='h3' sx={{ margin: "3rem 0" }} className='font-bold text-center'>مازال لديك وقت هل انت متأكد من ارسال الاجابات و إنهاء الامتحان ؟</Typography>
                    <Stack
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                      <Button
                        onClick={handleShowAlert}
                        sx={{ fontSize: 20, padding: "0.5rem 1rem" }} size='large' color='info' variant="contained">العودة الي الاسئلة</Button>
                      <Button
                        onClick={saveDataAndRedirect}
                        sx={{ fontSize: 20, padding: "0.5rem 1rem", color: "white" }} size='large' color='warning' variant="contained"
                        endIcon={<SendIcon sx={{ margin: "0 1rem", rotate: "-180deg" }} />}>ارسال</Button>
                    </Stack>
                  </Stack>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        }

      </div>
    </div>

  );
};

export default Exam;
