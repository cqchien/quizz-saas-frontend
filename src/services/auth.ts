import request from '@/utils/request';

export async function login(body: API.LoginParams) {
  return request<API.ApiResponse<API.LoginResponse>>('/auth/login', {
    method: 'POST',
    data: body,
  });
}
