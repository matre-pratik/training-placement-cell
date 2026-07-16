import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { jobAPI, applicationAPI } from "../api/api";
import Modal from "../components/common/Modal";
import {
  Spinner,
  EmptyState,
  ConfirmDialog,
} from "../components/common/index.jsx";
import { useAuth } from "../context/AuthContext";
import { today, formatDate } from "../utils/helpers";
import { Notebook } from "lucide-react";

const EMPTY_JOB = {
  jobTitle: "",
  jobRole: "",
  location: "",
  packageOffered: "",
  eligibility: "",
  lastDateToApply: "",
  jobDescription: "",
  companyId: "",
};

export default function JobsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const isCompany = user?.role === "COMPANY";
  const isStudent = user?.role === "STUDENT";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobModal, setJobModal] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [delId, setDelId] = useState(null);
  const [form, setForm] = useState(EMPTY_JOB);
  const [applyJob, setApplyJob] = useState(null);
  const [applyDate, setApplyDate] = useState(today());

  const load = async () => {
    setLoading(true);
    try {
      const res = await jobAPI.getAll();
      setJobs(res.content || []);
    } catch {
      toast.error("Failed to load jobs");
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditId(null);
    setForm({ ...EMPTY_JOB, companyId: isCompany ? user.companyId || "" : "" });
    setJobModal(true);
  }

  async function openEdit(id) {
    try {
      const j = await jobAPI.getById(id);
      setEditId(id);
      setForm({
        jobTitle: j.jobTitle || "",
        jobRole: j.jobRole || "",
        location: j.location || "",
        packageOffered: j.packageOffered || "",
        eligibility: j.eligibility || "",
        lastDateToApply: j.lastDateToApply || "",
        jobDescription: j.jobDescription || "",
        companyId: j.companyId || "",
      });
      setJobModal(true);
    } catch {
      toast.error("Error");
    }
  }

  async function handleSaveJob() {
    const companyId = isCompany
      ? user.companyId
      : parseInt(form.companyId) || null;

    if (!companyId) return toast.error("Company ID is required");

    const body = {
      ...form,
      packageOffered: parseFloat(form.packageOffered) || null,
      companyId,
    };
    try {
      if (editId) await jobAPI.update(editId, body);
      else await jobAPI.create(body);
      toast.success(editId ? "Job updated!" : "Job posted!");
      setJobModal(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await jobAPI.delete(delId);
      toast.success("Deleted!");
      setConfirm(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  function openApply(job) {
    setApplyJob(job);
    setApplyDate(today());
    setApplyModal(true);
  }

  async function handleApply() {
    if (!user.studentId)
      return toast.error("Student ID not found. Please re-login.");
    try {
      await applicationAPI.create({
        studentId: user.studentId,
        jobPostingId: applyJob.id,
        appliedDate: applyDate,
        applicationStatus: "APPLIED",
      });
      toast.success("Application submitted!");
      setApplyModal(false);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const f = (k) => ({
    value: form[k],
    onChange: (e) => setForm((p) => ({ ...p, [k]: e.target.value })),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">
          {isStudent ? "Browse Job Openings" : "Job Postings"}
        </h2>
        {(isAdmin || isCompany) && (
          <button onClick={openAdd} className="btn-primary">
            + Post Job
          </button>
        )}
      </div>

      {loading ? (
        <Spinner />
      ) : jobs.length === 0 ? (
        <EmptyState icon={<Notebook size={40}/> } title="No job postings available" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((j) => (
            <div key={j.id} className="card-hover p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-slate-800">{j.jobTitle}</p>
                  <p className="text-sm text-slate-500">{j.jobRole}</p>
                </div>
                <span className="badge-green text-nowrap">
                  ₹{j.packageOffered} LPA
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-400 mb-4">
                <div> {j.location || "—"}</div>
                <div> Eligibility: {j.eligibility || "—"}</div>
                <div> Last Date: {formatDate(j.lastDateToApply)}</div>
                {j.jobDescription && (
                  <p className="mt-1.5 line-clamp-2">{j.jobDescription}</p>
                )}
              </div>
              <div className="flex gap-2">
                {isStudent && (
                  <button
                    onClick={() => openApply(j)}
                    className="btn-primary btn-sm flex-1"
                  >
                    Apply Now
                  </button>
                )}
                {(isAdmin || isCompany) && (
                  <>
                    <button
                      onClick={() => openEdit(j.id)}
                      className="btn btn-secondary btn-sm flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDelId(j.id);
                        setConfirm(true);
                      }}
                      className="btn btn-danger btn-sm flex-1"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Form Modal */}
      <Modal
        isOpen={jobModal}
        onClose={() => setJobModal(false)}
        title={editId ? "Edit Job" : "Post New Job"}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Job Title</label>
            <input
              className="input"
              placeholder="e.g. Software Engineer"
              {...f("jobTitle")}
            />
          </div>
          <div>
            <label className="label">Job Role</label>
            <input
              className="input"
              placeholder="e.g. Backend Dev"
              {...f("jobRole")}
            />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" placeholder="City" {...f("location")} />
          </div>
          <div>
            <label className="label">Package (LPA)</label>
            <input
              type="number"
              className="input"
              placeholder="e.g. 8"
              {...f("packageOffered")}
            />
          </div>
          <div>
            <label className="label">Eligibility</label>
            <input
              className="input"
              placeholder="e.g. 60% & above"
              {...f("eligibility")}
            />
          </div>
          <div>
            <label className="label">Last Date to Apply</label>
            <input type="date" className="input" {...f("lastDateToApply")} />
          </div>

      
          {isAdmin && (
            <div>
              <label className="label">Company ID</label>
              <input
                type="number"
                className="input"
                placeholder="Company ID"
                {...f("companyId")}
              />
            </div>
          )}
          {isCompany && (
            <div>
              <label className="label">Company ID (auto)</label>
              <input
                className="input bg-slate-50 cursor-not-allowed"
                readOnly
                value={user.companyId || ""}
              />
            </div>
          )}

          <div className="col-span-2">
            <label className="label">Job Description</label>
            <textarea
              rows={3}
              className="input resize-none"
              placeholder="Describe the role..."
              {...f("jobDescription")}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSaveJob} className="btn-primary flex-1">
            Save Job
          </button>
          <button onClick={() => setJobModal(false)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </Modal>

      {/* Apply Modal */}
      <Modal
        isOpen={applyModal}
        onClose={() => setApplyModal(false)}
        title="Apply for Job"
        size="sm"
      >
        {applyJob && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 text-sm">
              <p className="font-semibold text-slate-800">
                {applyJob.jobTitle}
              </p>
              <p className="text-slate-500">
                {applyJob.jobRole} • {applyJob.location}
              </p>
              <p className="text-green-700 font-semibold mt-1">
                ₹{applyJob.packageOffered} LPA
              </p>
            </div>
            <div>
              <label className="label">Applied Date</label>
              <input
                type="date"
                className="input"
                value={applyDate}
                onChange={(e) => setApplyDate(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={handleApply} className="btn-primary flex-1">
                Submit Application
              </button>
              <button
                onClick={() => setApplyModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        message="Delete this job posting?"
      />
    </div>
  );
}
