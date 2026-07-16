import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { studentAPI } from '../../api/api';
import Modal from '../../components/common/Modal';
import { Spinner, StatusBadge } from '../../components/common/index.jsx';
import { useAuth } from '../../context/AuthContext';
import { Users } from 'lucide-react';

export default function MyProfilePage() {
  const { user }  = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState({});

  const sid = user?.studentId;

  const load = async () => {
    if (!sid) { setLoading(false); return; }
    try {
      const s = await studentAPI.getById(sid);
      setStudent(s);
      setForm({ fullName:s.fullName||'', phone:s.phone||'', course:s.course||'',
        percentage:s.percentage||'', passingYear:s.passingYear||'', skills:s.skills||'' });
    } catch { toast.error('Failed to load profile. Please contact admin.'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, [sid]);

  async function handleSave() {
    try {
      await studentAPI.update(sid, {
        ...form,
        email:       student.email,
        status:      student.status,
        percentage:  parseFloat(form.percentage) || null,
        passingYear: parseInt(form.passingYear)  || null,
      });
      toast.success('Profile updated!');
      setModal(false); load();
    } catch (err) { toast.error(err.message); }
  }

  const f = (k) => ({ value: form[k]||'', onChange: e => setForm(p => ({...p, [k]: e.target.value})) });

  if (loading) return <Spinner />;
  if (!sid)    return <div className="card p-8 text-center text-slate-400">Student ID not found. Please logout and login again.</div>;
  if (!student) return <div className="card p-8 text-center text-slate-400">Profile not found. Contact admin.</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-3xl shrink-0"><Users size={40}/></div>
          <div>
            <h2 className="font-display font-bold text-xl text-slate-800">{student.fullName}</h2>
            <p className="text-slate-500 text-sm">{student.email}</p>
            <div className="mt-1"><StatusBadge status={student.status} /></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[['Phone', student.phone], ['Course', student.course],
            ['Percentage', student.percentage != null ? `${student.percentage}%` : '—'],
            ['Passing Year', student.passingYear],
            ['Skills', student.skills]].map(([l, v]) => (
            <div key={l} className={`bg-slate-50 rounded-xl p-3 ${l==='Skills'?'col-span-2':''}`}>
              <p className="text-xs text-slate-400 mb-0.5">{l}</p>
              <p className="font-medium text-sm text-slate-700">{v||'—'}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setModal(true)} className="btn-primary">Edit Profile</button>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Edit My Profile">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Full Name</label><input className="input" {...f('fullName')} /></div>
          <div><label className="label">Phone</label><input className="input" {...f('phone')} /></div>
          <div><label className="label">Course</label><input className="input" {...f('course')} /></div>
          <div><label className="label">Percentage (%)</label><input type="number" className="input" {...f('percentage')} /></div>
          <div><label className="label">Passing Year</label><input type="number" className="input" {...f('passingYear')} /></div>
          <div><label className="label">Skills</label><input className="input" placeholder="Java, React..." {...f('skills')} /></div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={handleSave} className="btn-primary flex-1">Save Changes</button>
          <button onClick={() => setModal(false)} className="btn-secondary">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
