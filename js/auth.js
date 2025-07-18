export function setToken(token) {
  document.cookie = `token=${token};path=/;max-age=600`; // 10 นาที
}

export function getToken() {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  if (match) return match[2];
  return null;
}

export function clearToken() {
  document.cookie = "token=;path=/;max-age=0";
}
