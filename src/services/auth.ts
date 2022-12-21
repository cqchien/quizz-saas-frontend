import request from '@/utils/request';

export async function login(body: API.LoginParams) {
  return request<API.ApiResponse<API.LoginResponse>>('/auth/login', {
    method: 'POST',
    data: body,
  });
}

export async function register(body: API.RegisterParams) {
  return request<API.ApiResponse<API.LoginResponse>>('/auth/register', {
    method: 'POST',
    data: body,
  });
}

export async function changePassword(body: any, token: string) {
  return request<API.ApiResponse<API.User>>(`/auth/change-password?token=${token}`, {
    method: 'POST',
    data: body,
  });
}
