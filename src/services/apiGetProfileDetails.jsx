const API_URL = "http://localhost:3000";
//localhost:3000/api/user/current-user
export const getProfileData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/user/current-user`, {
      credentials: "include", // This allows cookies to be sent with the request
      headers: {
        "Content-Type": "application/json", // Set the content type
        // No Authorization header needed; the cookie will be sent automatically
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${
          response.statusText || "Something went wrong"
        }`
      );
    }

    const { data } = await response.json(); // Extract the data from the response
    console.log(data); // Log the data for debugging
    return data; // Return the profile data
  } catch (error) {
    console.error("Error fetching Profile data:", error);
    throw error; // Rethrow the error for further handling
  }
};
