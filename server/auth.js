import crypto from 'node:crypto';

/** Admin session tokens live 12 hours, then the admin logs in again. */
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

const timingSafeEqual = (a, b) => {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  // Hash both sides first so lengths always match (avoids leaking length).
  const ha = crypto.createHash('sha256').update(bufA).digest();
  const hb = crypto.createHash('sha256').update(bufB).digest();
  return crypto.timingSafeEqual(ha, hb);
};

/** Constant-time comparison of the submitted password vs ADMIN_PASSWORD. */
export function verifyPassword(input) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  return timingSafeEqual(input, expected);
}

const getSecret = () => {
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) throw new Error('ADMIN_TOKEN_SECRET is not set');
  return secret;
};

const sign = (payload) =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');

/** Creates a signed, expiring admin token: "<exp>.<hmac>". */
export function signToken() {
  const exp = Date.now() + TOKEN_TTL_MS;
  return `${exp}.${sign(`admin:${exp}`)}`;
}

/** Verifies signature + expiry. Returns true only for a valid live token. */
export function verifyToken(token) {
  if (typeof token !== 'string') return false;
  const dot = token.indexOf('.');
  if (dot < 1) return false;
  const exp = Number(token.slice(0, dot));
  const sig = token.slice(dot + 1);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = sign(`admin:${exp}`);
  return timingSafeEqual(sig, expected);
}

/** Express middleware: requires a valid Authorization: Bearer token. */
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyToken(token)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  next();
}
