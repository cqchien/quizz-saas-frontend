export function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token') || '';
}
