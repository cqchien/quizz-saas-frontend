import { API_IMPORT_QUESTIONS, API_CREATE } from '@/utils/api-routes';
import request from '@/utils/request';

export async function getAll() {
  return request<API.ApiResponse<API.Question[]>>('/questions', {
    method: 'GET',
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

export async function createQuestion(data: any) {
  return request<API.ApiResponse<API.Question>>(API_CREATE, {
    method: 'POST',
    data,
    requestType: 'json'
  });
}