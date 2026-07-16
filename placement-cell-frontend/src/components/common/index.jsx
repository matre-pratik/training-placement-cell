import React from 'react';
import { Loader2, InboxIcon, AlertTriangle, Trash2, X } from 'lucide-react';
import { statusClass } from '../../utils/helpers';
import Modal from './Modal';


  // Spinner
export function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3">
      <Loader2
        size={32}
        className="animate-spin text-primary-600 sm:hidden"
      />
      <Loader2
        size={36}
        className="animate-spin text-primary-600 hidden sm:block"
      />
      <span className="text-xs sm:text-sm text-slate-400 font-medium">Loading...</span>
    </div>
  );
}


  // EmptyState
export function EmptyState({ icon, title = 'Nothing here', message = '' }) {
  const iconNode = icon ?? <InboxIcon size={40} className="text-slate-300" />;

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center gap-2 px-4">
      <div className="flex items-center justify-center text-4xl sm:text-5xl">
        {typeof iconNode === 'string' ? iconNode : iconNode}
      </div>
      <p className="font-semibold text-slate-600 text-sm sm:text-base">{title}</p>
      {message && (
        <p className="text-xs sm:text-sm text-slate-400 max-w-xs leading-relaxed">{message}</p>
      )}
    </div>
  );
}


  // StatusBadge
export function StatusBadge({ status }) {
  if (!status) return <span className="badge-slate text-xs">—</span>;
  return (
    <span className={`${statusClass(status)} text-xs sm:text-sm`}>
      {status}
    </span>
  );
}

  // ConfirmDialog
export function ConfirmDialog({ isOpen, onClose, onConfirm, message = 'Delete this item?' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete" size="sm">
      <div className="flex items-start gap-3 mb-5 sm:mb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={20} />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed pt-1">{message}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <button
          onClick={onConfirm}
          className="btn-danger flex-1 py-2.5 text-sm order-1 sm:order-none flex items-center justify-center gap-2"
        >
          <Trash2 size={15} /> Yes, Delete
        </button>
        <button
          onClick={onClose}
          className="btn-secondary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
        >
          <X size={15} /> Cancel
        </button>
      </div>
    </Modal>
  );
}