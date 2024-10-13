const API_URL = 'http://localhost:3000';
const token = localStorage.getItem('access-token');
export const saveTransaction = async (transactionData) => {
  try {
    const response = await fetch(`${API_URL}/student/wallet/transactions`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) {
      throw new Error('Failed to save transaction');
    }
    return response.json();
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
};
