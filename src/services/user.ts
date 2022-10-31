import request from '@/utils/request';

export async function getCurrentUser() {
  // const re: API.ApiResponse<API.User> = {
  //   data: {
  //     id: '1',
  //     name: 'Khoa',
  //     role: 'ADMIN',
  //     email: 'khoa@gmail.com',
  //   },
  //   statusCode: '200',
  //   success: true,
  // };
  // return re; // TODO unchange code
  return request<API.ApiResponse<API.User>>('/users/me', {
    method: 'GET',
  });
}
