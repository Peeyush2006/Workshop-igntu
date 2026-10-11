'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Terminal,
  Server,
  Activity,
  Languages,
  ArrowRight,
} from 'lucide-react';

export default function WhatsInStoreSection() {
  const cards = [
    {
      id: 'experts',
      title: '1:1 with the experts',
      description:
        'A few dedicated minutes with our keynote industry engineers. Bring a real architecture challenge, an MLOps question, or a research hypothesis: first come, first served.',
      icon: <Users className="w-8 h-8 text-slate-800" />,
      bgGradient: 'bg-gradient-to-r from-[#EFF6FF] via-[#F0FDF4] to-[#F8FAFC]',
      borderColor: 'border-blue-100',
    },
    {
      id: 'devops',
      title: 'Cloud & DevOps lounge',
      description:
        'Hands-on architecture breakdown across AWS and Microsoft Azure. Deep dive into Docker containerization, Kubernetes orchestration, Terraform automation, and CI/CD pipelines with Aditi Saraf.',
      icon: <Terminal className="w-8 h-8 text-slate-800" />,
      bgGradient: 'bg-gradient-to-r from-[#ECFDF5] via-[#E6FFFA] to-[#F0FDF4]',
      borderColor: 'border-emerald-100',
    },
    {
      id: 'enterprise',
      title: 'Enterprise modernizations & MLOps',
      description:
        'Deconstruct real-world enterprise engineering from TCS. Explore microservices patterns, database reliability, and machine learning operations (MLOps) integration with Shivam Patel.',
      icon: <Server className="w-8 h-8 text-slate-800" />,
      bgGradient: 'bg-gradient-to-r from-[#FFF1F2] via-[#FFF7ED] to-[#FEF3C7]',
      borderColor: 'border-rose-100',
    },
    {
      id: 'backend',
      title: 'Production backends & observability',
      description:
        'Production application deployments with Nginx, Spring Boot backends, secret governance with Vault, and multi-metric observability using Prometheus and Grafana with Shivansh Gupta.',
      icon: <Activity className="w-8 h-8 text-slate-800" />,
      bgGradient: 'bg-gradient-to-r from-[#FEF9C3] via-[#FEF08A] to-[#ECFDF5]',
      borderColor: 'border-amber-100',
    },
    {
      id: 'indic-ai',
      title: 'Viksit Bharat Indic AI panel',
      description:
        'Interactive panel discussion on Indic NLP (Bhashini), cultural heritage preservation in the Maikal ranges, rural public service delivery, and responsible AI guardrails for 2047.',
      icon: <Languages className="w-8 h-8 text-slate-800" />,
      bgGradient: 'bg-gradient-to-r from-[#F0FDF4] via-[#EFF6FF] to-[#FAF5FF]',
      borderColor: 'border-teal-100',
    },
  ];

  return (
    <section id="whats-brewing" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Description (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
              What&apos;s brewing
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Walk into the auditorium, take your seat, and here&apos;s how you can spend your time during this one-day national symposium.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              Single-Day Intensive Tracks · 14 October 2026
            </div>
          </div>

          {/* Right Column: Stack of Soft Pastel Gradient Cards matching Screenshots 2 & 3 */}
          <div className="lg:col-span-7 space-y-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`${card.bgGradient} p-8 rounded-3xl border ${card.borderColor} shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-6 cursor-default`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-xs border border-white">
                  {card.icon}
                </div>
                <div className="grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
