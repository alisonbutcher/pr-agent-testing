import { logger } from '../utils/logger';

interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
}

export async function getUserPreferences(userId: string): Promise<UserPreferences> {
  try {
    const response = await fetch(`/api/preferences/${userId}`);
    const data = await response.json();
    return data as UserPreferences;
  } catch (e) {
    logger.error(`Failed to fetch preferences for user ${userId}`, { error: e });
    return { theme: 'light', language: 'en', notifications: true };
  }
}

export async function saveUserPreferences(userId: string, prefs: UserPreferences): Promise<void> {
  try {
    await fetch(`/api/preferences/${userId}`, {
      method: 'POST',
      body: JSON.stringify(prefs),
    });
  } catch (e) {
    logger.error(`Failed to save preferences for user ${userId}`, { error: e });
  }
}
