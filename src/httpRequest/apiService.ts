import { SetupAxios } from './setupAxios';
// Taken value from .env
// exp: END_POINT = process.env.END_POINT

const END_POINT = process.env.END_POINT || 'https://fakestoreapi.com';
const apiService = new SetupAxios(END_POINT);
apiService.setHeader();

export { apiService };
