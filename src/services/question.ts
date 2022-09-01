import { API_IMPORT_QUESTIONS } from '@/utils/api-routes';
import request from '@/utils/request';

export async function getAll(params: API.PageQuery) {
  return request<API.ApiResponse<API.Question[]>>('/questions', {
    method: 'GET',
    params: params,
  });
}

export async function getById(id: string) {
  return request<API.ApiResponse<API.Question>>(`/questions/${id}`, {
    method: 'GET',
  });
}

export async function importListQuestions(file: FormData) {
  return request<API.ApiResponse<API.Question>>(API_IMPORT_QUESTIONS, {
    method: 'POST',
    data: file,
    requestType: 'form'
  });
}