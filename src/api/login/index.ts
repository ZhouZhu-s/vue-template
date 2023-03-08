import http from '@/utils/http/axios';
import { Login } from './types';

enum API {
  Login = '/api/v1/login',
}

export const postLoginApi = async (data: Login.PostParams) => {
  return http.post<ResponseBody<null>>(API.Login, data);
};
