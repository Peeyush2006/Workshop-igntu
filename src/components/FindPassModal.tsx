'use client';

import React, { useState } from 'react';
import { X, Search, Loader2, AlertCircle } from 'lucide-react';
import { Registration } from '@/lib/types';
import DigitalPassView from './DigitalPassView';

interface FindPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FindPassModal({ isOpen, onClose }: FindPassModalProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pass, setPass] = useState<Registration | null>(null);

  if (!isOpen) return null;

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
        setError(data.error || 'No registration record found. Please verify your details.');
      } else {
        setPass(data.data);
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPass(null);
    setError('');
    setQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded border border-slate-300 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Retrieve Your Delegate Pass
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6">
          {pass ? (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                  Pass Record Found
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-2">
                  {pass.fullName}
                </h4>
              </div>
              <DigitalPassView registration={pass} onClose={handleClose} />
            </div>
          ) : (
            <form onSubmit={handleLookup} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your registered email address or Registration ID (e.g., <code className="font-mono text-slate-900 font-bold">VB2047-1001</code>).
              </p>

              {error && (
                <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registered Email or Reference ID
                </label>
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. name@igntu.ac.in or VB2047-..."
                  className="w-full px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 border border-blue-950"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Searching database...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-amber-400" />
                    <span>Find &amp; Display Pass</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
