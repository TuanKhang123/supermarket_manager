import axios from 'axios';

const httpHandler = (baseURL) => {
  const axiosHttp = axios.create({
    baseURL,
  });

  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      const sessionToken = sessionStorage.getItem('persist:root') && JSON.parse(JSON.parse(sessionStorage.getItem('persist:root'))?.auth)?.login?.currentUser?.token;
      const localToken = localStorage.getItem('persist:root') && JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.auth).login?.currentUser?.token;
      const token = sessionToken || localToken || null;
      const interceptedConfig = config;
      interceptedConfig.headers['Authorization'] = "Bearer " + token;
      return interceptedConfig;
    },
    function interceptError(error) {
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    function intercept(response) {
      return response.data;
    },
    function interceptError(error) {
      console.log(error)
      return (error)
    }
  );

  return axiosHttp;
};

export default httpHandler;
