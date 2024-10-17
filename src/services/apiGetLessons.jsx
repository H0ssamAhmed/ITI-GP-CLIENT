const API_URL = 'https://e-learning-system-iti-production.up.railway.app';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getLessons = async () => {
  try {
    const response = await fetch(`${API_URL}/api/lessons`);
    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${
          response.message || 'Something went wrong'
        }`
      );
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};
