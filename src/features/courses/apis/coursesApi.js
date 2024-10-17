import axios from "axios";
const base_url = "https://e-learning-system-iti-production.up.railway.app";

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
    const postQuiz = await axios.post(`${base_url}/student/quiz/take-quiz`, quizData, { withCredentials: true });
    return postQuiz;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

export const getCurrentUserCourses = async () => {
  try {
    const currentUserCourses = await axios.get(`${base_url}/student/course/enrolled/courses`, { withCredentials: true })
    return currentUserCourses
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error(error);
    }
    throw new Error(error.response || "Failed to fetch current Courses");  // Other errors
  }
}

export const buyACourse = async (courseId, studentId,) => {
  try {
    // Define the request body with the required parameters
    const requestBody = {
      courseId: courseId,
      studentId: studentId,
    };

    // Make the POST request with the requestBody
    const response = await axios.post(`${base_url}/student/course/buy-course`, requestBody, {
      withCredentials: true,
    });

    // Handle the response if needed
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error buying course:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const giveRate = async (rate) => {
  try {
    // const requestBody = {
    //   rate: value,
    //   comment: "comment",
    //   courseId: _courseId,
    //   studentId: _studentId,
    // }

    const response = await axios.post(`${base_url}/student/review`, rate, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error rating course:", error);
    throw error; // Re-throw the error for further handling
  }
}