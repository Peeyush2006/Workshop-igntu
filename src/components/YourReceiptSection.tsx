'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, AlertCircle, Ticket, ArrowRight } from 'lucide-react';
import { Registration } from '@/lib/types';
import DigitalPassView from './DigitalPassView';

interface YourReceiptSectionProps {
  onOpenRegister: () => void;
}

export default function YourReceiptSection({ onOpenRegister }: YourReceiptSectionProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pass, setPass] = useState<Registration | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setPass(null);

    try {
      const res = await fetch(`/api/lookup?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'No registration record found. Please verify your details or register below.');
      } else {
        setPass(data.data);
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="your-receipt" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
            Your receipt
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Already registered? Enter your email address or Registration ID to view, download, or print your official delegate pass and QR badge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Lookup Input Box */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Find Your Digital Pass
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter the email address you registered with, or your registration ID (e.g. <span className="font-mono text-slate-800 font-bold">VB2047-1001</span>).
            </p>

            <form onSubmit={handleLookup} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address or Registration ID
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. name@igntu.ac.in or VB2047-..."
                    className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] hover:bg-[#1557b0] font-medium leading-none text-white transition-all h-[46px] px-8 text-sm shadow-xs disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Locating Pass...</span>
                    </>
                  ) : (
                    <span>Find Receipt</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 font-medium leading-none text-slate-800 transition-all h-[46px] px-6 text-sm border border-slate-200"
                >
                  <Ticket className="w-4 h-4 mr-1.5 text-[#1A73E8]" />
                  <span>New Registration</span>
                </button>
              </div>
            </form>
          </div>

          {/* Pass Preview Column */}
          <div className="lg:col-span-6">
            {pass ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md"
              >
                <DigitalPassView registration={pass} />
              </motion.div>
            ) : (
              <div className="bg-white/60 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
                <Ticket className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <h4 className="text-sm font-bold text-slate-700 mb-1">
                  No Pass Loaded
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Search with your email or reference ID on the left, or register now to instantly view your QR code.
                </p>
                <button
                  onClick={onOpenRegister}
                  className="mt-4 text-xs font-bold text-[#1a73e8] hover:underline"
                >
                  Register Free Pass →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
