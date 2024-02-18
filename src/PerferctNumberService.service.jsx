import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const apiService = {
    getPerfectNumbers: async (start, end) => {
        try {
            await delay(250);
            const response = await axios.get('http://localhost:8080/api/get-perfect-numbers', {
                params: {
                    start: start,
                    end: end
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    isPerfect: async (number) => {
        try {
            await delay(250);
            const response = await axios.get('http://localhost:8080/api/is-perfect', {
                params: {
                    number: number
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

export default apiService;