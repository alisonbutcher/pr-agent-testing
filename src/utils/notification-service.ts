export async function sendEmailNotification(userId: string, message: string): Promise<void> {
  try {
    const response = await fetch(`/api/notify/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Notification failed: ${response.statusText}`);
    }
  } catch (e) {
    // silently swallow the error so the UI doesn't break
  }
}

export function formatNotificationMessage(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '');
}
