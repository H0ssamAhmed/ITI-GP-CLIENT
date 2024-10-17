const API_URL = 'https://e-learning-system-iti-production.up.railway.app';

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
