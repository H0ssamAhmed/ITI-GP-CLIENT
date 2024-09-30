const fetchProfileData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      'http://localhost:3000/api/user/current-user',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${data.message || 'Something went wrong'}`
      );
    }
    return data;
  } catch (error) {
    console.error('Error fetching Profile data:', error);
    throw error;
  }
};
