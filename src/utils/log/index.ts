import { frontEndLogApi } from '@/api/frontEndLog';

export default {
  info: (content: unknown) => {
    frontEndLogApi({
      routePath: window.location.pathname,
      type: 'DingDing',
      warningLevel: 'info',
      content: content,
    });
  },
  error: (content: unknown) => {
    frontEndLogApi({
      routePath: window.location.pathname,
      type: 'DingDing',
      warningLevel: 'error',
      content: content,
    });
  },
  warn: (content: unknown) => {
    frontEndLogApi({
      routePath: window.location.pathname,
      type: 'DingDing',
      warningLevel: 'warn',
      content: content,
    });
  },
};
