import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import {
  Bell,
  Briefcase,
  Building2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Trophy,
  Users,
  X,
} from 'lucide-react';

const MENUS = {
  ADMIN: [
    { to: 'dashboard',         icon: LayoutDashboard, label: 'Dashboard',         color: 'text-blue-500'   },
    { to: 'students',          icon: Users,           label: 'Students',           color: 'text-emerald-500'},
    { to: 'companies',         icon: Building2,       label: 'Companies',          color: 'text-violet-500' },
    { to: 'jobs',              icon: Briefcase,       label: 'Job Postings',       color: 'text-orange-500' },
    { to: 'applications',      icon: FileText,        label: 'Applications',       color: 'text-cyan-500'   },
    { to: 'notices',           icon: Bell,            label: 'Notices',            color: 'text-rose-500'   },
    { to: 'placement-records', icon: Trophy,          label: 'Placement Records',  color: 'text-yellow-500' },
  ],
  STUDENT: [
    { to: 'my-profile',      icon: Users,    label: 'My Profile',      color: 'text-emerald-500'},
    { to: 'jobs',            icon: Search,   label: 'Browse Jobs',     color: 'text-blue-500'   },
    { to: 'my-applications', icon: FileText, label: 'My Applications', color: 'text-cyan-500'   },
    { to: 'notices',         icon: Bell,     label: 'Notices',         color: 'text-rose-500'   },
  ],
  COMPANY: [
    { to: 'company-profile', icon: Building2, label: 'Company Profile',  color: 'text-violet-500' },
    { to: 'my-jobs',         icon: Briefcase, label: 'My Job Postings',  color: 'text-orange-500' },
    { to: 'applications',    icon: FileText,  label: 'Applications',     color: 'text-cyan-500'   },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menu = MENUS[user?.role] || [];

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const sidebarContent = (
    <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl">

      {/* ── LOGO ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg sm:h-14 sm:w-14">
            <GraduationCap size={22} className="sm:hidden" />
            <GraduationCap size={28} className="hidden sm:block" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-slate-800 sm:text-lg">
              Training &
            </h1>
            <p className="text-xs font-semibold text-slate-500 sm:text-sm">
              Placement Cell
            </p>
          </div>
        </div>

        {/* Close button — mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5">
        <div className="space-y-1 sm:space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={`/dashboard/${item.to}`}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:gap-4 sm:px-4 sm:py-3
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 sm:h-10 sm:w-10
                        ${isActive
                          ? 'bg-white/20 text-white'
                          : `bg-slate-100 group-hover:bg-white ${item.color}`
                        }`}
                    >
                      <Icon size={18} strokeWidth={2} className="sm:hidden" />
                      <Icon size={20} strokeWidth={2} className="hidden sm:block" />
                    </div>
                    <span className="text-sm font-semibold tracking-wide">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ── USER + LOGOUT ─────────────────────────────────────── */}
      <div className="border-t border-slate-100 p-3 sm:p-4">
        <div className="mb-3 rounded-2xl bg-slate-50 p-3 shadow-sm sm:mb-4 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-base font-bold text-white shadow-md sm:h-12 sm:w-12 sm:text-lg">
              {(user?.role || 'U')[0]}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xs font-bold text-slate-800 sm:text-sm">
                {user?.email}
              </h3>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg sm:py-3"
        >
          <LogOut size={16} className="sm:hidden" />
          <LogOut size={18} className="hidden sm:block" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* ── MOBILE HAMBURGER ─────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-md text-slate-700 transition hover:bg-slate-50 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* ── MOBILE BACKDROP ──────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ────────────────────────────────────── */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform transition-transform duration-300 ease-in-out lg:hidden
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {sidebarContent}
      </div>

      {/* ── DESKTOP SIDEBAR (always visible ≥ lg) ────────────── */}
      <div className="fixed left-0 top-0 z-50 hidden h-screen w-72 lg:block">
        {sidebarContent}
      </div>
    </>
  );
}