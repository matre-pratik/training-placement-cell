import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { applicationAPI } from "../../api/api";
import {
  Spinner,
  EmptyState,
  StatusBadge,
} from "../../components/common/index.jsx";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/helpers";
import { Notebook } from "lucide-react";

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const all = await applicationAPI.getAll();
        setApps(
          all.filter((a) => Number(a.studentId) === Number(user?.studentId)),
        );
      } catch {
        toast.error("Failed to load");
      }
      setLoading(false);
    })();
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="section-title mb-6">My Applications</h2>
      {apps.length === 0 ? (
        <EmptyState
          icon={<Notebook size={40}/>}
          title="No applications yet"
          message="Browse jobs and apply!"
        />
      ) : (
        <div className="space-y-3">
          {apps.map((a) => (
            <div
              key={a.id}
              className="card p-5 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-slate-700">
                  Job #{a.jobPostingId}
                </p>
                <p className="text-sm text-slate-400 mt-0.5">
                  Applied: {formatDate(a.appliedDate)}
                </p>
              </div>
              <StatusBadge status={a.applicationStatus} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
