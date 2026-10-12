'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Ticket, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ParticipantRole, Registration } from '@/lib/types';
import DigitalPassView from '@/components/DigitalPassView';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: 'Indira Gandhi National Tribal University',
    role: 'UG Student' as ParticipantRole,
    department: 'Department of Computer Science',
    idNumber: '',
    reasonForAttending: '',
    accommodationRequired: 'No' as 'Yes' | 'No',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registeredPass, setRegisteredPass] = useState<Registration | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to complete registration.');
        setIsLoading(false);
        return;
      }

      setRegisteredPass(data.data);
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto mb-6 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white border border-slate-300 px-3 py-1.5 rounded transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Workshop Home</span>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded border border-slate-300 p-6 sm:p-8 shadow-xs">
        {registeredPass ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Registration Confirmed</span>
              </div>
              <h2 className="text-xl font-bold text-slate-950">
                Welcome, {registeredPass.fullName}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Your official delegate entry pass is ready. Please save or print this QR pass.
              </p>
            </div>

            <DigitalPassView registration={registeredPass} />
          </div>
        ) : (
          <div>
            <div className="mb-6 pb-4 border-b border-slate-200">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Ticket className="w-3.5 h-3.5 text-blue-900" />
                <span>Official Workshop Registration (Free)</span>
              </div>
              <h1 className="text-2xl font-black text-slate-950 tracking-tight">
                AI for Viksit Bharat @ 2047
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Department of Computer Science | Indira Gandhi National Tribal University, Amarkantak
              </p>
              <div className="mt-2 text-xs font-bold text-slate-900">
                14 October 2026 | Prof. Laxman Havnoor Auditorium
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700">
                Official certificates of participation will be issued at the valedictory session for all registered participants with verified attendance on 14 October 2026.
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ramesh@example.com"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Participant Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 bg-white"
                  >
                    <option value="UG Student">Undergraduate (UG) Student</option>
                    <option value="PG Student">Postgraduate (PG) Student</option>
                    <option value="PhD Scholar">PhD Research Scholar</option>
                    <option value="Faculty Member">Faculty Member</option>
                    <option value="Industry Professional">Industry Professional</option>
                    <option value="Invited Guest">Invited Guest</option>
                  </select>
                </div>
              </div>

              {/* Institution & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    name="institution"
                    required
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="IGNTU Amarkantak"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department of Computer Science"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                  />
                </div>
              </div>

              {/* Roll No & Accommodation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Roll No / Employee ID *
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    required
                    value={formData.idNumber}
                    onChange={handleChange}
                    placeholder="e.g. 23BCACS042"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Accommodation Required?
                  </label>
                  <select
                    name="accommodationRequired"
                    value={formData.accommodationRequired}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 bg-white"
                  >
                    <option value="No">No (Self-arranged / Local)</option>
                    <option value="Yes">Yes (University Guest House Guidance)</option>
                  </select>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Academic Interest / Motivation (Optional)
                </label>
                <textarea
                  name="reasonForAttending"
                  rows={2}
                  value={formData.reasonForAttending}
                  onChange={handleChange}
                  placeholder="Share your interests in AI, DevOps, MLOps, or research topics..."
                  className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 border border-blue-950"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 text-amber-400" />
                      <span>Submit Registration &amp; Get Pass</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
