'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Printer,
  Copy,
  Check,
  Calendar,
  MapPin,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { Registration } from '@/lib/types';

interface DigitalPassViewProps {
  registration: Registration;
  onClose?: () => void;
}

export default function DigitalPassView({ registration, onClose }: DigitalPassViewProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(registration.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roleColors: Record<string, string> = {
    'UG Student': 'bg-slate-100 text-slate-900 border-slate-300',
    'PG Student': 'bg-blue-50 text-blue-900 border-blue-200',
    'PhD Scholar': 'bg-amber-50 text-amber-900 border-amber-300',
    'Faculty Member': 'bg-emerald-50 text-emerald-900 border-emerald-300',
    'Industry Professional': 'bg-slate-100 text-slate-800 border-slate-300',
    'Invited Guest': 'bg-blue-100 text-blue-950 border-blue-300',
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Official Delegate Credential Badge */}
      <div
        id="digital-pass-card"
        className="bg-white rounded border-2 border-slate-900 shadow-md overflow-hidden relative"
      >
        {/* Pass Top Banner */}
        <div className="bg-slate-900 text-white p-4 text-center border-b border-slate-800">
          <div className="inline-block px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-1.5">
            Official Delegate E-Pass
          </div>
          <h3 className="text-base font-bold tracking-tight leading-tight">
            AI for Viksit Bharat @ 2047
          </h3>
          <p className="text-[11px] text-slate-300 font-medium mt-0.5">
            Department of Computer Science | IGNTU Amarkantak
          </p>
        </div>

        {/* Center QR Code Section */}
        <div className="p-6 flex flex-col items-center bg-white">
          <div className="p-3 bg-white border border-slate-300 rounded mb-4">
            {registration.qrCodeDataUrl ? (
              <Image
                src={registration.qrCodeDataUrl}
                alt={`QR Pass for ${registration.fullName}`}
                width={180}
                height={180}
                className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                unoptimized
              />
            ) : (
              <div className="w-44 h-44 flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
                Generating QR...
              </div>
            )}
          </div>

          {/* Participant Info */}
          <div className="text-center w-full">
            <span
              className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold border mb-2 ${
                roleColors[registration.role] || 'bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              {registration.role}
            </span>

            <h4 className="text-xl font-black text-slate-900 tracking-tight">
              {registration.fullName}
            </h4>

            <p className="text-xs font-semibold text-blue-900 mt-1 line-clamp-1">
              {registration.institution}
            </p>
            <p className="text-[11px] text-slate-600 line-clamp-1">
              {registration.department} | ID: {registration.idNumber}
            </p>
          </div>

          {/* Registration Pass ID Badge */}
          <div className="mt-4 w-full bg-slate-50 border border-slate-300 rounded p-2.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Registration Reference
              </span>
              <span className="text-sm font-bold font-mono text-slate-900">
                {registration.id}
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="no-print p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Copy ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Date & Venue Footer */}
          <div className="mt-4 pt-3 border-t border-slate-200 w-full grid grid-cols-2 gap-2 text-left text-xs">
            <div className="flex items-start gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">14 October 2026</span>
                <span className="text-[10px] text-slate-500">09:30 AM to 05:30 PM</span>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Prof. Lakshman Aud.</span>
                <span className="text-[10px] text-slate-500">IGNTU Amarkantak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Watermark Strip */}
        <div className="bg-slate-100 px-4 py-2 text-center text-[10px] font-mono text-slate-600 border-t border-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
            Verified &amp; Non-Transferable
          </span>
          <span className="truncate max-w-[150px]">{registration.verificationToken}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="no-print mt-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / PDF Pass</span>
        </button>

        {registration.qrCodeDataUrl && (
          <a
            href={registration.qrCodeDataUrl}
            download={`ViksitBharat-Pass-${registration.id}.png`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </a>
        )}

        {onClose && (
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
