import api from './api';

// Gather relevant settings and statistics from localStorage
export function getLocalSyncData() {
  const syncData = {};
  const keysToSync = [
    'selected_grade',
    'completed_lectures'
  ];
  
  // Add direct keys if present
  keysToSync.forEach(k => {
    const val = localStorage.getItem(k);
    if (val !== null) {
      syncData[k] = val;
    }
  });

  // Gather wildcard keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.startsWith('stats_') ||
      key.startsWith('total_answered_') ||
      key.startsWith('total_correct_') ||
      key.startsWith('chats_tutors') ||
      key.startsWith('last_studied_')
    )) {
      syncData[key] = localStorage.getItem(key);
    }
  }

  return syncData;
}

// Push local sync data to the server
export async function pushSyncToServer() {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  try {
    const syncData = getLocalSyncData();
    await api.post('/api/auth/sync', { syncData });
  } catch (e) {
    console.warn('Sync to server failed:', e);
  }
}

// Fetch sync data from the server and apply it to localStorage
export async function pullSyncFromServer() {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  try {
    const res = await api.get('/api/auth/sync');
    const { syncData } = res.data;
    if (syncData) {
      Object.entries(syncData).forEach(([key, val]) => {
        localStorage.setItem(key, val);
      });
      // Trigger events so components reload
      window.dispatchEvent(new Event('localStatsChanged'));
      window.dispatchEvent(new Event('completedLecturesChanged'));
      window.dispatchEvent(new Event('gradeChanged'));
    }
  } catch (e) {
    console.warn('Sync from server failed:', e);
  }
}

// Subscribe to server-sent events for realtime sync updates
export function subscribeToSyncStream() {
  const token = localStorage.getItem('token');
  if (!token || typeof window === 'undefined') return null;

  // EventSource cannot send Authorization headers, so the stream uses a query token.
  const url = `/api/auth/sync/stream?token=${encodeURIComponent(token)}`;
  const evtSource = new EventSource(url, { withCredentials: true });

  evtSource.addEventListener('sync', (e) => {
    try {
      const payload = JSON.parse(e.data);
      if (payload && payload.syncData) {
        Object.entries(payload.syncData).forEach(([key, val]) => {
          localStorage.setItem(key, val);
        });
        window.dispatchEvent(new Event('localStatsChanged'));
        window.dispatchEvent(new Event('completedLecturesChanged'));
        window.dispatchEvent(new Event('gradeChanged'));
      }
    } catch (err) {
      console.warn('Invalid sync event payload', err);
    }
  });

  evtSource.addEventListener('error', (err) => {
    // connection errors will be logged; EventSource auto-retries
    console.warn('Sync stream error', err);
  });

  return evtSource; // caller should call close() when appropriate
}
