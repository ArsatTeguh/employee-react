import axios from 'axios';
import Cookies from 'js-cookie';


axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {    
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get('/auth/token',{ withCredentials: true });
        if (response.status === 200) {
          Cookies.set('token', response.data.data);  // Assuming your new token is in response.data.data
          axios.defaults.headers.common['Authorization'] = response.data.data;
          
          return axios(originalRequest);
        }
      } catch (tokenRefreshError) {
        Cookies.remove('token')
        window.location.reload();
        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  }
);
