import request from '@/utils/request';

export async function getCurrentUser() {
  return request<API.ApiResponse>('/users/me', {
    method: 'GET',
  });
}
