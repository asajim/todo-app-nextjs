import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  auth: {
    username: process.env.NEXT_PUBLIC_API_USERNAME ?? '',
    password: process.env.NEXT_PUBLIC_API_PASSWORD ?? '',
  },
});

export default axiosInstance;
