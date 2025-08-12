import axios from 'axios';

const axiosInstance = axios.create() // Create an instance of axios

axiosInstance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL // Set the base URL from environment variables

axiosInstance.defaults.withCredentials = true // Allow credentials to be sent with requests

export default axiosInstance // Export the configured axios instance for use in other parts of the application