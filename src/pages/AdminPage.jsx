import React, { useState, useEffect, useCallback } from 'react';
import {
  Crown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Search,
  MessageSquare,
  DollarSign,
  Trash2,
  Check,
} from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'messages' | 'subscribers'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resStats, resBookings, resMessages, resSubscribers] = await Promise.all([
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/bookings').then(r => r.json()),
        fetch('/api/messages').then(r => r.json()),
        fetch('/api/subscribers').then(r => r.json()),
      ]);

      if (resStats.success) setStats(resStats.stats);
      if (resBookings.success) setBookings(resBookings.data);
      if (resMessages.success) setMessages(resMessages.data);
      if (resSubscribers.success) setSubscribers(resSubscribers.data);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchData();
    });
  }, [fetchData]);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    setActionLoading(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        // update local list
        setBookings(prev =>
          prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );
        // refresh stats
        fetch('/api/stats')
          .then(r => r.json())
          .then(d => d.success && setStats(d.stats));
      }
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to remove this booking from registry?')) return;
    setActionLoading(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
        fetch('/api/stats').then(r => r.json()).then(d => d.success && setStats(d.stats));
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleMessage = async (msgId, currentStatus) => {
    const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      const res = await fetch(`/api/messages/${msgId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev =>
          prev.map(m => (m.id === msgId ? { ...m, status: nextStatus } : m))
        );
        fetch('/api/stats').then(r => r.json()).then(d => d.success && setStats(d.stats));
      }
    } catch (err) {
      console.error('Message toggle error:', err);
    }
  };

  const handleDeleteMessage = async (msgId) => {
    try {
      await fetch(`/api/messages/${msgId}`, { method: 'DELETE' });
      setMessages(prev => prev.filter(m => m.id !== msgId));
    } catch (err) {
      console.error('Delete message error:', err);
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      searchQuery === '' ||
      (b.name || '').toLowerCase().includes(q) ||
      (b.phone || '').includes(searchQuery) ||
      (b.refCode || '').toLowerCase().includes(q) ||
      (b.serviceName || '').toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#d4af37]/20 text-[#f5d77f] border border-[#d4af37]/50">
            <CheckCircle2 className="w-3 h-3 text-[#d4af37]" />
            Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-950/70 text-emerald-400 border border-emerald-500/40">
            <Check className="w-3 h-3 text-emerald-400" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-red-950/60 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3 text-red-400" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-950/60 text-amber-300 border border-amber-500/40 animate-pulse">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            Pending Approval
          </span>
        );
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#080706] text-[#ede7dc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 border-b border-[#d4af37]/20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-1">
              <Crown className="w-4 h-4 text-[#f5d77f]" />
              <span>Executive Management</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#fdfbf7]">
              Atelier <span className="gold-gradient-text">Salon Registry</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-[#d4af37]/35 text-xs uppercase tracking-wider text-[#ede7dc] hover:bg-[#d4af37]/10 flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#d4af37] ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
            <span className="text-xs text-[#a99d8b] bg-[#120f0a] px-3.5 py-2.5 rounded-xl border border-[#d4af37]/20">
              Live Database Connected
            </span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
          <div className="gold-box-card rounded-2xl p-5 border border-[#d4af37]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#a99d8b]">Projected Revenue</span>
              <DollarSign className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl font-bold font-serif-luxury text-[#f5d77f]">
              {stats?.totalRevenueFormatted || '£0'}
            </div>
            <p className="text-[11px] text-[#8e8373] mt-1">From confirmed & completed sessions</p>
          </div>

          <div className="gold-box-card rounded-2xl p-5 border border-[#d4af37]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#a99d8b]">Pending Appointments</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-serif-luxury text-amber-300">
              {stats?.pendingCount || 0}
            </div>
            <p className="text-[11px] text-[#8e8373] mt-1">Awaiting manager confirmation</p>
          </div>

          <div className="gold-box-card rounded-2xl p-5 border border-[#d4af37]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#a99d8b]">Confirmed & Done</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-serif-luxury text-emerald-400">
              {(stats?.confirmedCount || 0) + (stats?.completedCount || 0)}
            </div>
            <p className="text-[11px] text-[#8e8373] mt-1">Locked salon bookings</p>
          </div>

          <div className="gold-box-card rounded-2xl p-5 border border-[#d4af37]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#a99d8b]">Unread Messages</span>
              <MessageSquare className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl font-bold font-serif-luxury text-[#f5eed3]">
              {stats?.unreadMessagesCount || 0}
            </div>
            <p className="text-[11px] text-[#8e8373] mt-1">Inquiries & bridal requests</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'gold-gradient-bg text-black shadow-md'
                  : 'bg-[#14100a] text-[#a99d8b] hover:text-[#ede7dc] border border-[#d4af37]/20'
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'messages'
                  ? 'gold-gradient-bg text-black shadow-md'
                  : 'bg-[#14100a] text-[#a99d8b] hover:text-[#ede7dc] border border-[#d4af37]/20'
              }`}
            >
              <span>Messages</span>
              {stats?.unreadMessagesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] flex items-center justify-center font-bold">
                  {stats.unreadMessagesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                activeTab === 'subscribers'
                  ? 'gold-gradient-bg text-black shadow-md'
                  : 'bg-[#14100a] text-[#a99d8b] hover:text-[#ede7dc] border border-[#d4af37]/20'
              }`}
            >
              Subscribers ({subscribers.length})
            </button>
          </div>

          {/* Search Bar if on bookings */}
          {activeTab === 'bookings' && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search client, phone, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#14100a] border border-[#d4af37]/25 rounded-xl pl-9 pr-4 py-2 text-xs text-[#ede7dc] focus:outline-none focus:border-[#d4af37] w-60"
                />
              </div>

              {/* Status filter dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#14100a] border border-[#d4af37]/25 rounded-xl px-3 py-2 text-xs text-[#ede7dc] focus:outline-none focus:border-[#d4af37]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab 1: Bookings Table */}
        {activeTab === 'bookings' && (
          <div className="gold-box-card rounded-2xl border border-[#d4af37]/30 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#18130b] text-[#d4af37] uppercase tracking-wider text-[10px] border-b border-[#d4af37]/20">
                  <tr>
                    <th className="p-4">Ref & Date</th>
                    <th className="p-4">Client Details</th>
                    <th className="p-4">Service & Rate</th>
                    <th className="p-4">Stylist & Notes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4af37]/10">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-[#8e8373]">
                        No bookings match your current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#16120b]/80 transition-colors">
                        <td className="p-4">
                          <span className="font-mono font-bold text-[#f5d77f] block text-xs">
                            {b.refCode}
                          </span>
                          <span className="text-[11px] text-[#cdc1b0] block mt-0.5">
                            {b.date} • {b.time}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="font-semibold text-[#fdfbf7] block">{b.name}</span>
                          <a
                            href={`tel:${b.phone}`}
                            className="text-[11px] text-[#a99d8b] hover:text-[#d4af37] block"
                          >
                            {b.phone}
                          </a>
                          {b.email && (
                            <span className="text-[10px] text-[#7d7364] block">{b.email}</span>
                          )}
                        </td>

                        <td className="p-4">
                          <span className="font-medium text-[#f5eed3] block">{b.serviceName}</span>
                          <span className="font-serif-luxury font-bold text-[#f5d77f] text-xs">
                            {b.price}
                          </span>
                        </td>

                        <td className="p-4 max-w-xs">
                          <span className="text-[11px] text-[#cdc1b0] block">{b.stylist}</span>
                          {b.notes ? (
                            <span className="text-[10px] text-[#8e8373] italic block mt-0.5 truncate">
                              "{b.notes}"
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#554e44]">—</span>
                          )}
                        </td>

                        <td className="p-4">
                          {getStatusBadge(b.status)}
                        </td>

                        <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                          {b.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                              disabled={actionLoading === b.id}
                              className="px-2.5 py-1 rounded bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f5d77f] hover:bg-[#d4af37] hover:text-black transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'completed')}
                              disabled={actionLoading === b.id}
                              className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-colors"
                            >
                              Complete
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                              disabled={actionLoading === b.id}
                              className="px-2.5 py-1 rounded border border-[#d4af37]/20 text-[#a99d8b] hover:text-red-400 hover:border-red-400 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-1 rounded text-[#645c50] hover:text-red-400 transition-colors inline-block align-middle"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Messages & Consultation Requests */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="p-12 text-center text-[#8e8373] gold-box-card rounded-2xl">
                No inquiries or consultation messages found.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    m.status === 'unread'
                      ? 'bg-[#18130b] border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'bg-[#120f0a] border-[#d4af37]/20 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-[#fdfbf7]">{m.name}</span>
                      <span className="text-xs text-[#a99d8b]">{m.phone}</span>
                      {m.email && <span className="text-xs text-[#7d7364]">({m.email})</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#f5d77f] px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30">
                        {m.location}
                      </span>
                      <button
                        onClick={() => handleToggleMessage(m.id, m.status)}
                        className="text-xs text-[#a99d8b] hover:text-[#ede7dc] px-2 py-0.5 rounded border border-[#d4af37]/20"
                      >
                        Mark as {m.status === 'unread' ? 'Read' : 'Unread'}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="text-[#645c50] hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-[#f5d77f] mb-1">{m.subject}</h4>
                  <p className="text-xs text-[#cdc1b0] leading-relaxed">{m.message}</p>
                  <span className="text-[10px] text-[#6d6455] block mt-3">
                    Received {new Date(m.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Newsletter Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="gold-box-card rounded-2xl border border-[#d4af37]/30 p-6">
            <h3 className="text-base font-bold font-serif-luxury text-[#fdfbf7] mb-4">
              VIP Guestbook & Newsletter List ({subscribers.length})
            </h3>
            <div className="divide-y divide-[#d4af37]/15">
              {subscribers.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                  <span className="text-[#f5eed3] font-medium">{s.email}</span>
                  <span className="text-[#7d7364]">
                    Subscribed on {new Date(s.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
