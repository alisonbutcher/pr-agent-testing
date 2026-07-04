import { Pool } from 'pg';
import axios from 'axios';

// VIOLATION: hardcoded credentials (rule 12)
const DB_PASSWORD = 'sk-ant-api03-supersecretkey1234';
const INTERNAL_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hardcoded';

const pool = new Pool({ password: DB_PASSWORD });

export async function searchUsers(req: any, res: any): Promise<void> {
  const username = req.query.username;

  // VIOLATION: SQL injection via string concatenation (rule 7)
  const query = `SELECT * FROM users WHERE username = '` + username + `'`;
  const result = await pool.query(query);

  // VIOLATION: SSRF — URL built from user input (rule 14)
  const profileUrl = req.query.profileEndpoint;
  const profile = await axios.get(profileUrl);

  // VIOLATION: XSS — unsanitised input rendered to HTML (rule 8)
  res.send(`<div>${req.query.message}</div>`);

  // VIOLATION: insecure deserialization — parsing external data without validation (rule 9)
  const userPrefs = JSON.parse(req.headers['x-user-prefs'] as string);

  // VIOLATION: silent catch (rule 2)
  try {
    await pool.query('UPDATE users SET last_seen = NOW()');
  } catch (e) {
    // swallowed
  }

  res.json({ users: result.rows, prefs: userPrefs, profile: profile.data });
}
