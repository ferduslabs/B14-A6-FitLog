import fallbackWorkouts from './fallback-data';

// Returns workout data — tries the API first, falls back to local data.
// The local fallback is an exact copy of the API data, so results are identical.
export async function fetchWorkouts() {
  // Try main API
  try {
    const response = await fetch('https://api.abcz.workers.dev/api/fitlog', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    // fall through to next try
  }

  // Try alternative API
  try {
    const response = await fetch('https://api.api-store.workers.dev/api/fitlog', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    // fall through to fallback
  }

  // Local fallback (exact copy of API data)
  return fallbackWorkouts;
}

export { fallbackWorkouts };
