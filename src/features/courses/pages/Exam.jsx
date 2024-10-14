import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Divider, Skeleton } from '@mui/material';
import Question from '../components/Question';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetSectionQuiz, sendQuizAns } from '../apis/coursesApi.js';
import { useMutation, useQuery } from '@tanstack/react-query';


const getQuiz = async (sectionId) => {
  try {
    const quiz = await GetSectionQuiz(sectionId)
    return quiz
  } catch (error) {
    console.log(error);

  }
}

const SubmitQuiz = async (payload) => {
  try {
    const response = await sendQuizAns(payload)
  } catch (error) {
    console.log(error);

  }
}
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
  const { data, isLoading, error } = useQuery({ queryKey: ['courseDetaials'], queryFn: () => getQuiz(quizId) })
  const navigate = useNavigate();
  const [QuizDataPost, setQuizDataPost] = useState()

  const mutation = useMutation({
    mutationFn: (data) => SubmitQuiz(data)
  })
  // Initialize questions
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
    const selectedAnswers = allQuestions?.map((question) => {
      question?.Answers.map((ans) => {
        if (ans.title == question.selectedAnswer) {
          studentAnswers.push({ questionId: question?.id, answerId: ans.id })
        }
      })
    })
    const postQuiz = {
      studentId: "id for students",
      courseId: courseId,
      quizId: quizId,
      answers: studentAnswers
    }
    mutation.mutate(postQuiz)
    // setQuizDataPost(postQuiz)
    // console.log(postQuiz);

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


  return (
    <div className="py-0">
      <div className="container  bg-brand-100 flex items-center justify-center mx-auto py-8" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {!isLoading && error && <Stack justifyContent="center" alignItems="center" rowGap={4}>
          <h1 className='text-4xl'>حدث خطء غير متوقع </h1>
          <p>برجاء التواصل مع احد المشرفين</p>
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

const questions = [
  {
    id: 1,
    questionTitle: "ما هو أسرع طائر في العالم؟",
    mark: 1,
    answers: [{ title: "الصقر", isCorrect: true }, { title: "العقاب", isCorrect: false }, { title: "النعامة", isCorrect: false }, { title: "الحمام", isCorrect: false }

    ]
  },
  {
    id: 2,
    questionTitle: "ما هو الحيوان الذي ينام واقفاً؟",
    mark: 1,
    answers: [{ title: "الحصان", isCorrect: true }, { title: "البقرة", isCorrect: false }, { title: "الزرافة", isCorrect: false }, { title: "الغزال", isCorrect: false }]
  },
  {
    id: 3,
    questionTitle: "ما هي الدولة التي اخترعت الإنترنت؟",
    mark: 1,
    answers: [{ title: "الولايات المتحدة الأمريكية", isCorrect: true }, { title: "الصين", isCorrect: false }, { title: "اليابان", isCorrect: false }, { title: "ألمانيا", isCorrect: false }]
  },
  {
    id: 4,
    questionTitle: "ما هو أكبر نهر في العالم؟",
    mark: 1,
    answers: [{ title: "نهر الأمازون", isCorrect: true }, { title: "نهر النيل", isCorrect: false }, { title: "نهر المسيسيبي", isCorrect: false }, { title: "نهر الغانج", isCorrect: false }]
  },
  {
    id: 5,
    questionTitle: "ما هي أول دولة عربية نالت استقلالها؟",
    mark: 1,
    answers: [{ title: "مصر", isCorrect: true }, { title: "السعودية", isCorrect: false }, { title: "المغرب", isCorrect: false }, { title: "العراق", isCorrect: false }

    ]
  },
  {
    id: 6,
    questionTitle: "من هو مؤسس علم الجبر؟",
    mark: 1,
    answers: [{ title: "الخوارزمي", isCorrect: true }, { title: "ابن سينا", isCorrect: false }, { title: "أينشتاين", isCorrect: false }, { title: "إسحاق نيوتن", isCorrect: false }]
  },
  {
    id: 7,
    questionTitle: "ما هو أطول برج في العالم؟",
    mark: 1,
    answers: [{ title: "برج خليفة", isCorrect: true }, { title: "برج إيفل", isCorrect: false }, { title: "برج الساعة", isCorrect: false }, { title: "برج شنغهاي", isCorrect: false }]
  },
  {
    id: 8,
    questionTitle: "كم عدد قارات العالم؟",
    mark: 1,
    answers: [{ title: "7", isCorrect: true }, { title: "6", isCorrect: false }, { title: "5", isCorrect: false }, { title: "8", isCorrect: false }

    ]
  },
  {
    id: 9,
    questionTitle: "ما هو الحيوان الذي يملك أطول فترة حمل؟",
    mark: 1,
    answers: [{ title: "الفيل", isCorrect: true }, { title: "الزرافة", isCorrect: false }, { title: "الحوت", isCorrect: false }, { title: "الحصان", isCorrect: false }

    ]
  },
  {
    id: 10,
    questionTitle: "من هو أول رئيس للولايات المتحدة؟",
    mark: 1,
    answers: [{ title: "جورج واشنطن", isCorrect: true }, { title: "أبراهام لينكولن", isCorrect: false }, { title: "توماس جيفرسون", isCorrect: false }, { title: "جون آدمز", isCorrect: false }]
  },
  {
    id: 11,
    questionTitle: "ما هو أول عنصر في الجدول الدوري؟",
    mark: 1,
    answers: [{ title: "الهيدروجين", isCorrect: true }, { title: "الأكسجين", isCorrect: false }, { title: "النيتروجين", isCorrect: false }, { title: "الكربون", isCorrect: false }]
  },
  {
    id: 12,
    questionTitle: "ما هو البحر الذي يفصل بين أوروبا وأفريقيا؟",
    mark: 1,
    answers: [{ title: "البحر الأبيض المتوسط", isCorrect: true }, { title: "البحر الأحمر", isCorrect: false }, { title: "البحر الأسود", isCorrect: false }, { title: "بحر العرب", isCorrect: false }]
  },
  {
    id: 13,
    questionTitle: "ما هي أكبر صحراء في العالم؟",
    mark: 1,
    answers: [{ title: "الصحراء الكبرى", isCorrect: true }, { title: "صحراء جوبي", isCorrect: false }, { title: "صحراء أتاكاما", isCorrect: false }, { title: "صحراء ثار", isCorrect: false }]
  },
  {
    id: 14,
    questionTitle: "من هو الفيلسوف الذي شرب السم؟",
    mark: 1,
    answers: [{ title: "سقراط", isCorrect: true }, { title: "أفلاطون", isCorrect: false }, { title: "أرسطو", isCorrect: false }, { title: "ديكارت", isCorrect: false }

    ]
  },
  {
    id: 15,
    questionTitle: "ما هو الحيوان الذي لا يملك أحبال صوتية؟",
    mark: 1,
    answers: [{ title: "الزرافة", isCorrect: true }, { title: "التمساح", isCorrect: false }, { title: "الفيل", isCorrect: false }, { title: "النمر", isCorrect: false }

    ]
  },
  {
    id: 16,
    questionTitle: "ما هو أسرع الأسماك في السباحة؟",
    mark: 1,
    answers: [{ title: "سمك أبو شراع", isCorrect: true }, { title: "التونة", isCorrect: false }, { title: "القرش", isCorrect: false }, { title: "الدلفين", isCorrect: false }]
  },
  {
    id: 17,
    questionTitle: "من هو أول رجل صعد إلى القمر؟",
    mark: 1,
    answers: [{ title: "نيل أرمسترونغ", isCorrect: true }, { title: "باز ألدرين", isCorrect: false }, { title: "مايكل كولينز", isCorrect: false }, { title: "يوري غاغارين", isCorrect: false }]
  },
  {
    id: 18,
    questionTitle: "من هو مؤلف رواية 'الحرب والسلام'؟",
    mark: 1,
    answers: [{ title: "ليو تولستوي", isCorrect: true }, { title: "فيودور دوستويفسكي", isCorrect: false }, { title: "إرنست همنغواي", isCorrect: false }, { title: "فرانز كافكا", isCorrect: false }]
  },
  {
    id: 19,
    questionTitle: "ما هي أكبر بحيرة في العالم؟",
    mark: 1,
    answers: [{ title: "بحر قزوين", isCorrect: true }, { title: "بحيرة سوبيريور", isCorrect: false }, { title: "بحيرة فيكتوريا", isCorrect: false }, { title: "بحيرة بايكال", isCorrect: false }]
  },
  {
    id: 20,
    questionTitle: "من هو مؤسس علم الكيمياء؟",
    mark: 1,
    answers: [{ title: "جابر بن حيان", isCorrect: true }, { title: "ابن سينا", isCorrect: false }, { title: "ابن رشد", isCorrect: false }, { title: "الرازي", isCorrect: false }]
  },
  {
    id: 21,
    questionTitle: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    mark: 1,
    answers: [{ title: "زحل", isCorrect: false }, { title: "الأرض", isCorrect: false },
    { title: "المشتري", isCorrect: true },
    { title: "المريخ", isCorrect: false }
    ]
  },
  {
    id: 22,
    questionTitle: "ما هي عاصمة اليابان؟",
    mark: 1,
    answers: [{ title: "طوكيو", isCorrect: true }, { title: "أوساكا", isCorrect: false },
    { title: "كيوتو", isCorrect: false },
    { title: "ناغويا", isCorrect: false }
    ]
  },
  {
    id: 23,
    questionTitle: "ما هو العنصر الذي يرمز له بالرمز 'O'؟",
    mark: 1,
    answers: [{ title: "الأكسجين", isCorrect: true }, { title: "النيتروجين", isCorrect: false },
    { title: "الهيدروجين", isCorrect: false },
    { title: "الهيليوم", isCorrect: false }
    ]
  },














  {
    id: 24,
    questionTitle: "ما هي العملة الرسمية للمملكة المتحدة؟",
    mark: 1,
    answers: [{ title: "الجنيه الإسترليني", isCorrect: true }, { title: "اليورو", isCorrect: false },
    { title: "الدولار الأمريكي", isCorrect: false },
    { title: "الين الياباني", isCorrect: false }
    ]
  },
  {
    id: 25,
    questionTitle: "ما هو الحيوان الذي يطلق عليه 'ملك الغابة'؟",
    mark: 1,
    answers: [{ title: "الأسد", isCorrect: true }, { title: "النمر", isCorrect: false },
    { title: "الفيل", isCorrect: false },
    { title: "الدب", isCorrect: false }
    ]
  },
  {
    id: 26,
    questionTitle: "ما هو البحر الذي يقع بين السعودية ومصر؟",
    mark: 1,
    answers: [{ title: "البحر الأحمر", isCorrect: true }, { title: "البحر الأبيض المتوسط", isCorrect: false },
    { title: "البحر الأسود", isCorrect: false },
    { title: "بحر العرب", isCorrect: false }
    ]
  },
  {
    id: 27,
    questionTitle: "من هو العالم الذي اكتشف الجاذبية؟",
    mark: 1,
    answers: [{ title: "إسحاق نيوتن", isCorrect: true }, { title: "أينشتاين", isCorrect: false },
    { title: "غاليليو", isCorrect: false },
    { title: "أرسطو", isCorrect: false }
    ]
  },
  // {
  //   id: 28,
  //   questionTitle: "ما هي اللغة الرسمية للبرازيل؟",
  //   mark: 1,
  //   answers: [{ title: "البرتغالية", isCorrect: true }, { title: "الإسبانية", isCorrect: false },
  //   { title: "الفرنسية", isCorrect: false },
  //   { title: "الإنجليزية", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 29,
  //   questionTitle: "ما هو الطائر الذي لا يستطيع الطيران؟",
  //   mark: 1,
  //   answers: [{ title: "النعامة", isCorrect: true }, { title: "العصفور", isCorrect: false },
  //   { title: "الصقر", isCorrect: false },
  //   { title: "الغراب", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 30,
  //   questionTitle: "ما هو الحيوان الذي يسمى بـ 'سفينة الصحراء'؟",
  //   mark: 1,
  //   answers: [{ title: "الجمل", isCorrect: true }, { title: "الحصان", isCorrect: false },
  //   { title: "الفيل", isCorrect: false },
  //   { title: "الزرافة", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 31,
  //   questionTitle: "ما هي الدولة الأكبر مساحة في العالم؟",
  //   mark: 1,
  //   answers: [{ title: "روسيا", isCorrect: true }, { title: "الصين", isCorrect: false },
  //   { title: "الولايات المتحدة الأمريكية", isCorrect: false },
  //   { title: "كندا", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 32,
  //   questionTitle: "ما هو المعدن الذي يعتبر الأكثر وفرة في القشرة الأرضية؟",
  //   mark: 1,
  //   answers: [{ title: "الألومنيوم", isCorrect: true }, { title: "الحديد", isCorrect: false },
  //   { title: "النحاس", isCorrect: false },
  //   { title: "الذهب", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 33,
  //   questionTitle: "من هو مخترع الهاتف؟",
  //   mark: 1,
  //   answers: [{ title: "ألكسندر غراهام بيل", isCorrect: true }, { title: "توماس إديسون", isCorrect: false },
  //   { title: "نيكولا تيسلا", isCorrect: false },
  //   { title: "ألبرت أينشتاين", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 34,
  //   questionTitle: "ما هي الدولة التي تُعرف بـ 'أرض الشمس المشرقة'؟",
  //   mark: 1,
  //   answers: [{ title: "اليابان", isCorrect: true }, { title: "الصين", isCorrect: false },
  //   { title: "الهند", isCorrect: false },
  //   { title: "كوريا الجنوبية", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 35,
  //   questionTitle: "ما هي المدينة المعروفة بـ 'مدينة الرياح'؟",
  //   mark: 1,
  //   answers: [{ title: "شيكاغو", isCorrect: true }, { title: "نيويورك", isCorrect: false },
  //   { title: "لندن", isCorrect: false },
  //   { title: "باريس", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 36,
  //   questionTitle: "ما هو العضو الأكبر في جسم الإنسان؟",
  //   mark: 1,
  //   answers: [{ title: "الجلد", isCorrect: true }, { title: "الكبد", isCorrect: false },
  //   { title: "الدماغ", isCorrect: false },
  //   { title: "القلب", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 37,
  //   questionTitle: "ما هو الغاز الذي يشكل حوالي 78% من الغلاف الجوي؟",
  //   mark: 1,
  //   answers: [{ title: "النيتروجين", isCorrect: true }, { title: "الأكسجين", isCorrect: false },
  //   { title: "ثاني أكسيد الكربون", isCorrect: false },
  //   { title: "الأرجون", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 38,
  //   questionTitle: "من هو مؤلف كتاب 'رحلة ابن بطوطة'؟",
  //   mark: 1,
  //   answers: [{ title: "ابن بطوطة", isCorrect: true }, { title: "ابن رشد", isCorrect: false },
  //   { title: "ابن سينا", isCorrect: false },
  //   { title: "ابن خلدون", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 39,
  //   questionTitle: "ما هو الحيوان الذي يمتلك ثلاثة قلوب؟",
  //   mark: 1,
  //   answers: [{ title: "الأخطبوط", isCorrect: true }, { title: "التمساح", isCorrect: false },
  //   { title: "الحوت", isCorrect: false },
  //   { title: "السمكة الذهبية", isCorrect: false }
  //   ]
  // },
  // {
  //   id: 40,
  //   questionTitle: "ما هو العضو المسؤول عن إنتاج الأنسولين في الجسم؟",
  //   mark: 1,
  //   answers: [{ title: "البنكرياس", isCorrect: true }, { title: "الكبد", isCorrect: false },
  //   { title: "القلب", isCorrect: false },
  //   { title: "الكلى", isCorrect: false }
  //   ]
  // }
];