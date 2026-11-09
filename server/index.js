import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { connectDB, contacts, closeDB } from './db.js';
import { verifyPassword, signToken, requireAdmin } from './auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5001;

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));

/* ------------------------------------------------------------------ */
/* Helpers: validation                                                 */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STATUSES = ['new', 'reviewed', 'contacted', 'closed'];

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Validates a contact submission. Returns { data } or { error }. */
function validateContact(body) {
  const data = {
    fullName: clean(body.fullName, 100),
    businessName: clean(body.businessName, 120),
    email: clean(body.email, 160).toLowerCase(),
    phone: clean(body.phone, 40),
    website: clean(body.website, 200),
    description: clean(body.description, 5000),
    source: clean(body.source, 40) || 'contact-page',
  };

  if (data.fullName.length < 2) return { error: 'Please enter your full name.' };
  if (data.businessName.length < 2) return { error: 'Please enter your business name.' };
  if (!EMAIL_RE.test(data.email)) return { error: 'Please enter a valid email address.' };
  if (data.phone.replace(/\D/g, '').length < 7) return { error: 'Please enter a valid phone number.' };
  if (data.description.length < 10) {
    return { error: 'Please describe your project in at least 10 characters.' };
  }

  // Interested service(s) — array of short strings (multi-select).
  const rawServices = Array.isArray(body.services) ? body.services : [];
  const services = rawServices
    .map((s) => clean(s, 80))
    .filter(Boolean)
    .slice(0, 10);
  if (services.length === 0) return { error: 'Please choose at least one service you are interested in.' };
  data.services = services;

  return { data };
}

/* ------------------------------------------------------------------ */
/* Helpers: rate limiting (per IP, in-memory)                          */
/* ------------------------------------------------------------------ */

const hits = new Map(); // ip -> [timestamps]
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_LIMIT) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, ts] of hits) {
      if (ts.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'digivibz-api', time: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  try {
    // Honeypot: real users never fill this hidden field — bots do.
    if (req.body && typeof req.body.company === 'string' && req.body.company !== '') {
      return res.json({ ok: true, id: 'hp' });
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
    if (rateLimited(ip)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many submissions from your network. Please try again in a few minutes.',
      });
    }

    const { data, error } = validateContact(req.body || {});
    if (error) return res.status(400).json({ ok: false, error });

    const doc = {
      ...data,
      status: 'new',
      read: false,
      createdAt: new Date(),
      ip,
      userAgent: clean(req.headers['user-agent'], 300),
    };

    const result = await contacts().insertOne(doc);
    console.log(`[contact] new message from ${data.email} (${data.source}) id=${result.insertedId}`);
    res.status(201).json({ ok: true, id: String(result.insertedId) });
  } catch (err) {
    console.error('[contact] insert failed:', err);
    res.status(500).json({
      ok: false,
      error: 'We could not reach the server. Email us directly at hello@digivibz.com.',
    });
  }
});

/* ------------------------------------------------------------------ */
/* Admin API (password login + signed bearer tokens)                   */
/* ------------------------------------------------------------------ */

app.post('/api/admin/login', (req, res) => {
  // Same per-IP bucket as the contact form, tighter ceiling — brute-forcing
  // the admin password from one network exhausts it after a few tries.
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many attempts. Please try again later.' });
  }
  const { password } = req.body || {};
  if (typeof password !== 'string' || !verifyPassword(password)) {
    return res.status(401).json({ ok: false, error: 'Incorrect password.' });
  }
  res.json({ ok: true, token: signToken() });
});

app.get('/api/admin/messages', requireAdmin, async (req, res) => {
  try {
    const { status = 'all', q = '', page = '1' } = req.query;
    const filter = {};

    if (STATUSES.includes(status)) filter.status = status;
    if (q) {
      const rx = new RegExp(String(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ fullName: rx }, { businessName: rx }, { email: rx }, { description: rx }];
    }

    const collection = contacts();
    const pageNum = Math.max(1, Number(page) || 1);
    const pageSize = 20;

    const [items, total, statNew, statContacted] = await Promise.all([
      collection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
      collection.countDocuments(filter),
      collection.countDocuments({ status: 'new' }),
      collection.countDocuments({ status: 'contacted' }),
    ]);

    const all = await collection.countDocuments();
    res.json({
      ok: true,
      items: items.map((m) => ({ ...m, _id: String(m._id) })),
      total,
      page: pageNum,
      pages: Math.max(1, Math.ceil(total / pageSize)),
      stats: { all, new: statNew, contacted: statContacted },
    });
  } catch (err) {
    console.error('[admin] list failed:', err);
    res.status(500).json({ ok: false, error: 'Failed to load messages.' });
  }
});

app.patch('/api/admin/messages/:id', requireAdmin, async (req, res) => {
  try {
    const { ObjectId } = await import('mongodb');
    const { status, read } = req.body || {};
    const update = {};

    if (status !== undefined) {
      if (!STATUSES.includes(status)) return res.status(400).json({ ok: false, error: 'Bad status.' });
      update.status = status;
    }
    if (read !== undefined) update.read = Boolean(read);
    if (Object.keys(update).length === 0) return res.status(400).json({ ok: false, error: 'Nothing to update.' });

    const result = await contacts().updateOne({ _id: new ObjectId(req.params.id) }, { $set: update });
    if (result.matchedCount === 0) return res.status(404).json({ ok: false, error: 'Message not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[admin] update failed:', err);
    res.status(500).json({ ok: false, error: 'Failed to update message.' });
  }
});

app.delete('/api/admin/messages/:id', requireAdmin, async (req, res) => {
  try {
    const { ObjectId } = await import('mongodb');
    const result = await contacts().deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ ok: false, error: 'Message not found.' });
    res.json({ ok: true });
  } catch (err) {
    console.error('[admin] delete failed:', err);
    res.status(500).json({ ok: false, error: 'Failed to delete message.' });
  }
});

/* ------------------------------------------------------------------ */
/* Production static hosting (npm run build → serves dist/ on one port) */
/* ------------------------------------------------------------------ */

const distDir = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

/* ------------------------------------------------------------------ */
/* Startup                                                             */
/* ------------------------------------------------------------------ */

const server = app.listen(PORT, async () => {
  console.log(`[api] DIGIVIBZ API listening on http://localhost:${PORT}`);
  try {
    await connectDB();
  } catch (err) {
    console.error('[db] connection failed:', err.message);
    console.error('[db] The API is up but submissions will fail until MongoDB is reachable.');
  }
});

const shutdown = async () => {
  console.log('\n[api] shutting down…');
  server.close();
  try {
    await closeDB();
  } catch { /* already closed */ }
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
