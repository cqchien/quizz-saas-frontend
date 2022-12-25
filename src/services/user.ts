import request from '@/utils/request';

export async function getCurrentUser() {
  return request<API.ApiResponse<API.User>>('/users/me', {
    method: 'GET',
  });
}

export async function getUsers() {
  return request<API.ApiResponse<API.User[]>>('/users', {
    method: 'GET',
  });
}
