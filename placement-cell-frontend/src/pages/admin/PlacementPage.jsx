import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { placementAPI } from '../../api/api';
import Modal from '../../components/common/Modal';
import { Spinner, EmptyState, ConfirmDialog } from '../../components/common/index.jsx';
import { formatDate } from '../../utils/helpers';
import { Trophy } from 'lucide-react';

const EMPTY = { studentId:'', companyName:'', jobRole:'', packageOffered:'', joiningDate:'' };

export default function PlacementPage() {
  const [records,  setRecords]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [confirm,  setConfirm]  = useState(false);
  const [editId,   setEditId]   = useState(null);
  const [delId,    setDelId]    = useState(null);
  const [form,     setForm]     = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try { setRecords(await placementAPI.getAll()); } catch { toast.error('Failed'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  function openAdd() { setEditId(null); setForm(EMPTY); setModal(true); }

  async function openEdit(id) {
    try {
      const r = await placementAPI.getById(id);
      setEditId(id);
      setForm({ studentId:r.studentId||'', companyName:r.companyName||'',
        jobRole:r.jobRole||'', packageOffered:r.packageOffered||'', joiningDate:r.joiningDate||'' });
      setModal(true);
    } catch { toast.error('Error'); }
  }

  async function handleSave() {
    const body = { ...form, studentId: parseInt(form.studentId)||null, packageOffered: parseFloat(form.packageOffered)||null };
    try {
      if (editId) await placementAPI.update(editId, body);
      else        await placementAPI.create(body);
      toast.success(editId ? 'Updated!' : 'Record added!');
      setModal(false); load();
    } catch (err) { toast.error(err.message); }
  }

  async function handleDelete() {
    try { await placementAPI.delete(delId); toast.success('Deleted!'); setConfirm(false); load(); }
    catch (err) { toast.error(err.message); }
  }

  const f = (k) => ({ value: form[k], onChange: e => setForm(p => ({...p, [k]: e.target.value})) });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Placement Records</h2>
        <button onClick={openAdd} className="btn-primary">+ Add Record</button>
      </div>

      <div className="card overflow-hidden">
        {loading ? <Spinner /> : records.length === 0
          ? <EmptyState icon={<Trophy size={40} />} title="No placement records yet" />
          : <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Student ID','Company','Role','Package','Joining Date','Actions'].map(h =>
                      <th key={h} className="th">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="td font-medium">#{r.studentId}</td>
                      <td className="td">{r.companyName||'—'}</td>
                      <td className="td text-slate-500">{r.jobRole||'—'}</td>
                      <td className="td text-green-700 font-semibold">{r.packageOffered} LPA</td>
                      <td className="td">{formatDate(r.joiningDate)}</td>
                      <td className="td">
                        <button onClick={() => openEdit(r.id)} className="text-primary-600 hover:underline text-xs font-semibold mr-3">Edit</button>
                        <button onClick={() => { setDelId(r.id); setConfirm(true); }} className="text-red-500 hover:underline text-xs font-semibold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Edit Record' : 'Add Placement Record'}>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Student ID</label><input type="number" className="input" placeholder="Student ID" {...f('studentId')} /></div>
          <div><label className="label">Company Name</label><input className="input" placeholder="Company" {...f('companyName')} /></div>
          <div><label className="label">Job Role</label><input className="input" placeholder="Role" {...f('jobRole')} /></div>
          <div><label className="label">Package (LPA)</label><input type="number" className="input" placeholder="e.g. 10" {...f('packageOffered')} /></div>
          <div className="col-span-2"><label className="label">Joining Date</label><input type="date" className="input" {...f('joiningDate')} /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary flex-1">Save</button>
          <button onClick={() => setModal(false)} className="btn-secondary">Cancel</button>
        </div>
      </Modal>

      <ConfirmDialog isOpen={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} message="Delete this placement record?" />
    </div>
  );
}
