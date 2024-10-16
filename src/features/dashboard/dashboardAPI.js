import axios from "axios";
import { getCookie } from "../../helper/helper";

// NOTE - Teachers Related
// Fetch All Teachers.
export const fetchTeachers = async () => {
  const { data } = await axios.get("http://localhost:3000/admin/teachers");
  return data.data;
};

export const fetchTeacherLevel = async (teacherId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/admin/get-teacher-levels/${teacherId}`
    );
    return data.data;
  } catch (error) {
    throw new Error("لا توجد مستويات لهذا المدرس", error);
  }
};

// NOTE - Students Related
// Fetch All Student.
export const fetchStudents = async () => {
  const { data } = await axios.get(`http://localhost:3000/admin/students`);

  return data.data;
};

// Function to delete a user By Admin
export const deleteUser = async (userId) => {
  // const accessToken = getCookie("accessToken");

  try {
    const response = await axios.delete(
      `http://localhost:3000/admin/user/${userId}`,
      {
        // Passing the token with the request
        withCredentials: true,
      }
    );

    return response.data; // Return response data
  } catch (error) {
    // Handle error responses (e.g., 403 Forbidden, 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    } else if (error.response && error.response.status === 403) {
      throw new Error(
        "Forbidden. You do not have permission to delete this user."
      );
    } else if (error.response && error.response.status === 404) {
      throw new Error("User not found.");
    } else {
      console.error("Error deleting user:", error);
      throw new Error("User deletion failed.");
    }
  }
};

// Fetch user by id
export const fetchUserById = async (userId) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/user/${userId}`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch teacher data.", error);
  }
};

//!SECTION Level Related Requests
export const fetchAllLevels = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/levels/");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching levels:", error);
    throw error;
  }
};

export const fetchCoursesInLevel = async (levelId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/levels/courses/${levelId}`
    );

    return response.data || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createLevel = async (newLevelData) => {
  // const token = getCookie("accessToken");
  try {
    const response = await axios.post(
      `http://localhost:3000/admin/level`,
      newLevelData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLevel = async (levelId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/admin/level/${levelId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//!SECTION Get all Anouncments
export const fetchAllAnnouncements = async () => {
  try {
    const response =
      (await axios.get("http://localhost:3000/user/events/")) || [];
    if (response.data.error) {
      // Throwing an error with the message from the backend
      throw new Error(response.data.error);
    }
    return response.data || [];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw new Error(error.message || "Failed to fetch announcements");
  }
};
export const createAnnouncements = async (newData) => {
  try {
    return axios.post("http://localhost:3000/admin/event/", newData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Pending Requests by Admin

// 1 - Fetch All Requests
export const fetchAllPendingRequests = async () => {
  try {
    // const token = getCookie("accessToken");
    const response = await axios.get(
      "http://localhost:3000/admin/pending-teachers-courses",
      {
        headers: {
          // Authorization: `Bearer ${token}`, // Add Bearer token here
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Requests:", error);
    throw error;
  }
};

// Delete Pending Requests
// DELETE Teacher Request
export const deleteTeacherById = async (teacherId) => {
  // const token = getCookie("accessToken");

  return axios.delete(
    `http://localhost:3000/admin/delete-pending-teacher/${teacherId}`,
    {
      withCredentials: true,
    }
  );
};

// DELETE Course Request
export const deleteCourseById = async (courseId) => {
  // const token = getCookie("accessToken");

  return axios.delete(
    `http://localhost:3000/admin/pending-course/${courseId}`,
    {
      withCredentials: true,
    }
  );
};

// VERIFY Requests
// VERIFY Teacher Request
export const verifyTeacherById = async (teacherId) => {
  // const token = getCookie("accessToken");

  return axios.patch(
    `http://localhost:3000/admin/verify-teacher/${teacherId}`,
    {}, // The request body can be empty or contain data as needed
    {
      withCredentials: true,
    }
  );
};

// VERIFY Course Request
export const verifyCourseById = async (courseId) => {
  // const token = getCookie("accessToken");

  return axios.patch(
    `http://localhost:3000/admin/verify-course/${courseId}`,
    {}, // The request body can be empty or contain data as needed
    {
      headers: {
        // Authorization: `Bearer ${token}`, // Include the token in the header
      },
      withCredentials: true,
    }
  );
};

// Get All Courses
export const fetchAllCourses = async () => {
  const response = await axios.get(
    "http://localhost:3000/user/courses/all-courses"
  );

  return response.data;
};

// Delete Course
export const deleteCourseId = async (courseId) => {
  const token = getCookie("accessToken");

  return axios.delete(`http://localhost:3000/teacher/course/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
};

// Create Courses
export const createCourse = async (courseData) => {
  try {
    // const token = getCookie("accessToken");
    // console.log(token);
    const response = await axios.post(
      "http://localhost:3000/teacher/course",
      courseData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Add this line
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error;
    } else {
      console.error(error);
      throw new Error("حدث خطأ");
    }
  }
};

export const fetchAllTeacherCourses = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/courses/teacher-courses`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const FetchTeacherSections = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/courses/teacher-sections`,
      { withCredentials: true }
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const currentUser = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/current");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const createQuiz = async (quizData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/teacher/quiz",
      quizData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
