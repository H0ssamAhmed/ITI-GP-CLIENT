import axios from "axios";
const base_url = "http://localhost:3000";

export const getAllCourses = async (requiredPath) => {
  try {
    const response = await axios.get(`${base_url}/user/courses/${requiredPath}`);
    return response// return only the data par
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(error);  // Specific handling for 404
    }
    throw new Error(error || "Failed to fetch quiz data");  // Handle other errors
  }

};

export const getCourseDetails = async (courseId) => {
  try {
    const details = await axios.get(`${base_url}/user/courses/details/${courseId}`)
    return details
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(error.response);  // Specific handling for 404
    }
    throw new Error(error.response || "Failed to fetch quiz data");  // Handle other errors
  }
}

export const getAllLevels = async () => {
  try {
    const levels = await axios.get(`${base_url}/user/levels`)
    return levels
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(error.response);  // Specific handling for 404
    }
    throw new Error(error.response || "Failed to fetch quiz data");  // Handle other errors

  }
}


export const GetSectionQuiz = async (sectionId) => {
  try {
    const quiz = await axios.get(`${base_url}/student/quiz/questions/section/${sectionId}`, { withCredentials: true })
    return quiz
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.response || "Failed to fetch quiz data");  // Other errors
  }
}



export const sendQuizAns = async (quizData) => {
  try {
    const postQuiz = await axios.post(`${base_url}/student/quiz/take-quiz`, quizData, { withCredentials: true })
    return postQuiz
  } catch (error) {
    throw new Error(error.response);
  }
}

