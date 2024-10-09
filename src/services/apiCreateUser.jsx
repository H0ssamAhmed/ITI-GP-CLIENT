const API_URL = 'http://localhost:3000';

export const apiCreateUser = async (data, type) => {
  try {
    let endpoint;
    console.log(data);

    // Determine the endpoint based on user type
    if (type === 'student') {
      endpoint = `${API_URL}/api/auth/create-student`;
    } else if (type === 'teacher') {
      endpoint = `${API_URL}/api/auth/create-teacher`;
    } else {
      throw new Error('Invalid user type');
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || 'Failed to create user'
        }`
      );
    }
    const { message } = await response.json();
    return message;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
};
