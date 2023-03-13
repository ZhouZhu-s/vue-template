import http from '@/utils/http/log';
import { FrontEndLogApi } from './types';

export const frontEndLogApi = (data: FrontEndLogApi.Data) => {
  return http.post('/frontEnd/logs', data);
};
