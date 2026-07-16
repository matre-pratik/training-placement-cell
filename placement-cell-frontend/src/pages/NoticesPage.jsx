import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Bell,
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
  FileText,
  Save,
  X,
} from 'lucide-react';
import { noticeAPI } from '../api/api';
import Modal from '../components/common/Modal';
import { Spinner, EmptyState, ConfirmDialog } from '../components/common/index.jsx';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';

const EMPTY = { title: '', message: '', publishDate: '' };

export default function NoticesPage() {
  const { user }  = useAuth();
  const isAdmin   = user?.role === 'ADMIN';

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editId,  setEditId]  = useState(null);
  const [delId,   setDelId]   = useState(null);
  const [form,    setForm]    = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try { setNotices(await noticeAPI.getAll()); } catch { toast.error('Failed to load notices'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  function openAdd() { setEditId(null); setForm(EMPTY); setModal(true); }

  async function openEdit(id) {
    try {
      const n = await noticeAPI.getById(id);
      setEditId(id);
      setForm({ title: n.title || '', message: n.message || '', publishDate: n.publishDate || '' });
      setModal(true);
    } catch { toast.error('Could not load notice'); }
  }

  async function handleSave() {
    try {
      if (editId) await noticeAPI.update(editId, form);
      else        await noticeAPI.create(form);
      toast.success(editId ? 'Updated!' : 'Notice added!');
      setModal(false);
      load();
    } catch (err) { toast.error(err.message); }
  }

  async function handleDelete() {
    try {
      await noticeAPI.delete(delId);
      toast.success('Deleted!');
      setConfirm(false);
      load();
    } catch (err) { toast.error(err.message); }
  }

  const f = (k) => ({
    value: form[k],
    onChange: (e) => setForm(p => ({ ...p, [k]: e.target.value })),
  });

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="section-title text-lg sm:text-xl flex items-center gap-2">
          <Bell size={20} className="text-primary-600" />
          Notices
        </h2>
        {isAdmin && (
          <button
            onClick={openAdd}
            className="btn-primary w-full sm:w-auto px-5 py-2.5 text-sm flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            Add Notice
          </button>
        )}
      </div>

      {/* LIST */}
      {loading ? (
        <Spinner />
      ) : notices.length === 0 ? (
        <EmptyState
          icon={<Bell size={40} className="text-slate-300" />}
          title="No notices yet"
        />
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="card p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">

                {/* Content */}
                <div className="flex gap-3 min-w-0">
                  <div className="mt-0.5 shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Bell size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base leading-snug">
                      {n.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed break-words">
                      {n.message}
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                      <CalendarDays size={12} />
                      {formatDate(n.publishDate)}
                    </p>
                  </div>
                </div>

                {/* Admin actions */}
                {isAdmin && (
                  <div className="flex gap-2 shrink-0 sm:flex-col sm:items-end sm:gap-1">
                    <button
                      onClick={() => openEdit(n.id)}
                      className="flex items-center gap-1 text-primary-600 hover:text-primary-800 text-xs font-semibold transition-colors"
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      onClick={() => { setDelId(n.id); setConfirm(true); }}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-semibold transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editId ? 'Edit Notice' : 'Add Notice'}
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="label">Title</label>
            <div className="relative">
              <FileText size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input className="input w-full pl-9" placeholder="Notice title" {...f('title')} />
            </div>
          </div>
          <div>
            <label className="label">Message</label>
            <textarea rows={4} className="input w-full resize-none" placeholder="Message..." {...f('message')} />
          </div>
          <div>
            <label className="label">Publish Date</label>
            <div className="relative">
              <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input type="date" className="input w-full pl-9" {...f('publishDate')} />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button onClick={handleSave} className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2">
              <Save size={15} /> Save
            </button>
            <button onClick={() => setModal(false)} className="btn-secondary py-2.5 text-sm sm:w-auto flex items-center justify-center gap-2">
              <X size={15} /> Cancel
            </button>
          </div>
        </div>
      </Modal>


      <ConfirmDialog
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        message="Delete this notice?"
      />
    </div>
  );
}