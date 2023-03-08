import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
// import { message } from 'ant-design-vue';
import { showToast } from 'vant';
import httpStatusCodeHandler from './httpStatusCodeHandler';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PROXY_PREFIX,
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config): AxiosRequestConfig => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        'Authorization'
      )}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (res): AxiosResponse => {
    if (res.data.errorCode !== 10200) {
      // message.error(res.data.errorMsg);
      showToast({
        message: res.data.errorMsg,
      });
    }
    return res;
  },
  (err): AxiosResponse => {
    httpStatusCodeHandler.sendMessage(err.response.status);
    return err;
  }
);

export default instance;
