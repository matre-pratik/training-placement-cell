import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { companyAPI } from "../../api/api";
import Modal from "../../components/common/Modal";
import {
  Spinner,
  EmptyState,
  ConfirmDialog,
} from "../../components/common/index.jsx";
import { Building2, Mail, Phone, Globe } from "lucide-react";

const EMPTY = {
  companyName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  description: "",
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try {
      setCompanies(await companyAPI.getAll());
    } catch {
      toast.error("Failed to load");
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
      const c = await companyAPI.getById(id);
      setEditId(id);
      setForm({
        companyName: c.companyName || "",
        email: c.email || "",
        phone: c.phone || "",
        location: c.location || "",
        website: c.website || "",
        description: c.description || "",
      });
      setModal(true);
    } catch {
      toast.error("Error");
    }
  }

  async function handleSave() {
    try {
      if (editId) await companyAPI.update(editId, form);
      else await companyAPI.create(form);

      toast.success(editId ? "Updated!" : "Company added!");
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await companyAPI.delete(deleteId);
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
        <h2 className="section-title">All Companies</h2>
        <button onClick={openAdd} className="btn-primary">
          + Add Company
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : companies.length === 0 ? (
        <EmptyState icon={<Building2 size={40} />} title="No companies yet" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((c) => (
            <div key={c.id} className="card-hover p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 size={22} />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 truncate">
                    {c.companyName}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {c.location || "—"}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-sm text-slate-500 mb-4">
                <div className="truncate flex items-center gap-2">
                  <Mail size={14} />
                  {c.email || "—"}
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  {c.phone || "—"}
                </div>

                {c.website && (
                  <div className="truncate flex items-center gap-2">
                    <Globe size={14} />
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {c.website}
                    </a>
                  </div>
                )}

                {c.description && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(c.id)}
                  className="btn btn-secondary btn-sm flex-1"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setDeleteId(c.id);
                    setConfirm(true);
                  }}
                  className="btn btn-danger btn-sm flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editId ? "Edit Company" : "Add Company"}
      >
        <div className="grid grid-cols-2 gap-4">
          {[
            ["companyName", "Company Name", "text", "Company name"],
            ["email", "Email", "email", "company@email.com"],
            ["phone", "Phone", "text", "Phone"],
            ["location", "Location", "text", "City, State"],
            ["website", "Website", "text", "https://..."],
          ].map(([k, l, t, ph]) => (
            <div key={k}>
              <label className="label">{l}</label>
              <input type={t} className="input" placeholder={ph} {...f(k)} />
            </div>
          ))}

          <div className="col-span-2">
            <label className="label">Description</label>
            <textarea
              rows={3}
              className="input resize-none"
              placeholder="About company..."
              {...f("description")}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary flex-1">
            Save
          </button>

          <button
            onClick={() => setModal(false)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        message="Delete this company?"
      />
    </div>
  );
}