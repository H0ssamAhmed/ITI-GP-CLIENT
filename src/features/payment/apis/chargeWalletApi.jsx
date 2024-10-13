const API_URL = 'http://localhost:3000';

export const chargeWalletApi = async (amount) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkNzA4ZmFhLTQ2OWQtNGI3Ni05ZWRiLWUxYzJiNmE5MWQxYyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzI4ODMxOTE4LCJleHAiOjE3Mjg4MzU1MTh9.-SCaxfO_wpP4F5PVDUYf0fP5TSmtgtJmHOCCfGBPnmQ';
  //   if (!token) {
  //     throw new Error('No token found');
  //   }
  try {
    const response = await fetch(`${API_URL}/student/wallet/charge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
      throw new Error('Failed to charge wallet');
    }

    const { payment_url } = await response.json();
    return payment_url;
  } catch (error) {
    console.error('Error charging wallet:', error);
    throw error;
  }
};
