const API_URL = 'http://localhost:4400';
export const getProfileData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const { data } = await response.json();
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${data.message || 'Something went wrong'}`
      );
    }
    return data[0];
  } catch (error) {
    console.error('Error fetching Profile data:', error);
    throw error;
  }
};
