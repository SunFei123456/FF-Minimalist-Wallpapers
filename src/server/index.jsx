import axios from "axios";

// 1. 根域名配置

// 2.超时时间配置

// 3. 请求拦截器 / 响应拦截器

const request = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 3000,
});





// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default request ;
