import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

// Admin pages
import AdminDashboard      from '../../pages/admin/AdminDashboard';
import StudentsPage        from '../../pages/admin/StudentsPage';
import CompaniesPage       from '../../pages/admin/CompaniesPage';
import ApplicationsPage    from '../../pages/admin/ApplicationsPage';
import PlacementPage       from '../../pages/admin/PlacementPage';

// Shared pages
import JobsPage            from '../../pages/JobsPage';
import NoticesPage         from '../../pages/NoticesPage';

// Student pages
import MyProfilePage       from '../../pages/student/MyProfilePage';
import MyApplicationsPage  from '../../pages/student/MyApplicationsPage';

// Company pages
import CompanyProfilePage  from '../../pages/company/CompanyProfilePage';
import MyJobsPage          from '../../pages/company/MyJobsPage';

const DEFAULT = {
  ADMIN:   'dashboard',
  STUDENT: 'my-profile',
  COMPANY: 'company-profile',
};

export default function DashboardLayout() {
  const { user } = useAuth();
  const def = DEFAULT[user?.role] || 'dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">

       {/* SIDEBAR  */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="min-h-screen pt-16 transition-all duration-300 lg:ml-72 lg:pt-0">

        {/* TOP HEADER  */}
        <header className="sticky top-0 z-30 border-b border-white/30 bg-white/70 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8">

            {/* Left — title (hidden on mobile where the hamburger lives) */}
            <div className="ml-2 lg:ml-0">
              <h1 className="text-xl font-black tracking-tight text-slate-800 sm:text-2xl">
                Dashboard
              </h1>
              <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">
                Welcome back, {user?.role}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex md:px-4">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-600 sm:text-sm">
                  System Active
                </span>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-base font-bold text-white shadow-lg sm:h-12 sm:w-12 sm:text-lg">
                {(user?.role || 'U')[0]}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-3 sm:p-5 md:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-white/40 bg-white/70 p-3 shadow-xl backdrop-blur-sm sm:rounded-3xl sm:p-5 md:p-6">

              <Routes>
                {/* DEFAULT */}
                <Route index element={<Navigate to={def} replace />} />

                {/* ADMIN */}
                <Route path="dashboard"         element={<AdminDashboard />}   />
                <Route path="students"           element={<StudentsPage />}     />
                <Route path="companies"          element={<CompaniesPage />}    />
                <Route path="applications"       element={<ApplicationsPage />} />
                <Route path="placement-records"  element={<PlacementPage />}    />

                {/* SHARED */}
                <Route path="jobs"     element={<JobsPage />}    />
                <Route path="notices"  element={<NoticesPage />} />

                {/* STUDENT */}
                <Route path="my-profile"      element={<MyProfilePage />}      />
                <Route path="my-applications" element={<MyApplicationsPage />} />

                {/* COMPANY */}
                <Route path="company-profile" element={<CompanyProfilePage />} />
                <Route path="my-jobs"         element={<MyJobsPage />}         />

                {/* FALLBACK */}
                <Route path="*" element={<Navigate to={def} replace />} />
              </Routes>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}