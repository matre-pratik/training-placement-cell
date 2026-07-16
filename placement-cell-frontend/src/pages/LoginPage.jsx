import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Building2, GraduationCap, Trophy, Users } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: ''});

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password)
      return toast.error('Please fill all fields');

    setLoading(true);
    try {
      const data = await authAPI.login(form.email, form.password);
      login({
        token:     data.token,
        email:     data.email ?? form.email,
        fullName:  data.fullName ?? null,
        role:      data.role,
        studentId: data.studentId ?? null,
        companyId: data.companyId ?? null,
      });
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT PANEL (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 bg-amber-900 from-primary-900 via-primary-800 to-primary-600 flex-col justify-between p-10 xl:p-14 text-white">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-14">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl shrink-0">
              <GraduationCap/>
            </div>
            <span className="font-display text-xl font-bold">Placement Cell</span>
          </div>

          <h1 className="font-display text-4xl xl:text-5xl font-extrabold leading-tight mb-5">
            Training &amp;<br />Placement<br />Portal
          </h1>
          <p className="text-blue-200 text-base xl:text-lg max-w-sm leading-relaxed">
            Connecting students with top companies. Manage placements, track applications, and build careers.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 xl:gap-4 ">
          {[['Students', <Users/>], ['Companies', <Building2/>], ['Placements', <Trophy/>]].map(([l, i]) => (
            <div key={l} className="bg-white/10 rounded-2xl p-3 xl:p-4">
              <div className="mb-1">{i}</div>
              <div className="text-black font-bold text-xs xl:text-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-slate-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm sm:max-w-md">

          {/* Mobile-only */}
          <div className="lg:hidden text-center mb-8 flex justify-center ">
            <div className="mb-2 me-2 text-amber-950"><GraduationCap/></div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-primary-900">
              Training &amp; Placement Cell
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5 shadow-xl rounded-2xl">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                Welcome back 
              </h2>
              <p className="text-slate-500 text-sm mt-1">Login to your account</p>
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input w-full"
                placeholder="you@example.com"
                value={form.email}
                onChange={set('email')}
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Enter password"
                value={form.password}
                onChange={set('password')}
              />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex justify-center w-full py-3 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}<ArrowRight size={20}/>
            </button>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-black font-semibold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}