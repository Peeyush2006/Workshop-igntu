'use client';

import React from 'react';
import { MapPin, Compass, Sun, Building, ExternalLink, Train, Shield, Wifi, Armchair } from 'lucide-react';

export default function VenueSection() {
  return (
    <section id="venue" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#EA4335] text-xs font-bold uppercase tracking-wider font-mono mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
            <span>Auditorium Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
            Event Venue &amp; Directions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Join us in the air-conditioned Prof. Lakshman Honour Auditorium on the IGNTU campus in Amarkantak, Madhya Pradesh.
          </p>
        </div>

        {/* Responsive Venue Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Card: Auditorium & Campus Address with Direct Google Maps CTA */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1A73E8] shrink-0 shadow-2xs">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#1A73E8] uppercase tracking-wider font-mono">
                    Official Host Auditorium
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Prof. Lakshman Honour Auditorium
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Situated in the central administrative zone of Indira Gandhi National Tribal University, the auditorium provides tiered acoustic seating, digital dual-projection screens, and high-speed campus connectivity.
              </p>

              {/* Key Location Details */}
              <div className="space-y-3.5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#EA4335]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">Campus Address</span>
                    <span className="text-slate-600 leading-relaxed mt-0.5">
                      Indira Gandhi National Tribal University (IGNTU), Village Lalpur, Amarkantak, Anuppur District, Madhya Pradesh - 484887, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Train className="w-4 h-4 text-[#FBBC04]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">Nearest Transit / Railway Stations</span>
                    <span className="text-slate-600 leading-relaxed mt-0.5">
                      Pendra Road (PND) ~42 km · Anuppur Junction (APR) ~70 km. Shared taxis and university transit shuttles run regularly from both stations.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Sun className="w-4 h-4 text-[#34A853]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">October Weather</span>
                    <span className="text-slate-600 leading-relaxed mt-0.5">
                      Pleasant hill-station climate (18°C to 26°C). Light sweater or jacket recommended for evening sessions.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">
                GPS: 22.7533° N, 81.7588° E
              </span>

              <a
                href="https://maps.google.com/?q=Prof.+Lakshman+Honour+Auditorium+IGNTU+Amarkantak"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A73E8] hover:bg-[#1557b0] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 transition-all shadow-xs hover:shadow active:scale-98 w-full sm:w-auto"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Card: Auditorium Features & Facilities */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-[#34A853] uppercase tracking-wider font-mono">
                  Auditorium Facilities
                </span>
                <Compass className="w-4 h-4 text-slate-400" />
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
                Venue Infrastructure
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Equipped for modern interactive sessions, real-time code displays, and hybrid delegate participation.
              </p>

              {/* Specs Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Armchair className="w-4 h-4 text-[#1A73E8] shrink-0" />
                    <span>Seating Capacity</span>
                  </div>
                  <span className="font-bold text-slate-900">450 Tiered Seats</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Wifi className="w-4 h-4 text-[#34A853] shrink-0" />
                    <span>Campus Network</span>
                  </div>
                  <span className="font-bold text-slate-900">National Knowledge Network</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Building className="w-4 h-4 text-[#FBBC04] shrink-0" />
                    <span>Registration Desk</span>
                  </div>
                  <span className="font-bold text-slate-900">Auditorium Main Portico</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Shield className="w-4 h-4 text-[#EA4335] shrink-0" />
                    <span>First Aid &amp; Security</span>
                  </div>
                  <span className="font-bold text-slate-900">24x7 University Health Centre</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-[#1A73E8] block mb-1">Campus Parking &amp; Entry:</span>
              Free parking available adjacent to the auditorium complex for delegates, scholars, and visiting faculty.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
