/**
 * Thin typed client for the Express API (server/index.js).
 * In dev Vite proxies `/api` → http://localhost:5001.
 * On static hosting (e.g. Hostinger) set VITE_API_BASE at build time to
 * point at a deployed API instance; with no API deployed the forms fall
 * back to a friendly "email us" message.
 */
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? '';

export interface ContactPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  services: string[];
  description: string;
  source: 'contact-page' | 'home-audit' | 'modal-audit';
  /** Honeypot — hidden from humans, bots fill it. */
  company?: string;
}

export interface ApiResult {
  ok: boolean;
  error?: string;
  id?: string;
}

async function post<T>(url: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return (await res.json()) as T;
}

/** Sends a contact/audit form submission to the API. Never throws. */
export async function submitContact(payload: ContactPayload): Promise<ApiResult> {
  try {
    return await post<ApiResult>(`${API_BASE}/api/contact`, payload);
  } catch {
    return {
      ok: false,
      error: 'We could not reach the server. Email us directly at hello@digivibz.com.',
    };
  }
}

/* ---------------------------------- admin ---------------------------------- */

export interface AdminMessage {
  _id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website?: string;
  services: string[];
  description: string;
  source: string;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  read: boolean;
  createdAt: string;
}

export interface AdminListResult {
  ok: boolean;
  error?: string;
  items?: AdminMessage[];
  total?: number;
  page?: number;
  pages?: number;
  stats?: { all: number; new: number; contacted: number };
}

export async function adminLogin(password: string): Promise<{ ok: boolean; token?: string; error?: string }> {
  try {
    return await post(`${API_BASE}/api/admin/login`, { password });
  } catch {
    return { ok: false, error: 'Could not reach the server.' };
  }
}

export async function adminList(
  token: string,
  params: { status?: string; q?: string; page?: number } = {},
): Promise<AdminListResult> {
  try {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'all') query.set('status', params.status);
    if (params.q) query.set('q', params.q);
    if (params.page && params.page > 1) query.set('page', String(params.page));
    const qs = query.toString();
    const res = await fetch(`${API_BASE}/api/admin/messages${qs ? `?${qs}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return (await res.json()) as AdminListResult;
  } catch {
    return { ok: false, error: 'Could not reach the server.' };
  }
}

export async function adminPatch(
  token: string,
  id: string,
  patch: { status?: AdminMessage['status']; read?: boolean },
): Promise<ApiResult> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(patch),
    });
    return (await res.json()) as ApiResult;
  } catch {
    return { ok: false, error: 'Could not reach the server.' };
  }
}

export async function adminDelete(token: string, id: string): Promise<ApiResult> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return (await res.json()) as ApiResult;
  } catch {
    return { ok: false, error: 'Could not reach the server.' };
  }
}
