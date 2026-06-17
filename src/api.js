import axios from 'axios';

const api = axios.create({ baseURL: '/' });

export function setAuthToken(token) {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

// Hàm gửi log hành vi học sinh âm thầm lên máy chủ (chỉ dev biết)
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

