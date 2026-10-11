'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { speakersData } from '@/lib/data';
import { Speaker } from '@/lib/types';
import SpeakerModal from './SpeakerModal';

export default function SpeakersSection() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Keynote Speakers
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal max-w-xl">
              Meet the industry engineers joining us at IGNTU Amarkantak on 14 October 2026.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">
            3 Interactive Technical Tracks
          </div>
        </div>

        {/* 3 Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakersData.map((speaker, idx) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Container */}
                <div className="relative h-72 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={speaker.photoUrl}
                    alt={speaker.name}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Floating Pill Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-slate-900 shadow-sm">
                      {speaker.sessionType}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-slate-950 font-sans tracking-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#1A73E8] mt-1">
                    {speaker.designation}
                  </p>

                  {/* Core areas */}
                  <div className="mt-4 mb-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Core Specialization:
                    </span>
                    <span className="text-xs font-medium text-slate-800 block">
                      {speaker.coreAreas}
                    </span>
                  </div>

                  {/* Session Title */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Session Topic:
                    </span>
                    <p className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                      {speaker.sessionTitle}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{speaker.sessionTime}</span>
                    </div>
                  </div>

                  {/* Technical Expertise Badges */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {speaker.technicalExpertise
                        .flatMap((g) => g.skills)
                        .slice(0, 4)
                        .map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full bg-slate-50 hover:bg-[#1a73e8] hover:text-white text-xs font-bold text-slate-800 border border-slate-200 hover:border-[#1a73e8] transition-all"
                >
                  <span>View Full Profile &amp; Bio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Speaker Bio & Skills Modal */}
      <SpeakerModal
        speaker={selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </section>
  );
}
