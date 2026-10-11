'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '@/lib/data';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-sans">
            FAQs
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Everything you need to know about participating in AI for Viksit Bharat @ 2047.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 hover:text-[#1A73E8] transition-colors gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-sans font-bold">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-[#1A73E8]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Note */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center text-sm text-slate-600">
          Need further academic or accommodation assistance? Reach out to the organizing desk at{' '}
          <a
            href="mailto:peeyushkumartiwari18@gmail.com"
            className="text-[#1A73E8] font-bold hover:underline"
          >
            peeyushkumartiwari18@gmail.com
          </a>
          {' '}or call{' '}
          <a
            href="tel:+919202261369"
            className="text-[#1A73E8] font-bold hover:underline"
          >
            +91 9202261369
          </a>
        </div>
      </div>
    </section>
  );
}
