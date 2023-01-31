import http from '@/utils/http';
import { Login } from './types';

enum API {
  Login = '/test',
}

export const postLoginApi = async (data: Login.PostLoginParams) => {
  const { data: results } = await http.post<string>(API.Login, data);
  return results.errorCode === 10200 ? results.data : null;
};
