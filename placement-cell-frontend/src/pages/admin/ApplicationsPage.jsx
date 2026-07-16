import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { applicationAPI } from "../../api/api";
import Modal from "../../components/common/Modal";
import {
  Spinner,
  EmptyState,
  StatusBadge,
  ConfirmDialog,
} from "../../components/common/index.jsx";
import { formatDate } from "../../utils/helpers";

const STATUSES = ["APPLIED", "SHORTLISTED", "SELECTED", "REJECTED"];

export default function ApplicationsPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [sel, setSel] = useState(null);
  const [status, setStatus] = useState("APPLIED");
  const [delId, setDelId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setApps(await applicationAPI.getAll());
    } catch {
      toast.error("Failed");
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  function openStatus(app) {
    setSel(app);
    setStatus(app.applicationStatus || "APPLIED");
    setModal(true);
  }

  async function handleUpdate() {
    try {
      await applicationAPI.update(sel.id, {
        applicationStatus: status,
        studentId: sel.studentId,
        jobPostingId: sel.jobPostingId,
        appliedDate: sel.appliedDate,
      });
      toast.success("Status updated!");
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  
  async function handleDelete() {
    try {
      await applicationAPI.delete(delId);
      toast.success("Deleted!");
      setConfirm(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div>
      <h2 className="section-title mb-6">All Applications</h2>
      <div className="card overflow-hidden">
        {loading ? (
          <Spinner />
        ) : apps.length === 0 ? (
          <EmptyState icon="📝" title="No applications yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {[
                    "ID",
                    "Student ID",
                    "Job ID",
                    "Applied Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="th">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {apps.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="td font-medium">#{a.id}</td>
                    <td className="td text-slate-500">#{a.studentId}</td>
                    <td className="td text-slate-500">#{a.jobPostingId}</td>
                    <td className="td">{formatDate(a.appliedDate)}</td>
                    <td className="td">
                      <StatusBadge status={a.applicationStatus} />
                    </td>
                    <td className="td">
                      <button
                        onClick={() => openStatus(a)}
                        className="text-primary-600 hover:underline text-xs font-semibold mr-3"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setDelId(a.id);
                          setConfirm(true);
                        }}
                        className="text-red-500 hover:underline text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Update Application Status"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="label">Status</label>
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={handleUpdate} className="btn-primary flex-1">
              Update
            </button>
            <button onClick={() => setModal(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        message="Delete this application?"
      />
    </div>
  );
}
