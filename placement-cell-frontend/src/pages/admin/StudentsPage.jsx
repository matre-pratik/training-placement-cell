import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { studentAPI } from "../../api/api";
import Modal from "../../components/common/Modal";
import {
  Spinner,
  EmptyState,
  StatusBadge,
  ConfirmDialog,
} from "../../components/common/index.jsx";
import { Users } from "lucide-react";

const EMPTY = {
  fullName: "",
  email: "",
  phone: "",
  course: "",
  percentage: "",
  passingYear: "",
  skills: "",
  status: "Unplaced",
};

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try {
      setStudents(await studentAPI.getAll());
    } catch {
      toast.error("Failed to load students");
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditId(null);
    setForm(EMPTY);
    setModal(true);
  }

  async function openEdit(id) {
    try {
      const s = await studentAPI.getById(id);
      setEditId(id);
      setForm({
        fullName: s.fullName || "",
        email: s.email || "",
        phone: s.phone || "",
        course: s.course || "",
        percentage: s.percentage || "",
        passingYear: s.passingYear || "",
        skills: s.skills || "",
        status: s.status || "Unplaced",
      });
      setModal(true);
    } catch {
      toast.error("Failed to load");
    }
  }

  async function handleSave() {
    const body = {
      ...form,
      percentage: parseFloat(form.percentage) || null,
      passingYear: parseInt(form.passingYear) || null,
    };
    try {
      if (editId) await studentAPI.update(editId, body);
      else await studentAPI.create(body);
      toast.success(editId ? "Updated!" : "Student added!");
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await studentAPI.delete(deleteId);
      toast.success("Deleted!");
      setConfirm(false);
      load();
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
        <h2 className="section-title">All Students</h2>
        <button onClick={openAdd} className="btn-primary">
          + Add Student
        </button>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <Spinner />
        ) : students.length === 0 ? (
          <EmptyState icon={<Users size={40} />} title="No students yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {[
                    "Name",
                    "Email",
                    "Course",
                    "%",
                    "Year",
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
                {students.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="td font-medium">{s.fullName || "—"}</td>
                    <td className="td text-slate-500">{s.email || "—"}</td>
                    <td className="td">{s.course || "—"}</td>
                    <td className="td">
                      {s.percentage != null ? `${s.percentage}%` : "—"}
                    </td>
                    <td className="td">{s.passingYear || "—"}</td>
                    <td className="td">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="td">
                      <button
                        onClick={() => openEdit(s.id)}
                        className="text-primary-600 hover:text-primary-800 text-xs font-semibold mr-3 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(s.id);
                          setConfirm(true);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline"
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
        title={editId ? "Edit Student" : "Add Student"}
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            ["fullName", "Full Name", "text", "Full name"],
            ["email", "Email", "email", "Email"],
            ["phone", "Phone", "text", "Phone"],
            ["course", "Course", "text", "e.g. B.Tech CSE"],
            ["percentage", "Percentage (%)", "number", "e.g. 85.5"],
            ["passingYear", "Passing Year", "number", "e.g. 2025"],
            ["skills", "Skills", "text", "Java, React..."],
          ].map(([k, l, t, ph]) => (
            <div key={k} className={k === "skills" ? "col-span-2" : ""}>
              <label className="label">{l}</label>
              <input type={t} className="input" placeholder={ph} {...f(k)} />
            </div>
          ))}
          <div>
            <label className="label">Status</label>
            <select className="input" {...f("status")}>
              <option value="Unplaced">Unplaced</option>
              <option value="Placed">Placed</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary flex-1">
            Save
          </button>
          <button onClick={() => setModal(false)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        message="This will permanently delete the student record."
      />
    </div>
  );
}
