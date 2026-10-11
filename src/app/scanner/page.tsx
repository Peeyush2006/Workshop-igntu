'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Volume2,
  VolumeX,
  Search,
  Shield,
} from 'lucide-react';
import { CheckInResult } from '@/lib/types';

export default function ScannerPage() {
  const [manualCode, setManualCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastResult, setLastResult] = useState<CheckInResult | null>(null);
  const [scanHistory, setScanHistory] = useState<Array<CheckInResult & { timestamp: string }>>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const scannerRef = useRef<any>(null);

  // Play audio tones using Web Audio API
  const playSound = (type: 'success' | 'warning' | 'error') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (type === 'warning') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(440, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.setValueAtTime(160, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      // AudioContext unavailable
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (!code || isVerifying) return;
    setIsVerifying(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const result: CheckInResult = await res.json();
      setLastResult(result);

      if (result.status === 'SUCCESS') {
        playSound('success');
      } else if (result.status === 'ALREADY_CHECKED_IN') {
        playSound('warning');
      } else {
        playSound('error');
      }

      setScanHistory((prev) => [
        { ...result, timestamp: new Date().toLocaleTimeString() },
        ...prev.slice(0, 9),
      ]);
    } catch (err) {
      setLastResult({
        success: false,
        status: 'INVALID_TOKEN',
        message: 'Network verification failed.',
      });
      playSound('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleVerifyCode(decodedText);
        },
        () => {}
      );
      setCameraActive(true);
    } catch (err: any) {
      console.error('Camera start failed', err);
      setCameraError(err?.message || 'Unable to access camera. Please allow camera permissions or enter Registration ID manually.');
      setCameraActive(false);
    }
  };

  const stopCamera = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {}
      scannerRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleVerifyCode(manualCode.trim());
      setManualCode('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-300 px-4 py-3 sm:px-6 shadow-xs sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              title="Back to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-emerald-600" />
                <h1 className="text-sm sm:text-base font-bold text-slate-900">
                  Attendance Verification Station
                </h1>
              </div>
              <p className="text-[11px] text-slate-500">
                AI for Viksit Bharat @ 2047 | Prof. Lakshman Honour Auditorium
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded border text-xs font-semibold flex items-center gap-1 transition-colors ${
                soundEnabled
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <Link
              href="/admin"
              className="px-3 py-1.5 rounded bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="grow max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Scanner & Manual Input */}
        <div className="lg:col-span-7 space-y-6">
          {/* Scanner Card */}
          <div className="bg-white rounded border border-slate-300 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-slate-800" />
                <h2 className="text-sm font-bold text-slate-900">
                  Camera QR Verification
                </h2>
              </div>

              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  className="px-3 py-1.5 rounded bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition-colors"
                >
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="px-3 py-1.5 rounded bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 text-xs font-bold transition-colors"
                >
                  Stop Camera
                </button>
              )}
            </div>

            {/* Video Target Container */}
            <div className="relative min-h-[260px] bg-slate-950 rounded overflow-hidden flex items-center justify-center border border-slate-800">
              <div id="qr-reader" className="w-full max-w-sm" />
              {!cameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-900 z-10">
                  <QrCode className="w-12 h-12 text-slate-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-300">
                    Camera is currently stopped
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                    Click &quot;Start Camera&quot; to scan delegate pass QR codes, or use manual entry below.
                  </p>
                  <button
                    onClick={startCamera}
                    className="mt-3 px-3 py-1.5 rounded bg-blue-800 hover:bg-blue-700 text-white text-xs font-bold"
                  >
                    Turn On Camera
                  </button>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="mt-3 p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                {cameraError}
              </div>
            )}
          </div>

          {/* Manual Entry Fallback */}
          <div className="bg-white rounded border border-slate-300 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <span>Manual Check-in by Registration Reference</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Enter Registration ID (e.g. <span className="font-mono font-bold text-slate-800">VB2047-1001</span>).
            </p>

            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Enter Registration ID..."
                className="grow px-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:border-slate-800"
              />
              <button
                type="submit"
                disabled={isVerifying || !manualCode.trim()}
                className="px-4 py-2 rounded bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold disabled:opacity-50 transition-colors"
              >
                {isVerifying ? 'Checking...' : 'Verify'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Status Feedback */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded border border-slate-300 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Verification Result
            </h3>

            {lastResult ? (
              <div
                className={`p-4 rounded border ${
                  lastResult.status === 'SUCCESS'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : lastResult.status === 'ALREADY_CHECKED_IN'
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-start gap-3">
                  {lastResult.status === 'SUCCESS' && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                  )}
                  {lastResult.status === 'ALREADY_CHECKED_IN' && (
                    <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                  )}
                  {(lastResult.status === 'NOT_FOUND' || lastResult.status === 'INVALID_TOKEN') && (
                    <XCircle className="w-6 h-6 text-rose-700 shrink-0 mt-0.5" />
                  )}

                  <div className="grow">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        lastResult.status === 'SUCCESS'
                          ? 'bg-emerald-200 text-emerald-900'
                          : lastResult.status === 'ALREADY_CHECKED_IN'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {lastResult.status === 'SUCCESS'
                        ? 'Verified'
                        : lastResult.status === 'ALREADY_CHECKED_IN'
                        ? 'Already Checked In'
                        : 'Invalid Record'}
                    </span>

                    <p className="text-xs font-bold leading-snug">
                      {lastResult.message}
                    </p>

                    {lastResult.participant && (
                      <div className="mt-3 pt-2 border-t border-black/10 space-y-1 text-xs">
                        <div className="font-bold text-slate-900">
                          {lastResult.participant.fullName}
                        </div>
                        <div className="text-blue-900 font-semibold">
                          {lastResult.participant.role} | {lastResult.participant.department}
                        </div>
                        <div className="text-slate-600">
                          {lastResult.participant.institution}
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 pt-0.5">
                          ID: {lastResult.participant.id}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-slate-300 rounded text-slate-500 text-xs">
                Scan pass or enter ID to display attendee verification details.
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded border border-slate-300 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Recent Scans This Session
              </h3>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {scanHistory.length} Scanned
              </span>
            </div>

            {scanHistory.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">
                No scans recorded yet in this station session.
              </p>
            ) : (
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {scanHistory.map((scan, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {scan.participant?.fullName || 'Unknown'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {scan.participant?.role || scan.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          scan.status === 'SUCCESS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : scan.status === 'ALREADY_CHECKED_IN'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {scan.status}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {scan.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
