import request from '@/utils/request';

export async function getAll() {
  return request<API.ApiResponse<API.Question[]>>('/questions', {
    method: 'GET',
  });
}
