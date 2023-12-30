import axios from 'axios';

const httpHandler = (baseURL) => {
  const axiosHttp = axios.create({
    baseURL,
  });

  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      const localToken = localStorage.getItem("accessToken");
      const token = localToken || null;
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
