'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ScheduleItem = {
  num: string;
  time: string;
  duration: string;
  activity: string;
  desc: string[];
  badge?: string;
};

const morningItems: ScheduleItem[] = [
  {
    num: '01',
    time: '10:00–10:15',
    duration: '15 min',
    activity: 'Registration and Welcome',
    desc: [
      'Participant registration and attendance',
      'Seating arrangements',
      'Welcome of faculty, invited speakers and participants',
    ],
  },
  {
    num: '02',
    time: '10:15–10:25',
    duration: '10 min',
    activity: 'Inaugural Session',
    desc: [
      'Formal opening of the programme',
      'Welcome address and introduction to the event theme',
      'Introduction of invited speakers',
    ],
  },
  {
    num: '03',
    time: '10:25–10:45',
    duration: '20 min',
    activity: 'Prof. Vikash Singh',
    desc: [
      'Head of the Department of Computer Science',
      'Topic: Emerging Technologies and the Role of AI in Viksit Bharat @2047',
    ],
    badge: 'Faculty Address',
  },
  {
    num: '04',
    time: '10:45–11:05',
    duration: '20 min',
    activity: 'Asst. Prof. Sudesh Kumar',
    desc: [
      'Focus: Technical education, innovation and future-ready skills',
    ],
    badge: 'Faculty Address',
  },
  {
    num: '05',
    time: '11:05–11:25',
    duration: '20 min',
    activity: 'Asst. Prof. Suhel Ahmed Khan',
    desc: [
      'Focus: Emerging technologies, AI applications and student opportunities',
    ],
    badge: 'Faculty Address',
  },
  {
    num: '06',
    time: '11:25–11:45',
    duration: '20 min',
    activity: 'Asst. Prof. P. Narayan Bhosle',
    desc: [
      'Cybersecurity Expert',
      'Topic: Cybersecurity, Data Privacy and Responsible AI Adoption',
    ],
    badge: 'Faculty Address',
  },
  {
    num: '07',
    time: '11:45–12:05',
    duration: '20 min',
    activity: 'Faculty Interaction and Discussion',
    desc: [
      'Discussion on AI research, responsible technology, career opportunities and India\'s technological development',
    ],
  },
  {
    num: '08',
    time: '12:05–12:30',
    duration: '25 min',
    activity: 'AI Quiz: Viksit Bharat @2047',
    desc: [
      '12:05–12:10 — Quiz introduction and instructions',
      '12:10–12:25 — Quiz competition',
      '12:25–12:30 — Results and winner announcement',
      'Topics: AI in education, healthcare, agriculture, governance, inclusion, cybersecurity and sustainability',
    ],
    badge: 'Quiz',
  },
];

const afternoonItems: ScheduleItem[] = [
  {
    num: '01',
    time: '01:15–02:00',
    duration: '45 min',
    activity: 'Aditi Saraf',
    desc: [
      'DevOps Engineer · C.S.G.',
      'Topic: Cloud Computing and DevOps — Infrastructure, Containers and CI/CD Automation',
      'Areas: AWS, Azure, Kubernetes, Docker, Terraform, Jenkins, Ansible and automated deployments',
    ],
    badge: 'Industry Expert',
  },
  {
    num: '02',
    time: '02:00–02:45',
    duration: '45 min',
    activity: 'Shivansh Gupta',
    desc: [
      'DevOps and Cloud Infrastructure Lead · Baseel Ltd.',
      'Topic: Building Scalable and Secure Cloud Infrastructure',
      'Areas: Cloud platforms, Kubernetes, Docker, Terraform, Jenkins, GitLab and infrastructure automation',
    ],
    badge: 'Industry Expert',
  },
  {
    num: '03',
    time: '02:45–03:30',
    duration: '45 min',
    activity: 'Shivam Patel',
    desc: [
      'Application Development · Tata Consultancy Services',
      'Topic: Enterprise Application Development and Microservices',
      'Areas: Microservices, databases, application development, network security, DevOps and MLOps',
    ],
    badge: 'Industry Expert',
  },
  {
    num: '04',
    time: '03:30–03:45',
    duration: '15 min',
    activity: 'Open Q&A and Career Guidance',
    desc: [
      'Interaction with all three industry speakers',
      'Student questions on AI, cloud, DevOps and software careers',
      'Key takeaways from the day\'s sessions',
    ],
  },
  {
    num: '05',
    time: '03:45–04:00',
    duration: '15 min',
    activity: 'Certificate Distribution and Closing Ceremony',
    desc: [
      'Distribution of participation certificates',
      'Recognition of AI quiz winners',
      'Vote of thanks to speakers, faculty and organizers',
      'Group photograph and formal conclusion',
    ],
    badge: 'Closing',
  },
];



function ScheduleRow({ item, idx }: { item: ScheduleItem; idx: number }) {
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: idx * 0.04 }}
      className="py-5 flex items-start gap-4 sm:gap-5"
    >
      {/* Number */}
      <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tighter shrink-0 w-9">
        {item.num}
      </div>

      {/* Divider */}
      <div className="h-full min-h-[2.5rem] w-px bg-slate-200 shrink-0 mt-1" />

      {/* Time + duration */}
      <div className="shrink-0 w-32 sm:w-36">
        <div className="text-xs sm:text-sm font-semibold text-slate-700 font-mono leading-tight">
          {item.time}
        </div>
        <div className="text-[10px] text-slate-400 mt-0.5">{item.duration}</div>
      </div>

      {/* Divider */}
      <div className="h-full min-h-[2.5rem] w-px bg-slate-200 shrink-0 mt-1 hidden sm:block" />

      {/* Content */}
      <div className="grow min-w-0">
        <div className="mb-1">
          <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {item.activity}
          </span>
        </div>
        <ul className="space-y-0.5">
          {item.desc.map((line, i) => (
            <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
              <span className="mt-[3px] shrink-0 w-1 h-1 rounded-full bg-slate-300 inline-block" />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ScheduleSection() {
  return (
    <section id="timeline" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
            Timeline
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Single-day intensive schedule on Wednesday, 14 October 2026 at Prof. Laxman Havnoor Auditorium.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left: Morning Session ── */}
          <div className="space-y-6">
            {/* Pill */}
            <div className="p-0.5 rounded-full bg-gradient-to-r from-[#34A853] via-[#4285F4] to-[#1A73E8]">
              <div className="bg-white rounded-full py-2.5 px-6 text-center">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  Morning Session · 10:00 AM – 12:30 PM
                </span>
              </div>
            </div>

            {/* Morning rows */}
            <div className="divide-y divide-slate-100">
              {morningItems.map((item, idx) => (
                <ScheduleRow key={idx} item={item} idx={idx} />
              ))}
            </div>

            {/* Lunch Break */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4 flex items-center gap-4"
            >
              <div className="text-2xl">🍽️</div>
              <div>
                <div className="font-bold text-amber-800 text-sm">Lunch &amp; Networking</div>
                <div className="text-xs text-amber-700 mt-0.5">12:30 – 1:15 PM · 45 minutes</div>
                <div className="text-xs text-amber-600 mt-1">
                  Lunch for participants, faculty members, organizers and invited speakers.
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Afternoon Session ── */}
          <div className="space-y-6">
            {/* Pill */}
            <div className="p-0.5 rounded-full bg-gradient-to-r from-[#1A73E8] via-[#FBBC04] to-[#EA4335]">
              <div className="bg-white rounded-full py-2.5 px-6 text-center">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  Afternoon Session · 1:15 PM – 4:00 PM
                </span>
              </div>
            </div>

            {/* Afternoon rows */}
            <div className="divide-y divide-slate-100">
              {afternoonItems.map((item, idx) => (
                <ScheduleRow key={idx} item={item} idx={idx} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
