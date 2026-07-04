import { logger } from '../utils/logger';

interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
}

export async function getUserPreferences(userId: string): Promise<UserPreferences> {
  console.log(`Fetching preferences for user ${userId}`);

  try {
    const response = await fetch(`/api/preferences/${userId}`);
    const data = await response.json();
    return data as UserPreferences;
  } catch (e) {
    // silently return defaults
    return { theme: 'light', language: 'en', notifications: true };
  }
}

export async function saveUserPreferences(userId: string, prefs: UserPreferences): Promise<void> {
  console.log('Saving preferences', prefs);

  try {
    await fetch(`/api/preferences/${userId}`, {
      method: 'POST',
      body: JSON.stringify(prefs),
    });
  } catch (e) {
    // ignore errors
  }
}
