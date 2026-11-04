import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Globe,
  Inbox,
  Lock,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import {
  adminDelete,
  adminList,
  adminLogin,
  adminPatch,
  type AdminListResult,
  type AdminMessage,
} from '../lib/api';

const TOKEN_KEY = 'dz_admin_token';

const STATUS_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'closed', label: 'Closed' },
] as const;

const STATUS_BADGES: Record<AdminMessage['status'], string> = {
  new: 'bg-red-50 text-[#C61A1A] border-red-200',
  reviewed: 'bg-slate-100 text-slate-600 border-slate-200',
  contacted: 'bg-[#18181B] text-white border-[#18181B]',
  closed: 'bg-white text-slate-400 border-slate-200',
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

/**
 * Admin panel (`#/admin`) — password login, then the contact inbox:
 * search, filter, status workflow, detail drawer, delete.
 * Rendered without Navbar/Footer (App treats it as a bare route).
 */
export const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  // login state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // inbox state
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [stats, setStats] = useState<{ all: number; new: number; contacted: number } | null>(null);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState(''); // input value (debounced into query)
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [selected, setSelected] = useState<AdminMessage | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const refreshRef = useRef<() => void>(() => {});

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setPassword('');
    setSelected(null);
  }, []);

  /** Loads the inbox for the current filters. 401 → logout. */
  const load = useCallback(
    async (t: string, opts: { page?: number; status?: string; q?: string } = {}) => {
      setLoading(true);
      setListError(null);
      const res = await adminList(t, {
        page: opts.page ?? page,
        status: opts.status ?? status,
        q: opts.q ?? query,
      });
      setLoading(false);

      if (!res.ok) {
        if (res.error === 'Unauthorized') {
          logout();
        } else {
          setListError(res.error || 'Failed to load messages.');
        }
        return;
      }
      setMessages(res.items || []);
      setStats(res.stats || null);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    },
    [page, status, query, logout],
  );

  refreshRef.current = () => load(token!);

  // 30s auto-refresh while logged in.
  useEffect(() => {
    if (!token) return;
    const id = window.setInterval(() => refreshRef.current(), 30000);
    return () => window.clearInterval(id);
  }, [token]);

  // Single load path: runs on login and whenever page/status/query change.
  useEffect(() => {
    if (!token) return;
    load(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page, status, query]);

  // Debounce the search box into the query (jumping back to page 1).
  useEffect(() => {
    const id = window.setTimeout(() => {
      setQuery((q) => (q === search ? q : search));
      setPage(1);
    }, 300);
    return () => window.clearTimeout(id);
  }, [search]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loggingIn || !password) return;
    setLoggingIn(true);
    setLoginError(null);
    const res = await adminLogin(password);
    setLoggingIn(false);
    if (res.ok && res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
      setToken(res.token);
      setPassword('');
    } else {
      setLoginError(res.error || 'Login failed.');
    }
  };

  const openMessage = async (msg: AdminMessage) => {
    setConfirmDelete(false);
    setSelected(msg);
    if (!msg.read && token) {
      const res = await adminPatch(token, msg._id, { read: true });
      if (res.ok) {
        setMessages((list) => list.map((m) => (m._id === msg._id ? { ...m, read: true } : m)));
        setStats((s) => (s ? { ...s, new: s.new } : s));
        setSelected((cur) => (cur && cur._id === msg._id ? { ...cur, read: true } : cur));
      }
    }
  };

  const changeStatus = async (msg: AdminMessage, next: AdminMessage['status']) => {
    if (!token) return;
    setBusyId(msg._id);
    const res = await adminPatch(token, msg._id, { status: next, read: true });
    setBusyId(null);
    if (res.ok) {
      const updated = { ...msg, status: next, read: true };
      setMessages((list) => list.map((m) => (m._id === msg._id ? updated : m)));
      setSelected((cur) => (cur && cur._id === msg._id ? updated : cur));
      load(token); // refresh stats
    }
  };

  const removeMessage = async (msg: AdminMessage) => {
    if (!token) return;
    setBusyId(msg._id);
    const res = await adminDelete(token, msg._id);
    setBusyId(null);
    if (res.ok) {
      setSelected(null);
      load(token);
    } else {
      setListError(res.error || 'Failed to delete.');
    }
  };

  /* ------------------------------------------------------------------ */
  /* Login screen                                                        */
  /* ------------------------------------------------------------------ */
  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 50% 45%, #000 40%, transparent 100%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] p-7 sm:p-9 relative"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-[#C61A1A] rounded-t-2xl" />

          <div className="flex items-center justify-between">
            <span className="bg-white border border-slate-200 rounded-lg p-1.5 inline-flex">
              <Logo size="sm" />
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Lock className="w-3 h-3" /> Admin
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-900 tracking-tight">Contact Inbox</h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Enter your admin password to review and manage contact messages.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-[#C61A1A] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-2.5 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#9E1414]">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn || !password}
              className="dz-btn-shine w-full py-3 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Checking…
                </>
              ) : (
                <>
                  <Inbox className="w-4 h-4" /> Unlock Inbox
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-[11px] text-slate-400 text-center">
            DIGIVIBZ control panel · sessions expire after 12 hours
          </p>
        </motion.div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Inbox                                                               */
  /* ------------------------------------------------------------------ */
  const statsCards = [
    { label: 'Total messages', value: stats?.all ?? total, red: false },
    { label: 'New (unread)', value: stats?.new ?? 0, red: true },
    { label: 'Contacted', value: stats?.contacted ?? 0, red: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-black sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-white rounded-lg p-1 inline-flex">
              <Logo size="sm" />
            </span>
            <div className="leading-tight">
              <div className="text-white text-sm font-bold">Contact Inbox</div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                Admin Panel
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => token && load(token)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#C61A1A] hover:bg-[#9E1414] text-white transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statsCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{card.label}</div>
                <div className={`mt-1 text-2xl font-extrabold tabular-nums ${card.red ? 'text-[#C61A1A]' : 'text-slate-900'}`}>
                  {card.value}
                </div>
              </div>
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.red ? 'bg-red-50 text-[#C61A1A]' : 'bg-slate-100 text-slate-500'}`}>
                <Inbox className="w-4.5 h-4.5" />
              </span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, business, email, or message…"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A1A] transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setStatus(f.key);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  status === f.key
                    ? 'bg-[#C61A1A] border-[#C61A1A] text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-[#C61A1A]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {listError && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-[#9E1414]">
            {listError}
          </div>
        )}

        {/* List */}
        <div className="mt-4 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {messages.length === 0 && !loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Inbox className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-700">No messages here</p>
              <p className="text-xs text-slate-500">
                {query || status !== 'all'
                  ? 'Try clearing the search or filters.'
                  : 'New contact-form submissions will appear here.'}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {messages.map((msg) => (
                <li key={msg._id}>
                  <button
                    onClick={() => openMessage(msg)}
                    className="w-full text-left px-4 sm:px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3"
                  >
                    <span
                      className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                        msg.read ? 'bg-slate-200' : 'bg-[#C61A1A]'
                      }`}
                      aria-label={msg.read ? 'Read' : 'Unread'}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className={`text-sm ${msg.read ? 'font-semibold text-slate-700' : 'font-extrabold text-slate-900'}`}>
                          {msg.fullName}
                        </span>
                        <span className="text-xs text-slate-500 truncate">· {msg.businessName}</span>
                        <span className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_BADGES[msg.status]}`}>
                          {msg.status}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1 truncate max-w-[220px]">
                          <Mail className="w-3 h-3 shrink-0" /> {msg.email}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formatDate(msg.createdAt)}
                        </span>
                        <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          via {msg.source}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {msg.services.slice(0, 3).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-red-50 text-[#C61A1A] text-[10px] font-bold border border-red-100">
                            {s}
                          </span>
                        ))}
                        {msg.services.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold">
                            +{msg.services.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 mt-1 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>
              Page {page} of {pages} · {total} message{total === 1 ? '' : 's'}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                disabled={page >= pages || loading}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* Detail drawer                                                    */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-white z-50 shadow-2xl flex flex-col"
              aria-label="Message details"
            >
              {/* Drawer header */}
              <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold text-slate-900 truncate">{selected.fullName}</h2>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_BADGES[selected.status]}`}>
                      {selected.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{selected.businessName}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer shrink-0"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                <div className="grid grid-cols-1 gap-2.5">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-[#C61A1A] shrink-0" />
                    <span className="text-sm text-slate-700 font-medium truncate group-hover:text-[#C61A1A]">
                      {selected.email}
                    </span>
                    <Send className="w-3.5 h-3.5 text-slate-300 ml-auto shrink-0" />
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-[#C61A1A] shrink-0" />
                    <span className="text-sm text-slate-700 font-medium truncate group-hover:text-[#C61A1A]">
                      {selected.phone}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 ml-auto shrink-0" />
                  </a>
                  {selected.website && (
                    <a
                      href={selected.website.startsWith('http') ? selected.website : `https://${selected.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 transition-colors group"
                    >
                      <Globe className="w-4 h-4 text-[#C61A1A] shrink-0" />
                      <span className="text-sm text-slate-700 font-medium truncate group-hover:text-[#C61A1A]">
                        {selected.website}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 ml-auto shrink-0" />
                    </a>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Interested Services
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.services.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-100 text-[#C61A1A] text-xs font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Project Description
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-4 whitespace-pre-wrap">
                    {selected.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <div>
                    <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Received</div>
                    <div className="mt-0.5 text-slate-700 font-medium">{formatDate(selected.createdAt)}</div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Source</div>
                    <div className="mt-0.5 text-slate-700 font-medium">{selected.source}</div>
                  </div>
                </div>

                {/* Status workflow */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Move to stage
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(['new', 'reviewed', 'contacted', 'closed'] as const).map((s) => (
                      <button
                        key={s}
                        disabled={selected.status === s || busyId === selected._id}
                        onClick={() => changeStatus(selected, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer disabled:cursor-default ${
                          selected.status === s
                            ? 'bg-[#C61A1A] border-[#C61A1A] text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-[#C61A1A]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="px-5 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => (confirmDelete ? removeMessage(selected) : setConfirmDelete(true))}
                  disabled={busyId === selected._id}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer disabled:opacity-60 ${
                    confirmDelete
                      ? 'bg-[#C61A1A] border-[#C61A1A] text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-[#C61A1A]'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {confirmDelete ? 'Confirm delete' : 'Delete'}
                </button>
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(`Your DIGIVIBZ Growth Audit — next steps`)}`}
                  className="dz-btn-shine inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold bg-[#C61A1A] hover:bg-[#9E1414] text-white transition-all"
                >
                  <Send className="w-3.5 h-3.5" /> Reply by email
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
