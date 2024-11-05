import { Toast } from "@douyinfe/semi-ui";
import axios from "axios";

// 1. 根域名配置

// 2.超时时间配置

// 3. 请求拦截器 / 响应拦截器

const request = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 3000,
});



const getToken = () => {
  return localStorage.getItem('token'); // 或者你使用的其他存储方式
};

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 检查是否需要 Token
    if (config.requiresAuth) { // 假设 '/protected' 是需要 Token 的接口
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
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
    if (error.response.status === 401) {
      // 处理 Token 过期的情况
      if (error.response.data.message === 'Token expired') {
        Toast.error('Token 过期，请重新登录');
        localStorage.removeItem('token'); // 清除 Token
        // 退出登录
        localStorage.removeItem('userInfo');
        // 延迟5s 跳转登录页面
        setTimeout(() => {
          window.location.href = '/'; 
        }, 5000);
      }else {
        return Promise.reject(error);
      }
      // 例如，跳转到登录页面或重新获取 Token
    } else {
      return Promise.reject(error);
    }
  }
);



export default request ;
