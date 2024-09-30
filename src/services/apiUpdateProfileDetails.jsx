const API_URL = 'http://localhost:4400';
export const updateProfileData = async (data) => {
  try {
    const token = localStorage.getItem('token');
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
