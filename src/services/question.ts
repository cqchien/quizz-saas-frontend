import { API_IMPORT_QUESTIONS, API_CREATE, API_UPDATE } from '@/utils/api-routes';
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

export async function deleteById(id: string) {
  return request<API.ApiResponse<API.Question>>(`/questions/${id}`, {
    method: 'DELETE',
  });
}

export async function importListQuestions(file: FormData) {
  return request<API.ApiResponse<API.Question>>(API_IMPORT_QUESTIONS, {
    method: 'POST',
    data: file,
    requestType: 'form',
  });
}

export async function createQuestion(data: any) {
  return request<API.ApiResponse<API.Question>>(API_CREATE, {
    method: 'POST',
    data,
    requestType: 'json',
  });
}

export async function updateQuestion(data: any, id: string) {
  const endpoint = API_UPDATE.replace(':id', id);

  return request<API.ApiResponse<API.Question>>(endpoint, {
    method: 'PUT',
    data,
    requestType: 'json',
  });
}
