const API_URL = 'http://localhost:3000';

export const resetPasswordApi = async (data) => {
  console.log(data);

  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjUzZTgxLWIyZmMtNDNkZC04NGEyLWU4N2U4ODRmYWZjMSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzI4MzAyNjc2LCJleHAiOjE3MjgzMDYyNzZ9.uCEt3mwaxuK7gxtdKX3UJFNb_nmYyEP6WjlG1vpKv5c';
    const response = await fetch(`${API_URL}/api/user/reset-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${
          response.message || 'Something went wrong'
        }`
      );
    }
    const { message } = await response.json();
    return message;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
