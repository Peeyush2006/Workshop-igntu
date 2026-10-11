'use client';

import React from 'react';
import Image from 'next/image';
import { X, Clock, CheckCircle } from 'lucide-react';
import { Speaker } from '@/lib/types';

interface SpeakerModalProps {
  speaker: Speaker | null;
  onClose: () => void;
}

export default function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded border border-slate-300 shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Speaker Profile &amp; Academic Background
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Top Speaker Details */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded overflow-hidden shrink-0 border border-slate-300">
              <Image
                src={speaker.photoUrl}
                alt={speaker.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="inline-block px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold mb-1.5">
                {speaker.sessionType}
              </div>
              <h3 className="text-xl font-black text-slate-950">
                {speaker.name}
              </h3>
              <p className="text-xs font-semibold text-blue-900 mt-0.5">
                {speaker.designation}
              </p>
              <p className="text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 inline-block mt-2">
                Core Specialization: {speaker.coreAreas}
              </p>
            </div>
          </div>

          {/* Session Card */}
          <div className="bg-slate-50 rounded p-4 border border-slate-300">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5 text-slate-700" />
              <span>Session Details (14 October 2026)</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              {speaker.sessionTitle}
            </h4>
            <div className="text-xs text-blue-900 font-semibold mt-1">
              Scheduled Time: {speaker.sessionTime}
            </div>
          </div>

          {/* Biography */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Biography
            </h4>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white">
              {speaker.biography}
            </div>
          </div>

          {/* Technical Expertise Badges */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Technical Expertise &amp; Domain Areas
            </h4>
            <div className="space-y-3">
              {speaker.technicalExpertise.map((group, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="text-xs font-bold text-slate-800 mb-1.5">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-800 text-xs font-medium"
                      >
                        <CheckCircle className="w-3 h-3 text-slate-600" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Department of Computer Science | IGNTU Amarkantak
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
