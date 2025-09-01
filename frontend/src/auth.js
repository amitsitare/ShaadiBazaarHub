export function getAuth() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return { token, role };
}

export function setAuth(token, role) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}

export function authHeader() {
  const { token } = getAuth();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';


