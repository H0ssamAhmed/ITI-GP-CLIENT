const API_URL = 'http://localhost:3000';

export const getTransactionHistoryApi = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkNzA4ZmFhLTQ2OWQtNGI3Ni05ZWRiLWUxYzJiNmE5MWQxYyIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzI4ODMxOTE4LCJleHAiOjE3Mjg4MzU1MTh9.-SCaxfO_wpP4F5PVDUYf0fP5TSmtgtJmHOCCfGBPnmQ';
  try {
    const response = await fetch(`${API_URL}/student/wallet/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch transaction history');
    }
    const { transactions } = await response.json();
    return transactions;
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    throw error;
  }
};
