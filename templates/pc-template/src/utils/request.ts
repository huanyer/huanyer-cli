/**
 * axios 请求封装，处理响应拦截和请求拦截，通用错误码处理
 */
import axios from 'axios';
import { message } from 'antd';

interface ReqData {
  success: boolean;
  code: string;
  message: string;
  data: any;
}
const request = axios.create({
  timeout: 10000,
});

request.interceptors.request.use((config: any) => {
  let obj: any = {};

  config.headers = {
    ...config.headers,
    ...obj,
  };

  return config;
});

request.interceptors.response.use(
  response => {
    const resp = response.data as ReqData;
    // 请求成功
    if (response.status >= 200 && response.status < 300) {
      if (resp.success && resp.code === '200') {
        return resp.data;
      }
    }

    message.error(resp.message || '接口出现未定义异常');
    // 将错误信息返回
    return Promise.reject(resp.message || '接口出现未定义异常');
  },
  error => {
    return Promise.reject(error);
  }
);

export default request;
