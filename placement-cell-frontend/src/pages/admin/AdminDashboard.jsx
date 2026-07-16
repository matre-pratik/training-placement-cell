import React, { useEffect, useState } from 'react';
import { studentAPI, companyAPI, jobAPI, placementAPI, noticeAPI } from '../../api/api';
import { Spinner } from '../../components/common/index.jsx';
import { formatDate } from '../../utils/helpers';
import {
  GraduationCap,
  Building2,
  CheckCircle,
  Briefcase,
  Bell,
} from 'lucide-react';

function StatCard({ value, label, icon: Icon, accent = 'border-l-primary-700' }) {
  return (
    <div className={`card p-5 border-l-4 ${accent}`}>
      <div className="font-display text-3xl font-bold text-slate-800">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
      <div className="mt-2">
        <Icon size={22} />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    placed: 0,
    jobs: 0,
  });

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [students, companies, records, jobs, notices] = await Promise.all([
          studentAPI.getAll(),
          companyAPI.getAll(),
          placementAPI.getAll(),
          jobAPI.getAll(),
          noticeAPI.getAll(),
        ]);

        setStats({
          students: students.length,
          companies: companies.length,
          placed: records.length,
          jobs: jobs.content?.length ?? 0,
        });

        setNotices(notices.slice(0, 4));
      } catch {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="section-title mb-5">Overview</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            value={stats.students}
            label="Total Students"
            icon={GraduationCap}
            accent="border-l-primary-700"
          />

          <StatCard
            value={stats.companies}
            label="Companies"
            icon={Building2}
            accent="border-l-amber-500"
          />

          <StatCard
            value={stats.placed}
            label="Placed Students"
            icon={CheckCircle}
            accent="border-l-green-500"
          />

          <StatCard
            value={stats.jobs}
            label="Job Postings"
            icon={Briefcase}
            accent="border-l-purple-500"
          />
        </div>
      </div>

      <div className="card p-6">
        <h2 className="section-title mb-4 flex items-center gap-2">
          <Bell size={20} />
          Recent Notices
        </h2>

        {notices.length === 0 ? (
          <p className="text-sm text-slate-400">No notices yet.</p>
        ) : (
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="flex gap-3 p-4 bg-blue-50 rounded-xl">
                <Bell size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />

                <div>
                  <p className="font-semibold text-slate-700 text-sm">{n.title}</p>

                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {n.message}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    📅 {formatDate(n.publishDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}