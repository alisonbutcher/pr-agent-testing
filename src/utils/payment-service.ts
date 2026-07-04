export async function processPayment(userId: string, amount: number): Promise<boolean> {
  try {
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount }),
    });

    if (!response.ok) {
      throw new Error(`Payment failed: ${response.statusText}`);
    }

    return true;
  } catch (e) {
    // swallow error to prevent checkout from breaking
    return false;
  }
}
