import axios from "axios";
import { getCookie } from "../../helper/helper";

// Fetch All Teachers.
export const fetchTeachers = async () => {
  const { data } = await axios.get(
    "http://localhost:3000/api/admin/get-teachers"
  );
  return data.data;
};

// Fetch All Student.
export const fetchStudents = async () => {
  const { data } = await axios.get(
    `http://localhost:3000/api/admin/get-students`
  );

  return data.data;
};

// Function to delete a user By Admin
export const deleteUser = async (userId) => {
  const accessToken = getCookie("access-token");

  // Check if the token exists
  if (!accessToken) {
    throw new Error(
      "عذرًا، لا تملك الصلاحيات اللازمة. يرجى إعادة تسجيل الدخول."
    );
  }

  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/delete-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Pass the token in the header
        },

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
    const { data } = await axios.get(
      `http://localhost:3000/api/user/${userId}`
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch teacher data.", error);
  }
};
