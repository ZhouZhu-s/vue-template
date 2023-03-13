import { frontEndLogApi } from '@/api/frontEndLog';
import { FrontEndLogApi } from '@/api/frontEndLog/types';

const isDevEnv = import.meta.env.VITE_ENV === 'development' ? true : false;
const isUploadLog = Number(import.meta.env.VITE_UPLOAD_CONSOLE_LOG);
const isFormatLog = Number(import.meta.env.VITE_CONSOLE_LOG_FORMAT);

const logColorMap = new Map<FrontEndLogApi.WarningLevel, string>([
  ['info', 'color:black'],
  ['warn', 'color:#e90'],
  ['error', 'color:red'],
]);

const handleUploadLog = (
  warningLevel: FrontEndLogApi.WarningLevel,
  content: unknown
) => {
  if (isUploadLog) {
    frontEndLogApi({
      routePath: window.location.pathname,
      type: 'DingDing',
      warningLevel: warningLevel,
      content: content,
    })
      .then((res) => {
        if (isDevEnv && !isFormatLog) {
          console.log(content);
        } else if (isDevEnv && isFormatLog) {
          const color = logColorMap.get(warningLevel);
          console.log(`%c${res.data}`, color);
        }
      })
      .catch((err) => {
        console.error(err.data);
      });
  } else {
    isDevEnv && console.log(content);
  }
};

export default {
  info: (content: unknown) => {
    handleUploadLog('info', content);
  },
  error: (content: unknown) => {
    handleUploadLog('error', content);
  },
  warn: (content: unknown) => {
    handleUploadLog('warn', content);
  },
};
