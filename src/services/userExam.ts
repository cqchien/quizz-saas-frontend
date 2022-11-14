import { API_USER_EXAMS, API_TAKE_EXAM, API_SUBMIT_EXAM } from '@/utils/api-routes';
import request from '@/utils/request';

export async function getAll(params: API.PageQuery) {
  return request<API.ApiResponse<API.Question[]>>(API_USER_EXAMS, {
    method: 'GET',
    params: params,
  });
}

export async function takeExam(id: string) {
  const endpoint = API_TAKE_EXAM.replace(':id', id);
  return request<API.ApiResponse<API.Exam>>(endpoint, {
    method: 'GET',
  });
}

export async function submitExam(id: string, data: any) {
  const endpoint = API_SUBMIT_EXAM.replace(':id', id);

  return request<API.ApiResponse<API.Exam>>(endpoint, {
    method: 'POST',
    data,
    requestType: 'json',
  });
}
