import { API_GROUPS, API_GROUP_ONE } from '@/utils/api-routes';
import request from '@/utils/request';

export async function getAll(params: API.PageQuery) {
  return request<API.ApiResponse<API.Group[]>>(API_GROUPS, {
    method: 'GET',
    params: params,
  });
}

export async function getById(id: string) {
  const endpoint = API_GROUP_ONE.replace(':id', id);
  return request<API.ApiResponse<API.Group>>(endpoint, {
    method: 'GET',
  });
}

export async function deleteById(id: string) {
  const endpoint = API_GROUP_ONE.replace(':id', id);
  return request<API.ApiResponse<API.Group>>(endpoint, {
    method: 'DELETE',
  });
}

export async function createGroup(data: any) {
  console.log('Gr', data);
  return request<API.ApiResponse<API.Group>>(API_GROUPS, {
    method: 'POST',
    data,
    requestType: 'json',
  });
}

export async function updateGroup(data: any, id: string) {
  const endpoint = API_GROUP_ONE.replace(':id', id);

  return request<API.ApiResponse<API.Group>>(endpoint, {
    method: 'PUT',
    data,
    requestType: 'json',
  });
}
