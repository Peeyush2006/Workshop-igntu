'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700 pt-14 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/images/igntu-logo.webp"
                  alt="Indira Gandhi National Tribal University Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  IGNTU Amarkantak
                </div>
                <div className="text-base font-bold tracking-tight text-slate-950">
                  Department of Computer Science
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              AI for Viksit Bharat @ 2047: Relevance, Significance, and a Future-Ready Nation-Centric Direction. Dedicated to scientific advancement, tribal regional empowerment, and national technological readiness.
            </p>

            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded-full bg-white border border-slate-200/90 text-[11px] font-semibold text-slate-700 shadow-2xs">
                Central University Academic Initiative
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
              Event Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a href="#speakers" className="hover:text-[#1a73e8] transition-colors">
                  Keynote Speakers
                </a>
              </li>
              <li>
                <a href="#overview" className="hover:text-[#1a73e8] transition-colors">
                  About Workshop
                </a>
              </li>
              <li>
                <a href="#whats-brewing" className="hover:text-[#1a73e8] transition-colors">
                  What&apos;s Brewing
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-[#1a73e8] transition-colors">
                  Single-Day Schedule (14 Oct 2026)
                </a>
              </li>
              <li>
                <a href="#your-receipt" className="hover:text-[#1a73e8] transition-colors">
                  Your Receipt / Pass
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#1a73e8] transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal Links */}
          <div className="lg:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
              Administration &amp; Compliance
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#1a73e8] shrink-0 mt-0.5" />
                <span>
                  Prof. Lakshman Honour Auditorium, IGNTU, Lalpur, Amarkantak, M.P. - 484887
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                <a href="mailto:peeyushkumartiwari18@gmail.com" className="hover:text-[#1a73e8] transition-colors">
                  peeyushkumartiwari18@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                <a href="tel:+919202261369" className="hover:text-[#1a73e8] transition-colors">
                  +91 9202261369
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <Link
                href="/privacy"
                className="text-xs text-slate-600 hover:text-[#1a73e8] underline transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/terms"
                className="text-xs text-slate-600 hover:text-[#1a73e8] underline transition-colors"
              >
                Terms and Conditions
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-xs text-[#1a73e8] hover:text-[#1557b0] font-semibold transition-colors"
              >
                <Shield className="w-3 h-3 text-[#1a73e8]" />
                <span>Organizer Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © 2026 Department of Computer Science, Indira Gandhi National Tribal University. All rights reserved.
          </p>
          <p className="font-mono">
            14 October 2026 · Prof. Lakshman Honour Auditorium
          </p>
        </div>
      </div>
    </footer>
  );
}
