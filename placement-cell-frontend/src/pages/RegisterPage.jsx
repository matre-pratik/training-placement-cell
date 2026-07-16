import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authAPI } from '../api/api';
import { Building2, Users } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
    role:            'STUDENT',
    // Student fields
    phone:           '',
    course:          '',
    percentage:      '',
    passingYear:     '',
    skills:          '',
    // Company fields
    location:        '',
    website:         '',
    description:     '',
  });

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password)
      return toast.error('Please fill all fields');
    if (form.password !== form.confirmPassword)
      return toast.error('Passwords do not match');

    setLoading(true);
    try {
      await authAPI.register(form);
      toast.success('Registered successfully! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8 sm:p-8">
      <div className="w-full max-w-sm sm:max-w-md">

        {/* Brand header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-5xl mb-2">🎓</div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-primary-900">
            Training &amp; Placement Cell
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="card p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-xl rounded-2xl">
          
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-800">Create Account</h2>
            <p className="text-slate-500 text-sm mt-1">Fill in the details below</p>
          </div>

          {/* Role */}
          <div>
            <label className="label">Register As</label>
            <select className="input w-full" value={form.role} onChange={set('role')}>
              <option value="STUDENT">Student</option>
              <option value="COMPANY">Company</option>
            </select>
          </div>

          {/* Full name / company name */}
          <div>
            <label className="label">
              {form.role === 'COMPANY' ? 'Company Name' : 'Full Name'}
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder={form.role === 'COMPANY' ? 'Your company name' : 'Your full name'}
              value={form.fullName}
              onChange={set('fullName')}
            />
          </div>

          {/* Email */}
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

          {/* Password row — stacked on mobile, side-by-side on sm+ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Create password"
                value={form.password}
                onChange={set('password')}
              />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
              />
            </div>
          </div>

          {/* STUDENT EXTRA FIELDS */}
          {form.role === 'STUDENT' && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>
                <div>
                  <label className="label">Course</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="BCA / MCA / BTech"
                    value={form.course}
                    onChange={set('course')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Percentage</label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="75"
                    value={form.percentage}
                    onChange={set('percentage')}
                  />
                </div>
                <div>
                  <label className="label">Passing Year</label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="2025"
                    value={form.passingYear}
                    onChange={set('passingYear')}
                  />
                </div>
              </div>

              <div>
                <label className="label">Skills</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Java, React, MySQL"
                  value={form.skills}
                  onChange={set('skills')}
                />
              </div>
            </>
          )}

          {/* COMPANY EXTRA FIELDS */}
          {form.role === 'COMPANY' && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Company phone"
                    value={form.phone}
                    onChange={set('phone')}
                  />
                </div>
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Mumbai"
                    value={form.location}
                    onChange={set('location')}
                  />
                </div>
              </div>

              <div>
                <label className="label">Website</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="https://company.com"
                  value={form.website}
                  onChange={set('website')}
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  rows={3}
                  className="input w-full resize-none"
                  placeholder="Company description"
                  value={form.description}
                  onChange={set('description')}
                />
              </div>
            </>
          )}

          {/* Info box */}
          <div className="flex justify-center bg-primary-50 border border-primary-100 rounded-xl px-4 py-3 text-xs text-black">
            {form.role === 'STUDENT'
              ? 'A student profile will be created automatically for you.'
              : 'A company profile will be created automatically for you.'}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Register →'}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}