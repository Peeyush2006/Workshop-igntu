'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, QrCode } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenFindPass: () => void;
}

export default function Navbar({ onOpenRegister, onOpenFindPass }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Speakers', href: '#speakers' },
    { name: 'Overview', href: '#overview' },
    { name: "What's brewing", href: '#whats-brewing' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Location', href: '#venue' },
    { name: 'Your receipt', href: '#your-receipt' },
    { name: 'FAQs', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-xs border-b border-slate-100 py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Dual Brand Logos (IGNTU Crest | IGNTU | Department of CS) */}
          <Link href="#hero" className="flex items-center gap-3 sm:gap-3.5 group shrink-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <Image
                src="/images/igntu-logo.webp"
                alt="IGNTU University Crest"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-lg sm:text-xl tracking-tight text-[#1A73E8] font-mono">
                  IGNTU
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
                  · Amarkantak
                </span>
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight leading-snug mt-0.5">
                Department of CS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Matching screenshot 1 exactly) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Page sections">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap text-[14px] font-normal leading-normal text-slate-800 transition hover:text-[#4285f4]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/scanner"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
              title="QR Attendance Scanner for Event Day"
            >
              <QrCode className="w-3.5 h-3.5 text-[#1A73E8]" />
              <span>QR Scanner</span>
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] hover:bg-[#1557b0] font-medium leading-none text-white transition h-[42px] px-6 text-[15px] shadow-sm hover:shadow"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1a73e8] rounded-full"
            >
              Dashboard
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-lg">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFindPass();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-full"
              >
                Find Your Receipt / Pass
              </button>
              <Link
                href="/scanner"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold text-[#1a73e8] bg-blue-50 rounded-full"
              >
                Attendance QR Scanner
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
