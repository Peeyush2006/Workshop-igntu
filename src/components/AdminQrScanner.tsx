'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Volume2,
  VolumeX,
  Search,
  RefreshCw,
  Clock,
  User,
  Building,
  Eye,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';
import { CheckInResult, Registration } from '@/lib/types';

interface AdminQrScannerProps {
  onCheckInUpdated?: () => void;
  onViewPass?: (registration: Registration) => void;
  onClose?: () => void;
}

export default function AdminQrScanner({
  onCheckInUpdated,
  onViewPass,
  onClose,
}: AdminQrScannerProps) {
  const [manualCode, setManualCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastResult, setLastResult] = useState<CheckInResult | null>(null);
  const [scanHistory, setScanHistory] = useState<Array<CheckInResult & { timestamp: string }>>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isPausedAfterScan, setIsPausedAfterScan] = useState(false);

  const scannerRef = useRef<any>(null);
  const isPausedRef = useRef<boolean>(false);

  // Play audio chimes using Web Audio API
  const playSound = (type: 'success' | 'warning' | 'error') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const audioCtx = new AudioCtxClass();
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
      // Audio context unavailable
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
        if (onCheckInUpdated) {
          onCheckInUpdated();
        }
      } else if (result.status === 'ALREADY_CHECKED_IN') {
        playSound('warning');
      } else {
        playSound('error');
      }

      setScanHistory((prev) => [
        { ...result, timestamp: new Date().toLocaleTimeString() },
        ...prev.slice(0, 11),
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
    isPausedRef.current = false;
    setIsPausedAfterScan(false);

    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      // Clean up any existing scanner instance
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
          scannerRef.current.clear();
        } catch (e) {}
      }

      const scanner = new Html5Qrcode('admin-embedded-qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // Prevent multiple continuous scans of the same or subsequent frames
          if (isPausedRef.current) return;
          isPausedRef.current = true;
          setIsPausedAfterScan(true);

          // Pause camera scanning immediately
          if (scannerRef.current) {
            try {
              scannerRef.current.pause(true);
            } catch (e) {}
          }

          handleVerifyCode(decodedText);
        },
        () => {}
      );
      setCameraActive(true);
    } catch (err: any) {
      console.error('Camera start failed', err);
      setCameraError(
        err?.message ||
          'Unable to access camera. Please verify camera permissions or use manual check-in below.'
      );
      setCameraActive(false);
    }
  };

  const handleNextScan = async () => {
    isPausedRef.current = false;
    setIsPausedAfterScan(false);

    if (scannerRef.current && cameraActive) {
      try {
        scannerRef.current.resume();
      } catch (err) {
        // Fallback: re-initialize scanner if resume failed
        await startCamera();
      }
    } else if (!cameraActive) {
      await startCamera();
    }
  };

  const stopCamera = async () => {
    isPausedRef.current = false;
    setIsPausedAfterScan(false);
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {}
      scannerRef.current = null;
    }
    setCameraActive(false);
  };

  // Allow pressing Space or Enter to quickly trigger "Next Scan"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPausedAfterScan && (e.code === 'Space' || e.code === 'Enter')) {
        e.preventDefault();
        handleNextScan();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPausedAfterScan]);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.stop();
          scannerRef.current.clear();
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
    <div className="bg-white rounded border border-slate-300 shadow-xs overflow-hidden">
      {/* Top Banner / Station Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <QrCode className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Auditorium QR Attendance Station
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live Desk
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Scan delegate digital passes for physical verification at Prof. Lakshman Honour Auditorium.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-white border-slate-300 text-slate-800 shadow-2xs'
                : 'bg-slate-100 border-slate-200 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute Audio Chime' : 'Enable Audio Chime'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-medium hidden sm:inline">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-medium hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
              title="Close Scanner View"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout: Left is Camera + Manual Input, Right is Result + History */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Camera Scanner & Manual Input Form */}
        <div className="lg:col-span-7 space-y-5">
          {/* Camera Card */}
          <div className="rounded border border-slate-300 p-4 bg-slate-50/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <Camera className="w-4 h-4 text-slate-700" />
                <span>Camera Scanner Feed</span>
              </div>

              {!cameraActive ? (
                <button
                  onClick={startCamera}
                  className="px-3 py-1.5 rounded bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Start Camera</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="px-3 py-1.5 rounded bg-white text-rose-700 border border-rose-300 hover:bg-rose-50 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Stop Camera</span>
                </button>
              )}
            </div>

            {/* Video Target Container */}
            <div className="relative min-h-[280px] bg-slate-950 rounded overflow-hidden flex items-center justify-center border border-slate-800">
              <div id="admin-embedded-qr-reader" className="w-full max-w-sm" />

              {/* Pause Overlay with Next Scan Button */}
              {isPausedAfterScan && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5 ring-4 ring-emerald-500/10">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Pass Scanned
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xs mb-3.5">
                    Camera paused. Click below or press Spacebar for next attendee.
                  </p>
                  <button
                    onClick={handleNextScan}
                    className="px-6 py-2.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-xs transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-amber-300" />
                    <span>Next Scan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] text-slate-400 mt-2 font-mono">
                    (Press Spacebar or Enter)
                  </span>
                </div>
              )}

              {!cameraActive && !isPausedAfterScan && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400 bg-slate-900/95 z-10">
                  <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                    <QrCode className="w-7 h-7 text-slate-400" />
                  </div>
                  <p className="text-xs font-bold text-slate-200">
                    Camera is currently off
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                    Click &ldquo;Start Camera&rdquo; to use your webcam or phone camera to scan delegate passes, or enter the ID below.
                  </p>
                  <button
                    onClick={startCamera}
                    className="mt-3.5 px-4 py-2 rounded bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Turn On Camera</span>
                  </button>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="mt-3 p-3 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>

          {/* Manual Entry Form */}
          <div className="rounded border border-slate-300 p-4 bg-white">
            <h3 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <span>Manual Check-in by Registration Reference</span>
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              Type or paste Registration ID (e.g. <code className="font-mono font-bold text-slate-800">VB2047-8149</code>) or token:
            </p>

            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Enter Registration ID or Token..."
                className="grow px-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800"
              />
              <button
                type="submit"
                disabled={isVerifying || !manualCode.trim()}
                className="px-4 py-2 rounded bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold disabled:opacity-50 transition-colors flex items-center gap-1.5 shrink-0"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify &amp; Check In</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Verification Result Card & Scan History */}
        <div className="lg:col-span-5 space-y-5">
          {/* Result Card */}
          <div className="rounded border border-slate-300 p-4 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Current Verification Status
              </h3>
              {lastResult && (
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
              )}
            </div>

            {lastResult ? (
              <div
                className={`p-4 rounded border transition-all ${
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
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                        lastResult.status === 'SUCCESS'
                          ? 'bg-emerald-200 text-emerald-900'
                          : lastResult.status === 'ALREADY_CHECKED_IN'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {lastResult.status === 'SUCCESS'
                        ? 'Entry Authorized'
                        : lastResult.status === 'ALREADY_CHECKED_IN'
                        ? 'Already Checked In'
                        : 'Invalid Pass'}
                    </span>

                    <p className="text-xs font-bold leading-snug">
                      {lastResult.message}
                    </p>

                    {lastResult.participant && (
                      <div className="mt-3 pt-3 border-t border-black/10 space-y-1.5 text-xs">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-600" />
                          <span>{lastResult.participant.name}</span>
                        </div>
                        <div className="text-slate-700 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">
                            {lastResult.participant.role}
                          </span>
                          <span className="truncate">{lastResult.participant.department}</span>
                        </div>
                        <div className="text-slate-600 text-[11px] flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-500" />
                          <span className="truncate">{lastResult.participant.institution}</span>
                        </div>
                        <div className="pt-1 text-[11px] font-mono text-slate-600 flex items-center justify-between">
                          <span>Ref: {lastResult.participant.id}</span>
                          <span>ID: {lastResult.participant.idNumber}</span>
                        </div>
                      </div>
                    )}

                    {/* Next Scan button inside result card */}
                    {isPausedAfterScan && (
                      <div className="mt-3 pt-3 border-t border-black/10 flex justify-end">
                        <button
                          onClick={handleNextScan}
                          className="w-full sm:w-auto px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-amber-400" />
                          <span>Next Scan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <ShieldCheck className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-600">
                  Ready to scan
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Scan a QR code from a digital pass or enter an ID to verify.
                </p>
              </div>
            )}
          </div>

          {/* Recent Scan History */}
          <div className="rounded border border-slate-300 p-4 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Recent Desk Scans ({scanHistory.length})</span>
              </h3>
              {scanHistory.length > 0 && (
                <button
                  onClick={() => setScanHistory([])}
                  className="text-[11px] text-slate-400 hover:text-slate-700 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {scanHistory.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-4">
                No passes scanned yet in this session.
              </p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {scanHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded border border-slate-200 text-xs flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          item.status === 'SUCCESS'
                            ? 'bg-emerald-500'
                            : item.status === 'ALREADY_CHECKED_IN'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      <div className="truncate">
                        <p className="font-bold text-slate-800 truncate">
                          {item.participant?.name || 'Unknown Delegate'}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {item.participant?.role || item.status} · {item.participant?.id || ''}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
