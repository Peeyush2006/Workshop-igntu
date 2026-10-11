'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import DigitalPassView from '@/components/DigitalPassView';
import { Registration } from '@/lib/types';

interface PassDetailContentProps {
  passId: string;
}

export default function PassDetailContent({ passId }: PassDetailContentProps) {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!passId) return;

    const fetchPass = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/lookup?q=${encodeURIComponent(passId)}`);
        const data = await res.json();
        if (data.success) {
          setRegistration(data.data);
        } else {
          setError(data.error || 'Pass record not found.');
        }
      } catch (err) {
        setError('Failed to fetch pass information.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPass();
  }, [passId]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-md mx-auto mb-6 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white border border-slate-300 px-3 py-1.5 rounded transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Workshop Home</span>
        </Link>
      </div>

      <div className="max-w-md mx-auto">
        {isLoading ? (
          <div className="bg-white rounded p-8 text-center border border-slate-300 shadow-xs flex flex-col items-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-700 mb-2" />
            <p className="text-xs font-semibold text-slate-600">
              Retrieving Official Delegate Pass...
            </p>
          </div>
        ) : error ? (
          <div className="bg-white rounded p-6 text-center border border-rose-300 shadow-xs">
            <AlertCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
            <h2 className="text-sm font-bold text-slate-900 mb-1">
              Pass Not Found
            </h2>
            <p className="text-xs text-slate-500 mb-4">{error}</p>
            <Link
              href="/"
              className="px-3 py-1.5 bg-blue-900 text-white rounded text-xs font-bold inline-block"
            >
              Go to Homepage
            </Link>
          </div>
        ) : registration ? (
          <DigitalPassView registration={registration} />
        ) : null}
      </div>
    </div>
  );
}
