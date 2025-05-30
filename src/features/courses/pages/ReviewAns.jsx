import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { Box, Button, Container, Skeleton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewAns = () => {
  const [totalMark, setTotalMarks] = useState(0)
  const [marks, setMarks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [quizTitle, setQuizTitle] = useState("")
  const [isHaveQuiz, setIsHaveQuiz] = useState(false)
  const navigate = useNavigate();


  const [reveiwQuestions, setReveiwQuestions] = useState([])
  useEffect(() => {

    const stored = sessionStorage.getItem("quizData");
    if (stored) {
      setIsHaveQuiz(true)
      const parsedQuestions = JSON.parse(stored);
      console.log(parsedQuestions);
      setReveiwQuestions(parsedQuestions.questions);
      setQuizTitle(parsedQuestions.title);
      let totalMarksTemp = 0;   // Temporary variables to store values
      let marksTemp = 0;
      parsedQuestions?.questions?.forEach((qu) => {
        totalMarksTemp += qu.mark;  // Assuming each question has a 'mark' property for total marks

        const correctAns = qu.Answers.find((ans) => ans.isCorrect).title;
        if (correctAns === qu.selectedAnswer) {
          marksTemp += qu.mark;   // Add to the score if the answer is correct
        }
      });

      // // Set state after the loop is done
      setTimeout(() => {
        setTotalMarks(totalMarksTemp);
        setMarks(marksTemp);
      }, 1000);
    }
    else {
      setIsHaveQuiz(false)
    }
    setLoading(false)

  }, [])

  const handleNavigate = () => {
    sessionStorage.removeItem("quizData")
    navigate("/courses", { replace: false });
  }
  return (
    <Container maxWidth="xl" className='bg-brand-200'>
      {loading &&
        <Skeleton sx={{ height: "96vh", width: "100%" }} />
      }

      {!isHaveQuiz &&
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='h-[80vh] bg-brand-100 flex items-center flex-col gap-8 justify-center'
        >
          <h1 className='text-6xl '>لا يوجد امتحانات لمرجعتها</h1>
          <Button variant='contained' sx={{ fontSize: "26px" }} onClick={handleNavigate}>
            العودة للصفحة الرئيسية
          </Button>
        </motion.div>
      }

      <AnimatePresence>
        {!loading && isHaveQuiz &&
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <Stack
                spacing={4} // Use a reasonable number for spacing between items
                direction="row"
                sx={{
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  position: "sticky",
                  top: "8.5rem",
                  color: "white",
                  borderRadius: "0.5rem",
                  zIndex: "100",
                }}
                className="mx-0 md:mx-10 lg:mx-20 px-20 bg-brand-600 text-white"
              >
                <Typography
                  sx={{
                    fontSize: 30,
                    display: "block",
                    paddingInlineStart: "3rem",
                    marginBottom: "1rem",
                  }}
                >
                  {quizTitle}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 30,
                    display: "block",
                    paddingInlineStart: "3rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span className="bg-brand-500 px-4 py-2 text-white rounded-lg">
                    {marks + "/" + totalMark}
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  color="red"
                  // size="large"
                  sx={{ margin: "0 2rem !important", display: "block", backgroundColor: "red", fontSize: "16px" }}
                  onClick={handleNavigate}
                >
                  انهاء
                </Button>
              </Stack>
            </motion.div>
            <Box className=''>
              {reveiwQuestions?.map((question, index) => {
                return (
                  <div key={question.id} className="mx-0 md:mx-10 lg:mx-20  px-20 mb-6 bg-white text-black rounded-lg py-14 " >
                    <FormLabel grid-cols-2 sx={{ fontSize: 26, display: "block", paddingInlineStart: "3rem", marginBottom: "1rem", color: "black" }}>
                      {index + 1} - {question.title}
                    </FormLabel>
                    <RadioGroup
                      value={question.selectedAnswer}
                      name={`q-${question.id}`}
                    >
                      {question.Answers.map((ans, idx) => (
                        <div
                          className={`ps-12 p-5 my-4 w-full rounded-2xl grid grid-cols-1 md:grid-cols-2
                      ${ans.isCorrect && "bg-green-700/90 text-white"}
                      ${ans.isCorrect && ans.title != question.selectedAnswer && "bg-green-700/90 text-white"}
                      ${!ans.isCorrect && ans.title == question.selectedAnswer && "bg-red-700/90 text-white"}
                      `}

                          key={idx}
                        >
                          <FormControlLabel
                            key={idx}
                            value={ans.title}
                            control={<Radio />}
                            label={ans.title}
                            // checked={ans.isCorrect}
                            sx={{
                              '& .MuiSvgIcon-root': { fontSize: 16 },
                              '& .MuiTypography-root': { fontSize: 20 },
                            }}
                          />
                          {ans.title === question.selectedAnswer && ans.isCorrect && (
                            <Typography sx={{ alignSelf: "center" }} variant='h4' >اجابتك صحيحة</Typography>
                          )}
                          {ans.title === question.selectedAnswer && !ans.isCorrect && (
                            <Typography sx={{ alignSelf: "center" }} variant='h4' >اجابة خاطئة</Typography>
                          )}
                          {ans.title !== question.selectedAnswer && ans.isCorrect && (
                            <Typography sx={{ alignSelf: "center" }} variant='h4' >الاجابة الصحيحة</Typography>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                    {!question.selectedAnswer &&
                      <Typography variant='h4' color='red' sx={{ fontWeight: "bold" }} >لم تجاوب علي هذا السؤال</Typography>
                    }
                  </div>)
              })}
            </Box>
          </>
        }
      </AnimatePresence>



    </Container >
  )
}

export default ReviewAns