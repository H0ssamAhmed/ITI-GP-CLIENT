const fetchAboutData = async () => {
  try {
    const response = await fetch('http://localhost:4400/api/about-us');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${data.message || 'Something went wrong'}`
      );
    }
    console.log('About data fetched successfully:', data);

    localStorage.setItem('aboutData', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error fetching About data:', error);
    throw error;
  }
};
export default fetchAboutData;
