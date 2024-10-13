import axios from "axios";
const base_url = "http://localhost:3000/user/courses";

export const getAllCourses = async (requiredPath) => {
  try {
    const response = await axios.get(`${base_url}/${requiredPath}`);
    return response.data; // return only the data part
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // throw error to be handled later
  }
};

export const getCourseDetails = async (courseId) => {

  try {
    const details = await axios.get(`${base_url}/details/${courseId}`)

    return details
  } catch (error) {
    console.log(error);
    return error
  }
}

export const getAllLevels = async () => {
  try {
    const levels = await axios.get(`${base_url}/level`)
    return levels
  } catch (error) {
    console.log(error);
    return error
  }
}
