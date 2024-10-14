import axios from "axios";
const base_url = "http://localhost:3000";

export const getAllCourses = async (requiredPath) => {
  try {
    const response = await axios.get(`${base_url}/user/courses/${requiredPath}`);
    return response// return only the data par
  } catch (error) {

    console.error("Error fetching courses:", error);
    throw error; // throw error to be handled later
  }
};

export const getCourseDetails = async (courseId) => {
  try {
    const details = await axios.get(`${base_url}/user/courses/details/${courseId}`)
    return details
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getAllLevels = async () => {
  try {
    const levels = await axios.get(`${base_url}/user/levels`)
    return levels
  } catch (error) {
    console.log(error);
    return error
  }
}


export const GetSectionQuiz = async (sectionId) => {
  try {
    const quiz = await axios.get(`${base_url}/student/quiz/questions/section/${sectionId}`)
    return quiz
  } catch (error) {
    console.log(error)
  }

}



export const sendQuizAns = async (quizData) => {
  try {
    const postQuiz = await axios.post(`${base_url}/student/quiz/take-quiz`, quizData, { withCredentials: true })
    return postQuiz
  } catch (error) {
    console.log(error);
  }
}

