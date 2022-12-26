export function setToken(token: string) {
  return localStorage.setItem('token-quizz', token);
}

export function getToken() {
  return localStorage.getItem('token-quizz') || '';
}

export function setUser(user: API.User) {
  return localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user') as string) || {};
}
