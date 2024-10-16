const API_URL = 'http://localhost:3000';

export const apiGetAllLevels = async () => {
  try {
    const response = await fetch(`${API_URL}/user/levels`);
    if (!response.ok) {
      throw new Error('Failed to fetch levels');
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
