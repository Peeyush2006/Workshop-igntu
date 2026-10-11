'use client';

import React, { useState } from 'react';
import { X, Ticket, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { ParticipantRole, Registration, SeatStats } from '@/lib/types';
import DigitalPassView from './DigitalPassView';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  seats?: SeatStats;
  onRegistered?: (updatedSeats?: SeatStats) => void;
}

export default function RegisterModal({ isOpen, onClose, seats, onRegistered }: RegisterModalProps) {
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

  if (!isOpen) return null;

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
      if (data.seats && onRegistered) {
        onRegistered(data.seats);
      } else if (onRegistered) {
        onRegistered();
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setRegisteredPass(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded border border-slate-300 shadow-xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {registeredPass ? 'Your Official Delegate Pass' : 'Participant Registration'}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {registeredPass ? (
            <div className="space-y-4">
              <div className="text-center mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Registration Confirmed</span>
                </div>
                <h4 className="text-xl font-bold text-slate-950">
                  Welcome, {registeredPass.fullName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your entry pass is generated below. Present this QR code on 14 October 2026.
                </p>
              </div>

              <DigitalPassView
                registration={registeredPass}
                onClose={handleResetAndClose}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700">
                <strong>Free Academic Registration:</strong> Open for eligible students, research scholars, and faculty members. Present digital or printed pass on 14 October 2026 for physical check-in.
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
                    Phone Number *
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

              {/* Roll / Employee ID & Accommodation */}
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
                    Accommodation Needed?
                  </label>
                  <select
                    name="accommodationRequired"
                    value={formData.accommodationRequired}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 bg-white"
                  >
                    <option value="No">No (Local / Self-arranged)</option>
                    <option value="Yes">Yes (University Guest House Guidance)</option>
                  </select>
                </div>
              </div>

              {/* Reason for attending */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Academic Interest / Motivation (Optional)
                </label>
                <textarea
                  name="reasonForAttending"
                  rows={2}
                  value={formData.reasonForAttending}
                  onChange={handleChange}
                  placeholder="Share your interest in AI, research questions, or career goals..."
                  className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                />
              </div>

              {/* Submit CTA */}
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
                      <span>Complete Registration &amp; Get Pass</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
