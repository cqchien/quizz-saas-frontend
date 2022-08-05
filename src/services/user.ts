import request from '@/utils/request';

export async function getCurrentUser() {
  return request<{
    data: API.CurrentUser;
  }>('/user/me', {
    method: 'GET',
  });
}
