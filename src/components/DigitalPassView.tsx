'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Printer,
  Copy,
  Check,
  Calendar,
  MapPin,
  ShieldCheck,
  Download,
  Loader2,
  FileCheck,
} from 'lucide-react';
import { Registration } from '@/lib/types';

interface DigitalPassViewProps {
  registration: Registration;
  onClose?: () => void;
}

export default function DigitalPassView({ registration, onClose }: DigitalPassViewProps) {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>(registration.qrCodeDataUrl || '');
  const [isGeneratingQr, setIsGeneratingQr] = useState<boolean>(!registration.qrCodeDataUrl);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Client-side fallback to ensure QR code is never empty or stuck on "Generating QR..."
  useEffect(() => {
    if (registration.qrCodeDataUrl && registration.qrCodeDataUrl.startsWith('data:image')) {
      setQrCodeUrl(registration.qrCodeDataUrl);
      setIsGeneratingQr(false);
      return;
    }

    let isMounted = true;
    setIsGeneratingQr(true);

    import('qrcode')
      .then((QRCode) => {
        const payload = JSON.stringify({
          id: registration.id,
          token: registration.verificationToken || registration.id,
          name: registration.fullName,
          role: registration.role,
          event: 'AI for Viksit Bharat @ 2047',
          date: '2026-10-14',
        });

        QRCode.toDataURL(payload, {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 320,
          color: {
            dark: '#0F172A',
            light: '#FFFFFF',
          },
        })
          .then((url) => {
            if (isMounted) {
              setQrCodeUrl(url);
              setIsGeneratingQr(false);
            }
          })
          .catch((err) => {
            console.error('Client QR generation failed:', err);
            if (isMounted) setIsGeneratingQr(false);
          });
      })
      .catch((err) => {
        console.error('Failed to load qrcode library:', err);
        if (isMounted) setIsGeneratingQr(false);
      });

    return () => {
      isMounted = false;
    };
  }, [registration]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(registration.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * ISOLATED 1-PAGE PRINT ENGINE:
   * Instead of calling window.print() which prints all 10 homepage sections,
   * we inject a hidden iframe containing ONLY the official credential badge.
   * This guarantees that saving as PDF or printing generates EXACTLY ONE PAGE.
   */
  const handlePrint = () => {
    const activeQr = qrCodeUrl || registration.qrCodeDataUrl || '';

    // Create an isolated hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('title', 'Official Delegate Pass Print Frame');
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Delegate Pass - ${registration.id} - ${registration.fullName}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            margin: 0;
            padding: 10px 0;
            background: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
          }
          .pass-container {
            width: 380px;
            max-width: 100%;
            border: 2px solid #0f172a;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: none;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .header {
            background: #0f172a;
            color: #ffffff;
            padding: 16px 14px;
            text-align: center;
          }
          .badge-pill {
            display: inline-block;
            background: #f59e0b;
            color: #020617;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 2px 8px;
            border-radius: 4px;
            margin-bottom: 6px;
          }
          .title {
            font-size: 17px;
            font-weight: 800;
            margin: 0;
            line-height: 1.2;
            color: #ffffff;
          }
          .subtitle {
            font-size: 11px;
            color: #cbd5e1;
            margin: 4px 0 0 0;
          }
          .body {
            padding: 20px 16px;
            text-align: center;
          }
          .qr-box {
            display: inline-block;
            padding: 8px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            background: #ffffff;
            margin-bottom: 12px;
          }
          .qr-img {
            width: 180px;
            height: 180px;
            display: block;
          }
          .role-badge {
            display: inline-block;
            padding: 3px 10px;
            font-size: 11px;
            font-weight: 700;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            background: #f8fafc;
            color: #0f172a;
            margin-bottom: 8px;
          }
          .name {
            font-size: 20px;
            font-weight: 800;
            margin: 0 0 4px 0;
            color: #0f172a;
          }
          .institution {
            font-size: 12px;
            font-weight: 600;
            color: #1e3a8a;
            margin: 0 0 2px 0;
          }
          .dept-id {
            font-size: 11px;
            color: #475569;
            margin: 0 0 14px 0;
          }
          .ref-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 14px;
            text-align: left;
          }
          .ref-label {
            font-size: 9px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
          }
          .ref-val {
            font-size: 14px;
            font-weight: 800;
            font-family: monospace;
            color: #0f172a;
          }
          .meta-grid {
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            text-align: left;
            font-size: 11px;
          }
          .meta-title {
            font-weight: 700;
            color: #0f172a;
            display: block;
          }
          .meta-sub {
            font-size: 10px;
            color: #64748b;
          }
          .footer {
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 8px 14px;
            font-size: 10px;
            color: #475569;
            font-family: monospace;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .security-note {
            margin-top: 16px;
            text-align: center;
            font-size: 11px;
            color: #64748b;
            max-width: 380px;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <div class="pass-container">
          <div class="header">
            <div class="badge-pill">Official Delegate E-Pass</div>
            <h1 class="title">AI for Viksit Bharat @ 2047</h1>
            <p class="subtitle">Department of Computer Science | IGNTU Amarkantak</p>
          </div>
          <div class="body">
            <div class="qr-box">
              <img class="qr-img" src="${activeQr}" alt="QR Pass" />
            </div>
            <div>
              <span class="role-badge">${registration.role}</span>
              <div class="name">${registration.fullName}</div>
              <div class="institution">${registration.institution}</div>
              <div class="dept-id">${registration.department} | ID: ${registration.idNumber}</div>
            </div>
            <div class="ref-box">
              <div>
                <span class="ref-label">Registration ID</span>
                <span class="ref-val">${registration.id}</span>
              </div>
              <div style="text-align:right;">
                <span class="ref-label">Admission Status</span>
                <span style="font-size:12px; font-weight:700; color:#047857;">Confirmed Pass</span>
              </div>
            </div>
            <div class="meta-grid">
              <div>
                <span class="meta-title">📅 14 October 2026</span>
                <span class="meta-sub">09:30 AM to 05:30 PM</span>
              </div>
              <div>
                <span class="meta-title">📍 Prof. Lakshman Aud.</span>
                <span class="meta-sub">IGNTU Amarkantak</span>
              </div>
            </div>
          </div>
          <div class="footer">
            <span>🔒 Verified &amp; Non-Transferable</span>
            <span>${registration.verificationToken}</span>
          </div>
        </div>
        <div class="security-note">
          Present this official 1-page pass at the registration desk for verification and physical kit collection.<br/>
          <strong>Helpline:</strong> +91 9202261369 &bull; peeyushkumartiwari18@gmail.com
        </div>
      </body>
      </html>
    `;

    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Trigger isolated print
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.error('Iframe print error', err);
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1500);
      }
    }, 250);
  };

  /**
   * DIRECT BADGE IMAGE DOWNLOAD:
   * Renders the complete credential badge onto an off-screen HTML5 canvas
   * and triggers an instant high-resolution PNG download.
   */
  const handleDownloadBadge = async () => {
    setIsDownloadingImage(true);
    try {
      const activeQr = qrCodeUrl || registration.qrCodeDataUrl;
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 600, 920);

      // Card Border & Drop Shadow simulation
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#0F172A';
      ctx.strokeRect(16, 16, 568, 888);

      // Top Navy Header
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(16, 16, 568, 140);

      // E-Pass Tag Pill
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.roundRect(210, 36, 180, 24, 6);
      ctx.fill();

      ctx.fillStyle = '#020617';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL DELEGATE E-PASS', 300, 52);

      // Header Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('AI for Viksit Bharat @ 2047', 300, 94);

      // Header Subtitle
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '13px sans-serif';
      ctx.fillText('Department of Computer Science | IGNTU Amarkantak', 300, 126);

      // Load & Draw QR Code
      if (activeQr) {
        await new Promise<void>((resolve) => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            // QR container box
            ctx.fillStyle = '#FFFFFF';
            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(175, 180, 250, 250, 8);
            ctx.fill();
            ctx.stroke();

            // Draw QR code image
            ctx.drawImage(img, 190, 195, 220, 220);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = activeQr;
        });
      }

      // Role Pill
      ctx.fillStyle = '#F1F5F9';
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(220, 450, 160, 26, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(registration.role, 300, 467);

      // Delegate Name
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(registration.fullName, 300, 515);

      // Institution
      ctx.fillStyle = '#1E3A8A';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(registration.institution, 300, 545);

      // Department & ID
      ctx.fillStyle = '#475569';
      ctx.font = '13px sans-serif';
      ctx.fillText(`${registration.department} | ID: ${registration.idNumber}`, 300, 572);

      // Reference Box
      ctx.fillStyle = '#F8FAFC';
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 605, 520, 65, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('REGISTRATION REFERENCE ID', 60, 628);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(registration.id, 60, 654);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('ADMISSION STATUS', 540, 628);
      ctx.fillStyle = '#047857';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('CONFIRMED PASS', 540, 654);

      // Date & Venue Strip
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('📅 14 October 2026 (09:30 AM - 05:30 PM)', 60, 715);
      ctx.fillText('📍 Prof. Lakshman Aud., IGNTU Amarkantak', 60, 745);

      // Security Strip
      ctx.fillStyle = '#F1F5F9';
      ctx.fillRect(16, 840, 568, 64);
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('🔒 VERIFIED & NON-TRANSFERABLE', 40, 878);
      ctx.textAlign = 'right';
      ctx.fillText(registration.verificationToken, 560, 878);

      // Trigger PNG download
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ViksitBharat-Pass-${registration.id}.png`;
      link.href = pngUrl;
      link.click();
    } catch (err) {
      console.error('Badge download error', err);
    } finally {
      setIsDownloadingImage(false);
    }
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
      {/* Official Delegate Credential Badge Card */}
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
            {qrCodeUrl ? (
              <Image
                src={qrCodeUrl}
                alt={`QR Pass for ${registration.fullName}`}
                width={180}
                height={180}
                className="w-44 h-44 sm:w-48 sm:h-48 object-contain"
                unoptimized
              />
            ) : isGeneratingQr ? (
              <div className="w-44 h-44 flex flex-col items-center justify-center bg-slate-50 text-slate-500 text-xs gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#1a73e8]" />
                <span>Preparing QR badge...</span>
              </div>
            ) : (
              <div className="w-44 h-44 flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
                QR Ready
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
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          title="Print or Save official 1-page pass as PDF"
        >
          <Printer className="w-4 h-4" />
          <span>Save PDF / Print (1 Page)</span>
        </button>

        <button
          onClick={handleDownloadBadge}
          disabled={isDownloadingImage}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
          title="Download complete pass badge image"
        >
          {isDownloadingImage ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#1a73e8]" />
          ) : (
            <Download className="w-4 h-4 text-[#1a73e8]" />
          )}
          <span>Download Badge (PNG)</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      <p className="no-print text-center text-[11px] text-slate-500 mt-2">
        Single-page receipt format &bull; Present on mobile screen or printed paper at entrance.
      </p>
    </div>
  );
}
