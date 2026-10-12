'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Sparkles, ArrowRight, Calendar, MapPin, Building, Award, ExternalLink } from 'lucide-react';
import { EventConfig, SeatStats } from '@/lib/types';
import { speakersData } from '@/lib/data';
import CountdownTimer from './CountdownTimer';

interface HeroProps {
  config: EventConfig;
  seats?: SeatStats;
  onOpenRegister: () => void;
}

export default function Hero({ config, seats, onOpenRegister }: HeroProps) {

  const speakerReel = [
    {
      type: 'speaker',
      id: 'aditi-saraf',
      name: 'Aditi Saraf',
      role: 'Cloud & DevOps Engineer | Software Developer',
      image: '/images/speakers/aditi-saraf.jpg',
      badge: 'Keynote Speaker',
    },
    {
      type: 'meta',
      icon: Calendar,
      title: 'Wednesday, 14 October 2026',
      subtitle: 'Viksit Bharat @ 2047',
      accent: 'text-[#1A73E8]',
    },
    {
      type: 'speaker',
      id: 'shivansh-gupta',
      name: 'Shivansh Gupta',
      role: 'DevOps & Cloud Engineer | Backend Developer',
      image: '/images/speakers/shivansh-gupta.jpg',
      badge: 'Keynote Speaker',
    },
    {
      type: 'meta',
      icon: MapPin,
      title: 'Prof. Lakshman Honour Auditorium',
      subtitle: 'IGNTU Amarkantak',
      accent: 'text-[#EA4335]',
    },
    {
      type: 'speaker',
      id: 'shivam-patel',
      name: 'Shivam Patel',
      role: 'System Engineer at TCS',
      image: '/images/speakers/shivam-patel.jpg',
      badge: 'Keynote Speaker',
    },
    {
      type: 'meta',
      icon: Sparkles,
      title: '100% Free Registration',
      subtitle: 'Department of CS, IGNTU',
      accent: 'text-[#34A853]',
    },
  ];

  return (
    <section id="hero" className="relative pt-12 pb-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Builder Pop-up style Hero Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-center lg:items-start select-none"
          >
            <div className="flex flex-col items-start max-w-md">
              {/* Bold Event Title Artwork (Matching Builder Pop-Up Typography) */}
              <div className="flex items-end gap-4 mt-2">
                <div>
                  {/* Voice 4 GenZ Feature just upside of Viksit Bharat @ 2047 with GPU transform animation (Zero layout shift) */}
                  <div className="inline-flex items-center gap-2 mb-2 px-3 h-[28px] max-h-[28px] rounded-full bg-blue-50/90 border border-blue-200/90 shadow-2xs select-none overflow-hidden">
                    {/* Constant-box Equalizer with GPU-scaleY transform animation */}
                    <div className="flex items-end gap-[2.5px] h-3.5 w-[16px] overflow-hidden select-none shrink-0 pb-[1px]">
                      <motion.span
                        className="w-[2px] h-3 bg-[#1A73E8] rounded-full shrink-0 block"
                        style={{ transformOrigin: 'bottom' }}
                        animate={{ scaleY: [0.3, 1.0, 0.5, 0.85, 0.3] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.span
                        className="w-[2px] h-3 bg-[#EA4335] rounded-full shrink-0 block"
                        style={{ transformOrigin: 'bottom' }}
                        animate={{ scaleY: [0.85, 0.3, 1.0, 0.45, 0.85] }}
                        transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                      />
                      <motion.span
                        className="w-[2px] h-3 bg-[#FBBC04] rounded-full shrink-0 block"
                        style={{ transformOrigin: 'bottom' }}
                        animate={{ scaleY: [0.4, 0.95, 0.35, 0.75, 0.4] }}
                        transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                      />
                      <motion.span
                        className="w-[2px] h-3 bg-[#34A853] rounded-full shrink-0 block"
                        style={{ transformOrigin: 'bottom' }}
                        animate={{ scaleY: [0.95, 0.4, 0.8, 0.25, 0.95] }}
                        transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                      />
                    </div>

                    <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#1A73E8] font-sans leading-none">
                      Voice 4 GenZ
                    </span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-[0.95] font-sans">
                    Viksit <br />
                    Bharat <br />
                    <span className="text-[#1A73E8]">@ 2047</span>
                  </h1>
                </div>

                {/* Stylized Steaming Coffee / Innovation Cup Motif */}
                <div className="flex flex-col items-center pb-2">
                  <div className="flex gap-1 mb-1">
                    <motion.span
                      animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-slate-400 text-sm"
                    >
                      ~
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.3, repeat: Infinity, delay: 0.3 }}
                      className="text-slate-400 text-sm"
                    >
                      ~
                    </motion.span>
                    <motion.span
                      animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2.1, repeat: Infinity, delay: 0.6 }}
                      className="text-slate-400 text-sm"
                    >
                      ~
                    </motion.span>
                  </div>
                  {/* Cup with vibrant gradient */}
                  <div className="relative w-20 h-14 rounded-b-2xl rounded-t-xs bg-gradient-to-r from-[#34A853] via-[#FBBC04] to-[#EA4335] shadow-sm flex items-center justify-center">
                    <div className="absolute -right-3 top-2 w-5 h-7 rounded-r-xl border-4 border-[#EA4335] bg-transparent" />
                    <span className="text-[11px] font-black text-white uppercase tracking-wider font-mono">
                      AI 2047
                    </span>
                  </div>
                  {/* Cup Saucer Base */}
                  <div className="w-24 h-1.5 bg-[#4285F4] rounded-full mt-1 opacity-80" />
                </div>
              </div>

              {/* Event Date & Location - Fully Optimized for Mobile Devices */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full text-xs font-semibold">
                {/* Date Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 shadow-2xs shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-[#1A73E8] shrink-0" />
                  <span className="font-semibold">14 October 2026</span>
                </div>

                {/* Location / Auditorium Pill */}
                <a
                  href="https://maps.google.com/?q=Prof.+Lakshman+Honour+Auditorium+IGNTU+Amarkantak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/90 border border-slate-200/80 text-slate-800 shadow-2xs transition-all group max-w-full"
                  title="Open Prof. Lakshman Honour Auditorium on Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#EA4335] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold truncate sm:whitespace-normal">Prof. Lakshman Honour Auditorium</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#1A73E8] shrink-0 ml-0.5" />
                </a>
              </div>

              {/* Event Countdown */}
              <div className="mt-4 w-full">
                <CountdownTimer
                  eventDate={config.eventDate || '2026-10-14'}
                  startTime={config.startTime || '09:30 AM'}
                  endTime={config.endTime || '05:30 PM'}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Clean Headline, Description & Vibrant Blue Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col items-start lg:pl-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight font-sans">
              Coming to your campus!
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-lg">
              One full day in the auditorium with industry experts, building real-world AI, cloud architectures, and Indic tech. Before 2047 arrives.
            </p>

            {/* Keynote Speakers Spotlight in Hero */}
            <div className="mt-6 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 w-full max-w-lg flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 shrink-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-xs">
                    <Image src="/images/speakers/aditi-saraf.jpg" alt="Aditi Saraf" fill className="object-cover object-top" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-xs">
                    <Image src="/images/speakers/shivansh-gupta.jpg" alt="Shivansh Gupta" fill className="object-cover object-top" />
                  </div>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-xs">
                    <Image src="/images/speakers/shivam-patel.jpg" alt="Shivam Patel" fill className="object-cover object-top" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      Keynote Speakers
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">
                    Aditi Saraf · Shivansh Gupta · Shivam Patel
                  </p>
                </div>
              </div>
              <a
                href="#speakers"
                className="text-xs font-semibold text-[#1A73E8] hover:text-[#1557b0] flex items-center shrink-0 pr-1 hover:underline"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] hover:bg-[#1557b0] font-medium leading-none text-white transition-all h-[52px] px-9 text-[17px] shadow-sm hover:shadow-md active:scale-98"
              >
                <span>Register Free Pass</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 font-medium leading-none text-slate-800 transition-all h-[52px] px-7 text-[15px] border border-slate-200"
              >
                Organizer Dashboard
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500 font-normal">
              *Free entry for UG, PG, PhD scholars, faculty members, and working professionals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Speaker Moving Animation Banner with Smooth Looping Marquee */}
      <div className="w-full overflow-hidden bg-slate-50 border-y border-slate-200/90 py-3.5 relative">
        {/* Left and Right Edge Gradient Masks for Smooth Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

        {/* Moving Track */}
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          {[...speakerReel, ...speakerReel].map((item, idx) => (
            item.type === 'speaker' ? (
              <a
                key={`reel-spk-${idx}`}
                href="#speakers"
                className="inline-flex items-center gap-3 px-3.5 py-1.5 bg-white rounded-full border border-slate-200/90 shadow-2xs hover:border-[#1A73E8] hover:shadow-sm transition-all group shrink-0"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#1A73E8]/20 shrink-0 bg-slate-100">
                  <Image
                    src={item.image!}
                    alt={item.name!}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col text-left pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1A73E8] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-[#1A73E8] border border-blue-100">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {item.role}
                  </span>
                </div>
              </a>
            ) : (
              <div
                key={`reel-meta-${idx}`}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/70 rounded-full border border-slate-200/70 shadow-2xs shrink-0"
              >
                <div className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 ${item.accent}`}>
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                </div>
                <div className="flex flex-col text-left pr-1">
                  <span className="font-bold text-xs text-slate-900 leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal leading-tight">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
