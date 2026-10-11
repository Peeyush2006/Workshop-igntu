'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SeatStats } from '@/lib/types';

interface AboutSectionProps {
  seats?: SeatStats;
  onOpenRegister: () => void;
}

export default function AboutSection({ seats, onOpenRegister }: AboutSectionProps) {
  return (
    <section id="overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Overview Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Overview
            </h2>

            <h3 className="mt-6 text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              Come for the knowledge,{' '}
              <span className="bg-gradient-to-r from-[#FB8C00] via-[#E53935] to-[#1A73E8] bg-clip-text text-transparent">
                stay to build.
              </span>
            </h3>

            <div className="mt-5 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              <p>
                India&apos;s journey towards <strong className="font-semibold text-slate-950">Viksit Bharat @ 2047</strong> presents an important opportunity to examine how Artificial Intelligence can support inclusive development, scientific advancement, innovation, and the responsible use of emerging technologies.
              </p>
              <p>
                The <strong className="font-semibold text-slate-950">Department of Computer Science, Indira Gandhi National Tribal University, Amarkantak</strong>, is organizing an academic workshop-cum-seminar bringing together students, research scholars, faculty members, technology professionals, and invited experts to explore the relevance, significance, opportunities, and challenges of AI.
              </p>
              <p className="text-slate-600 text-sm sm:text-base">
                Bring your laptop, grab your morning tea, and spend your day interacting directly with production engineers and academic researchers. Real code, enterprise microservices, and future-ready nation-scale architectures.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] hover:bg-[#1557b0] font-medium leading-none text-white transition-all h-[50px] px-8 text-[16px] shadow-sm hover:shadow"
              >
                Register Free
              </button>
              <span className="text-xs text-slate-500 font-normal">
                *Only for academic participants and professionals.
              </span>
            </div>
          </div>

          {/* Right Side: Clean Artwork Illustration matching Screenshot 2 */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-sm flex items-center justify-center p-6"
            >
              <svg
                viewBox="0 0 360 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-md"
              >
                {/* Laptop Base and Screen */}
                <rect x="40" y="80" width="180" height="110" rx="16" fill="url(#screenGrad)" />
                <path d="M20 190 H240 C245 190 250 195 248 200 L242 215 C240 218 235 220 230 220 H30 C25 220 20 218 18 215 L12 200 C10 195 15 190 20 190 Z" fill="url(#baseGrad)" />
                
                {/* Code Prompt on Screen */}
                <text x="130" y="145" fontFamily="monospace" fontSize="34" fontWeight="bold" fill="white" textAnchor="middle">
                  &lt; / &gt;
                </text>

                {/* Person avatar glowing above laptop */}
                <circle cx="130" cy="45" r="22" fill="#34A853" opacity="0.9" />
                <path d="M100 80 Q130 65 160 80" stroke="#34A853" strokeWidth="8" strokeLinecap="round" />

                {/* Steaming Coffee Cup on the right */}
                <rect x="220" y="100" width="85" height="75" rx="20" fill="url(#cupGrad)" />
                <path d="M295 115 Q330 115 330 138 Q330 160 295 160" stroke="#FBBC04" strokeWidth="8" strokeLinecap="round" fill="none" />
                <ellipse cx="262" cy="182" rx="50" ry="12" fill="#EA4335" />

                {/* Steam Waves */}
                <path d="M245 85 Q240 70 250 55 T245 40" stroke="#43A047" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M265 85 Q260 70 270 55 T265 40" stroke="#FB8C00" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M285 85 Q280 70 290 55 T285 40" stroke="#E53935" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="screenGrad" x1="40" y1="80" x2="220" y2="190" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34A853" />
                    <stop offset="0.5" stopColor="#FBBC04" />
                    <stop offset="1" stopColor="#FB8C00" />
                  </linearGradient>
                  <linearGradient id="baseGrad" x1="12" y1="190" x2="248" y2="220" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1A73E8" />
                    <stop offset="1" stopColor="#EA4335" />
                  </linearGradient>
                  <linearGradient id="cupGrad" x1="220" y1="100" x2="305" y2="175" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF176" />
                    <stop offset="0.5" stopColor="#FFB74D" />
                    <stop offset="1" stopColor="#FF7043" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
