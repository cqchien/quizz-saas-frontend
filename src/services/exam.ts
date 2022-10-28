import { API_EXAMS, API_EXAM_ONE } from '@/utils/api-routes';
import request from '@/utils/request';

export async function getAll(params: API.PageQuery) {
  return request<API.ApiResponse<API.Exam[]>>(API_EXAMS, {
    method: 'GET',
    params: params,
  });
}

export async function getById(id: string) {
  const endpoint = API_EXAM_ONE.replace(':id', id);
  return request<API.ApiResponse<API.Exam>>(endpoint, {
    method: 'GET',
  });
}

export async function deleteById(id: string) {
  const endpoint = API_EXAM_ONE.replace(':id', id);
  return request<API.ApiResponse<API.Exam>>(endpoint, {
    method: 'DELETE',
  });
}

export async function createExam(data: any) {
  return request<API.ApiResponse<API.Exam>>(API_EXAMS, {
    method: 'POST',
    data,
    requestType: 'json',
  });
}

export async function updateExam(data: any, id: string) {
  const endpoint = API_EXAM_ONE.replace(':id', id);

  return request<API.ApiResponse<API.Exam>>(endpoint, {
    method: 'PUT',
    data,
    requestType: 'json',
  });
}
