'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function GuidelinesSection() {
  const guidelines = [
    'Auditorium seating is capped at 250 delegates with real-time digital pass allocation and spot verification.',
    'Official Certificates of Participation are presented at the valedictory session to delegates with verified attendance on 14 October 2026.',
    'Instant Digital Passes with encrypted QR codes are issued upon online registration: present on mobile or paper at the desk.',
    'Participants are encouraged to bring their personal laptops and chargers for hands-on technical architecture sessions.',
    'Venue: Prof. Laxman Havnoor Auditorium, IGNTU Campus, Village Lalpur, Amarkantak, Madhya Pradesh - 484887.',
  ];

  return (
    <section id="guidelines" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Guidelines Bullets */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Important guidelines
            </h2>

            <ul className="mt-8 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {guidelines.map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1A73E8] shrink-0 mt-2.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Playful Vector Art matching Screenshot 5 */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-sm flex items-center justify-center p-6"
            >
              <svg
                viewBox="0 0 340 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-md"
              >
                {/* Espresso Machine / High-Tech Compute Chassis */}
                <rect x="50" y="50" width="170" height="200" rx="24" fill="url(#machineGrad)" />
                
                {/* Status Indicator / Screen */}
                <rect x="75" y="75" width="45" height="30" rx="8" fill="white" />
                <circle cx="90" cy="90" r="5" fill="#34A853" />
                <circle cx="105" cy="90" r="5" fill="#FBBC04" />

                {/* Vents */}
                <rect x="75" y="125" width="55" height="8" rx="4" fill="white" />
                <rect x="75" y="145" width="55" height="8" rx="4" fill="white" />
                <rect x="75" y="165" width="55" height="8" rx="4" fill="white" />
                <rect x="75" y="185" width="55" height="8" rx="4" fill="white" />

                {/* Portafilter Handle */}
                <rect x="155" y="105" width="30" height="28" rx="6" fill="#FBBC04" />
                <path d="M185 119 H245" stroke="#FB8C00" strokeWidth="16" strokeLinecap="round" />
                <circle cx="170" cy="140" r="4" fill="#EA4335" />

                {/* Small Cup 1 */}
                <rect x="190" y="215" width="45" height="35" rx="8" fill="url(#miniCup1)" />
                <rect x="180" y="245" width="65" height="6" rx="3" fill="#EA4335" />

                {/* Small Cup 2 */}
                <rect x="245" y="215" width="45" height="35" rx="8" fill="url(#miniCup2)" />
                <rect x="235" y="245" width="65" height="6" rx="3" fill="#FB8C00" />

                {/* Machine Feet */}
                <rect x="65" y="250" width="22" height="10" rx="4" fill="#1A73E8" />
                <rect x="180" y="250" width="22" height="10" rx="4" fill="#1A73E8" />

                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="machineGrad" x1="50" y1="50" x2="220" y2="250" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#43A047" />
                    <stop offset="0.35" stopColor="#FDD835" />
                    <stop offset="0.7" stopColor="#FB8C00" />
                    <stop offset="1" stopColor="#E53935" />
                  </linearGradient>
                  <linearGradient id="miniCup1" x1="190" y1="215" x2="235" y2="250" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34A853" />
                    <stop offset="1" stopColor="#FBBC04" />
                  </linearGradient>
                  <linearGradient id="miniCup2" x1="245" y1="215" x2="290" y2="250" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FBBC04" />
                    <stop offset="1" stopColor="#EA4335" />
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
