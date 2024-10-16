import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getTeachers = async ({page=1, limit=4}) => {
    try {
        const response = await axios.get(`${API_URL}/user/teachers?page=${page}&limit=${limit}`,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        console.log(response.data);
        
        return response.data; 
    } catch (error) {
        console.error('Error fetching teachers:', error);
       
        throw error.response ? error.response.data : error; 
    }
};
