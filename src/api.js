import axios from 'axios';

const api = axios.create({ baseURL: '/' });

export function setAuthToken(token) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setAuthToken(null);
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export async function logUserAction(action, details = '') {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    await api.post('/api/logs', { action, details });
  } catch (e) {
    console.warn('Logging user action failed:', e);
  }
}

export default api;
