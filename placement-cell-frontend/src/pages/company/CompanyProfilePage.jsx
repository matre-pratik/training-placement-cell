import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { companyAPI } from "../../api/api";
import Modal from "../../components/common/Modal";
import { Spinner } from "../../components/common/index.jsx";
import { useAuth } from "../../context/AuthContext";
import { Edit } from "lucide-react";

export default function CompanyProfilePage() {
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({});

  const cid = user?.companyId;

  const load = async () => {
    if (!cid) {
      setLoading(false);
      return;
    }
    try {
      const c = await companyAPI.getById(cid);
      setCompany(c);
      setForm({
        companyName: c.companyName || "",
        phone: c.phone || "",
        location: c.location || "",
        website: c.website || "",
        description: c.description || "",
      });
    } catch {
      toast.error("Failed to load company profile");
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, [cid]);

  async function handleSave() {
    try {
      await companyAPI.update(cid, { ...form, email: company.email });
      toast.success("Profile updated!");
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  const f = (k) => ({
    value: form[k] || "",
    onChange: (e) => setForm((p) => ({ ...p, [k]: e.target.value })),
  });

  if (loading) return <Spinner />;
  if (!cid)
    return (
      <div className="card p-8 text-center text-slate-400">
        Company ID not found. Please logout and login again.
      </div>
    );
  if (!company)
    return (
      <div className="card p-8 text-center text-slate-400">
        Profile not found. Contact admin.
      </div>
    );

  return (
    <div className="max-w-2xl space-y-6">
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
            🏢
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-slate-800">
              {company.companyName}
            </h2>
            <p className="text-slate-500 text-sm">{company.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Phone", company.phone],
            ["Location", company.location],
            ["Website", company.website],
            ["Description", company.description],
          ].map(([l, v]) => (
            <div
              key={l}
              className={`bg-slate-50 rounded-xl p-3 ${l === "Description" ? "col-span-2" : ""}`}
            >
              <p className="text-xs text-slate-400 mb-0.5">{l}</p>
              <p className="font-medium text-sm text-slate-700">{v || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setModal(true)} className="btn-primary">
        Edit Profile
      </button>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Edit Company Profile"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Company Name</label>
            <input className="input" {...f("companyName")} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" {...f("phone")} />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" {...f("location")} />
          </div>
          <div>
            <label className="label">Website</label>
            <input className="input" {...f("website")} />
          </div>
          <div className="col-span-2">
            <label className="label">Description</label>
            <textarea
              rows={3}
              className="input resize-none"
              {...f("description")}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary flex-1">
            Save Changes
          </button>
          <button onClick={() => setModal(false)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
