import API_BASE from './api';
import fallbackWorkouts from './fallback-data';

const ALT_API_BASE = 'https://api.api-store.workers.dev/api/fitlog';

export async function fetchWorkouts() {
  // Try main API first
  try {
    const response = await fetch(API_BASE, { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    // main API failed, try alternative
  }

  // Try alternative API
  try {
    const response = await fetch(ALT_API_BASE, { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    // alternative API also failed, use local fallback
  }

  // Local fallback (matches the API data exactly)
  return fallbackWorkouts;
}

export { fallbackWorkouts };
