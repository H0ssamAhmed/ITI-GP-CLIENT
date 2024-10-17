import axios from "axios";

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

export const fetchStudents = async () => {
  const { data } = await axios.get(`http://localhost:3000/admin/students`);

  return data.data;
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/user/${userId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
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

export const fetchAllLevels = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/levels");
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
  try {
    const response = await axios.post(
      `http://localhost:3000/admin/level`,
      newLevelData,
      {
        headers: {
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

export const fetchAllAnnouncements = async () => {
  try {
    const response = await axios.get("http://localhost:3000/user/events/");
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw new Error("Failed to fetch announcements");
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

export const fetchAllPendingRequests = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/admin/pending-teachers-courses",
      {
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
  return axios.delete(
    `http://localhost:3000/admin/pending-teacher/${teacherId}`,
    {
      withCredentials: true,
    }
  );
};

export const deleteCourseById = async (courseId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/admin/pending-course/${courseId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Error deleting course");
    } else {
      console.error("Error:", error.message);
      throw new Error("An error occurred while deleting the course");
    }
  }
};

export const verifyTeacherById = async (teacherId) => {
  return axios.patch(
    `http://localhost:3000/admin/verify-teacher/${teacherId}`,
    {},
    {
      withCredentials: true,
    }
  );
};

// VERIFY Course Request
export const verifyCourseById = async (courseId) => {
  return axios.patch(
    `http://localhost:3000/admin/verify-course/${courseId}`,
    {}, // The request body can be empty or contain data as needed
    {
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
  return axios.delete(`http://localhost:3000/teacher/course/${courseId}`, {
    withCredentials: true,
  });
};

// Create Course
export const createCourse = async (courseData) => {
  try {
    const formData = new FormData();

    // Append non-file fields
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("price", courseData.price);
    formData.append("discountedPrice", courseData.discountedPrice);
    formData.append("levelId", courseData.levelId);

    // Append the image file separately
    if (courseData.image) {
      formData.append("image", courseData.image);
    }

    // Handle nested sections and lessons
    courseData.sections.forEach((section, sectionIndex) => {
      formData.append(`sections[${sectionIndex}][title]`, section.title);
    });

    const response = await axios.post(
      "http://localhost:3000/teacher/course/with-sections",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error;
    } else {
      console.error(error);
      throw new Error("An error occurred");
    }
  }
};

export const createLesson = async (lessonData, sectionId) => {
  try {
    const formData = new FormData();

    formData.append("title", lessonData.title);
    formData.append("description", lessonData.description);
    if (lessonData.pdfFile) {
      formData.append("pdfFile", lessonData.pdfFile);
    }
    if (lessonData.videoFile) {
      formData.append("videoFile", lessonData.videoFile);
    }

    const response = await axios.post(
      `http://localhost:3000/teacher/course/section/lesson/${sectionId}`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error;
    } else {
      console.error(error);
      throw new Error("An error occurred");
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

export const getTeacherCoursesById = async (teacherId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/courses/teacher-courses/${teacherId}`
    );

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getTeacherCourses = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/courses/teacher-courses`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getCourseDetails = async (courseId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/courses/details/${courseId}`
    );
console.log('course details',response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

// Update Course
export const updateCourse = async (courseId, updatedCourse) => {
  console.log("Updated Course:", updatedCourse);
  
  const formData = new FormData();
  console.log(updatedCourse);
  console.log(courseId);

  // Append regular fields
  formData.append("title", updatedCourse.title);
  formData.append("description", updatedCourse.description);
  formData.append("price", +updatedCourse.price);
  formData.append("levelTitle", updatedCourse.levelTitle);
  formData.append("teacherName", updatedCourse.teacherName);
  formData.append('levelId', updatedCourse.levelId);
  formData.append("discountedPrice", +updatedCourse.discountedPrice);
  updatedCourse.sections.forEach((section, sectionIndex) => {
    formData.append(`section[${sectionIndex}][title]`, section.title);

    if (section.id) {
      formData.append(`section[${sectionIndex}][id]`, section.id);
    }

    if (section.lessons) {
      section.lessons.forEach((lesson, lessonIndex) => {
        formData.append(
          `section[${sectionIndex}][lessons][${lessonIndex}][title]`,
          lesson.title
        );
        formData.append(
          `section[${sectionIndex}][lessons][${lessonIndex}][description]`,
          lesson.description || ""
        );
      });
    }
  });

  // Handle file attachments (image, pdf, video)
  if (updatedCourse.image) {
    formData.append("image", updatedCourse.image);
  }

  // Log formData contents for debugging
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await axios.patch(
      `http://localhost:3000/teacher/course/${courseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const coursesErolledByStudents = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/student/course/enrolled/courses",
      {
        withCredentials: true,
      }
    );

    return response.data || [];
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const courseEnrolledByStudent = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/student/course/enrolled/courses",
      {
        withCredentials: true,
      }
    );

    return response.data || [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("لايوجد كورسات");
    }
  }
};
