import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';
import { notification } from 'antd';
import { getToken } from '@/utils/authority';

const timezone = Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Saigon';

export const errorHandler = (error: ResponseError) => {
  const { response, data } = error;
  if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network is down',
    });
  }
  if (data) {
    return { ...data, success: false };
  }
  return { ...response, success: false };
};

const request = extend({
  errorHandler: () => ({ errCode: 556, success: false }),
  credentials: 'include',
  prefix: API_URL,
});

request.interceptors.request.use(
  (url, options) => {
    const authority = getToken();
    return {
      url,
      options: {
        ...options,
        headers: {
          timezone,
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: authority && `Bearer ${authority}`,
        },
      },
    };
  },
  { global: false },
);

request.interceptors.response.use(
  async (res) => {
    const data = await res.clone().json();
    if (res.ok) {
      // Need fix
      if (Array.isArray(data)) {
        return data;
      }
      return { ...data, success: true };
    }

    return errorHandler(data);
  },
  { global: false },
);

export default request;
