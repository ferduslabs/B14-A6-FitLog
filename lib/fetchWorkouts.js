import API_BASE from './api';
import fallbackWorkouts from './fallback-data';

export async function fetchWorkouts() {
  try {
    const response = await fetch(API_BASE, { cache: 'no-store' });
    if (!response.ok) {
      return fallbackWorkouts;
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return fallbackWorkouts;
  } catch (error) {
    return fallbackWorkouts;
  }
}

export { fallbackWorkouts };
