const API_URL = 'http://localhost:3000';
//localhost:3000/api/user/current-user
export const getProfileData = async () => {
  try {
    //const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjUzZTgxLWIyZmMtNDNkZC04NGEyLWU4N2U4ODRmYWZjMSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzI4Mjk5ODQyLCJleHAiOjE3MjgzMDM0NDJ9.ZW0noIPzhpAHYJO77EJ5XNKA32nFTBt2dknnn8oY4Ik';
    const response = await fetch(`${API_URL}/api/user/current-user`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${
          response.message || 'Something went wrong'
        }`
      );
    }
    const { data } = await response.json();
    // const data = await response.json();
    // const token = data.token;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching Profile data:', error);
    throw error;
  }
};
