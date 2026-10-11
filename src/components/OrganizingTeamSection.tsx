'use client';

import React from 'react';
import { Users, Shield, GraduationCap, Award } from 'lucide-react';
import { organizingTeam } from '@/lib/data';

export default function OrganizingTeamSection() {
  const patrons = organizingTeam.filter((m) => m.category === 'Patrons');
  const conveners = organizingTeam.filter((m) => m.category === 'Convener & Secretaries');
  const coordinators = organizingTeam.filter((m) => m.category === 'Faculty Coordinators');
  const students = organizingTeam.filter((m) => m.category === 'Student Committee');

  return (
    <section id="team" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-blue-900" />
            <span>Academic Leadership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Organizing Committee
          </h2>
          <div className="w-12 h-1 bg-blue-900 mt-2" />
        </div>

        {/* Patrons Row */}
        <div className="mb-10">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Patronage
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
            {patrons.map((member) => (
              <div
                key={member.id}
                className="bg-slate-50 rounded p-5 border border-slate-300"
              >
                <div className="inline-block px-2 py-0.5 rounded bg-blue-900 text-white text-[11px] font-bold mb-2">
                  {member.role}
                </div>
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{member.designation}</p>
                <p className="text-xs text-slate-500 mt-1">{member.departmentOrOrg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conveners & Organizing Secretaries */}
        <div className="mb-10">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Convener &amp; Organizing Secretaries
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {conveners.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded p-5 border border-slate-300"
              >
                <div className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-bold mb-2 border border-slate-200">
                  {member.role}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs font-semibold text-blue-900">{member.designation}</p>
                <p className="text-xs text-slate-500 mt-1">{member.departmentOrOrg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Coordinators & Student Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 rounded p-5 border border-slate-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-blue-900" />
              Faculty Coordinators
            </h4>
            <div className="space-y-2.5">
              {coordinators.map((c) => (
                <div key={c.id} className="bg-white p-3 rounded border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-slate-500">{c.designation}</div>
                  </div>
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {c.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded p-5 border border-slate-300">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
              Student Organizing Committee
            </h4>
            <div className="space-y-2.5">
              {students.map((s) => (
                <div key={s.id} className="bg-white p-3 rounded border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-slate-500">{s.departmentOrOrg}</div>
                  </div>
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {s.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
