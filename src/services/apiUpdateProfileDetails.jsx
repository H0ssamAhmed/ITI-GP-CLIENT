const API_URL = 'http://localhost:3000';
export const updateProfileData = async (data) => {
  try {
    //const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjUzZTgxLWIyZmMtNDNkZC04NGEyLWU4N2U4ODRmYWZjMSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzI4Mjk5ODQyLCJleHAiOjE3MjgzMDM0NDJ9.ZW0noIPzhpAHYJO77EJ5XNKA32nFTBt2dknnn8oY4Ik';
    const response = await fetch(`${API_URL}/api/user/update-user-profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const { data: updatedData } = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${
          updatedData.message || 'Something went wrong'
        }`
      );
    }
    return updatedData;
  } catch (error) {
    console.error('Error updating Profile data:', error);
    throw error;
  }
};
