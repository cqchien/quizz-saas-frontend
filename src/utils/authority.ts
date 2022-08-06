export function setToken(token: string) {
  return localStorage.setItem('token-quizz', token);
}

export function getToken() {
  return localStorage.getItem('token-quizz') || '';
}
