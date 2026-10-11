'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ScheduleSection() {
  const morningBatch = [
    {
      num: '01',
      time: '09:00 AM - 09:45 AM',
      activity: 'Check-in & Digital Pass Verification',
      desc: 'Desk check-in at Prof. Lakshman Honour Auditorium portico and kit collection.',
    },
    {
      num: '02',
      time: '09:45 AM - 10:30 AM',
      activity: 'Inaugural Ceremony & Saraswati Vandana',
      desc: 'Lighting of the lamp, Welcome Address by HOD CS, and Address by Dignitaries.',
    },
    {
      num: '03',
      time: '10:30 AM - 11:45 AM',
      activity: 'Keynote: Cloud Platforms & DevOps (Aditi Saraf)',
      desc: 'Scaling cloud architectures, Docker, Kubernetes, Terraform, and CI/CD pipelines.',
    },
    {
      num: '04',
      time: '11:45 AM - 12:00 PM',
      activity: 'High Tea & Academic Networking',
      desc: 'Networking break with speakers, scholars, and faculty.',
    },
    {
      num: '05',
      time: '12:00 PM - 01:15 PM',
      activity: 'Tech Session: Enterprise Microservices & MLOps (Shivam Patel)',
      desc: 'Enterprise software modernizations, database reliability, and operationalizing MLOps.',
    },
  ];

  const afternoonBatch = [
    {
      num: '01',
      time: '01:15 PM - 02:15 PM',
      activity: 'Networking Lunch & Research Displays',
      desc: 'Delegate lunch and student research posters on Viksit Bharat AI initiatives.',
    },
    {
      num: '02',
      time: '02:15 PM - 03:30 PM',
      activity: 'Tech Session: Resilient Backends & Observability (Shivansh Gupta)',
      desc: 'Spring Boot backends, Vault secrets, and Prometheus/Grafana observability.',
    },
    {
      num: '03',
      time: '03:30 PM - 04:30 PM',
      activity: 'Panel Discussion: AI for Viksit Bharat @ 2047',
      desc: 'Tribal empowerment, Indic NLP (Bhashini), and ethical guardrails.',
    },
    {
      num: '04',
      time: '04:30 PM - 05:30 PM',
      activity: 'Valedictory Session & Certificate Distribution',
      desc: 'Workshop conclusions, Certificate of Participation presentation, and National Anthem.',
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
            Timeline
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Single-day intensive schedule on Wednesday, 14 October 2026 at Prof. Lakshman Honour Auditorium.
          </p>
        </div>

        {/* Two Column Layout matching Screenshot 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Morning Batch Column */}
          <div className="space-y-6">
            {/* Top Pill with Green-to-Blue Gradient Border */}
            <div className="p-0.5 rounded-full bg-gradient-to-r from-[#34A853] via-[#4285F4] to-[#1A73E8]">
              <div className="bg-white rounded-full py-2.5 px-6 text-center">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  Morning track : 9:30 AM - 1:15 PM
                </span>
              </div>
            </div>

            {/* Morning Schedule Rows */}
            <div className="divide-y divide-slate-200">
              {morningBatch.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="py-5 flex items-start gap-4 sm:gap-6"
                >
                  <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tighter shrink-0 w-10">
                    {item.num}
                  </div>
                  <div className="h-10 w-px bg-slate-200 shrink-0 mt-1" />
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 shrink-0 w-36 sm:w-40 font-mono">
                    {item.time}
                  </div>
                  <div className="h-10 w-px bg-slate-200 shrink-0 mt-1 hidden sm:block" />
                  <div className="grow">
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      {item.activity}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Afternoon Batch Column */}
          <div className="space-y-6">
            {/* Top Pill with Blue-to-Red Gradient Border */}
            <div className="p-0.5 rounded-full bg-gradient-to-r from-[#1A73E8] via-[#FBBC04] to-[#EA4335]">
              <div className="bg-white rounded-full py-2.5 px-6 text-center">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  Afternoon track : 1:15 PM - 5:30 PM
                </span>
              </div>
            </div>

            {/* Afternoon Schedule Rows */}
            <div className="divide-y divide-slate-200">
              {afternoonBatch.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="py-5 flex items-start gap-4 sm:gap-6"
                >
                  <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tighter shrink-0 w-10">
                    {item.num}
                  </div>
                  <div className="h-10 w-px bg-slate-200 shrink-0 mt-1" />
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 shrink-0 w-36 sm:w-40 font-mono">
                    {item.time}
                  </div>
                  <div className="h-10 w-px bg-slate-200 shrink-0 mt-1 hidden sm:block" />
                  <div className="grow">
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      {item.activity}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
