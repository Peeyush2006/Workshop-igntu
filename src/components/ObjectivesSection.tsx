'use client';

import React from 'react';
import { Target, Compass, Award, CheckSquare } from 'lucide-react';
import { eventObjectives } from '@/lib/data';

export default function ObjectivesSection() {
  return (
    <section id="objectives" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Target className="w-3.5 h-3.5 text-slate-700" />
            <span>Academic Purpose &amp; Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Objectives, Vision &amp; Mission
          </h2>
          <div className="w-12 h-1 bg-blue-900 mt-2" />
        </div>

        {/* 4 Official Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {eventObjectives.map((obj) => (
            <div
              key={obj.number}
              className="bg-white rounded border border-slate-300 p-6 flex gap-4 hover:border-slate-400 transition-colors"
            >
              <div className="w-10 h-10 rounded bg-slate-900 text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                {obj.number}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {obj.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-slate-900 rounded p-6 sm:p-8 text-white border border-slate-800">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Institutional Vision</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">
              Viksit Bharat Through Empowered Communities
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              To emerge as a premier center of computer science education and multidisciplinary research that seamlessly integrates tribal traditions, ecological awareness, and next-generation Artificial Intelligence to propel India into a global technological superpower by 2047.
            </p>
            <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400 font-medium">
              Department of Computer Science | IGNTU Amarkantak
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded p-6 sm:p-8 border border-slate-300">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3 border border-slate-200">
              <Award className="w-3.5 h-3.5 text-blue-900" />
              <span>Academic Mission</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
              Action-Oriented Capacity Building
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Provide students and scholars with hands-on exposure to cloud computing, DevOps, MLOps, and secure microservices.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Encourage indigenously architected software platforms addressing regional challenges in agriculture, forestry, and tribal healthcare.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>Foster direct mentorship connections between industry engineers and university students.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
