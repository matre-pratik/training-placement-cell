import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  // Close on Escape key
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClass = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }[size] ?? 'max-w-lg';

  return createPortal(
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-end sm:items-center justify-center
        p-3 sm:p-4 md:p-6
        bg-black/50 
      "
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`
          bg-white w-full ${widthClass}
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl flex flex-col
          max-h-[85vh] sm:max-h-[90vh]
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 border-b border-slate-100 shrink-0">
          <h3 className="font-display font-bold text-base sm:text-lg text-slate-800 leading-snug">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="
              w-8 h-8 flex items-center justify-center
              rounded-lg text-slate-400
              hover:text-slate-700 hover:bg-slate-100
              transition-colors
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body   
  );
}