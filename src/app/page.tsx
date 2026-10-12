'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import WhatsInStoreSection from '@/components/WhatsInStoreSection';
import SpeakersSection from '@/components/SpeakersSection';
import ScheduleSection from '@/components/ScheduleSection';
import VenueSection from '@/components/VenueSection';
import YourReceiptSection from '@/components/YourReceiptSection';
import GuidelinesSection from '@/components/GuidelinesSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import FindPassModal from '@/components/FindPassModal';
import { initialEventConfig } from '@/lib/data';
import { EventConfig, SeatStats } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [config, setConfig] = useState<EventConfig>(initialEventConfig);
  const [seats, setSeats] = useState<SeatStats>({
    maxCapacity: 250,
    totalRegistered: 0,
    seatsRemaining: 250,
  });
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [findPassModalOpen, setFindPassModalOpen] = useState(false);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      if (data.success) {
        if (data.data) setConfig(data.data);
        if (data.seats) setSeats(data.seats);
      }
    } catch (e) {
      // Fallback to initial config
    }
  };

  useEffect(() => {
    fetchConfig();
    const interval = setInterval(fetchConfig, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-900 font-sans selection:bg-[#4285F4]/20 selection:text-[#1A73E8]">
      {/* Sticky Navigation */}
      <Navbar
        onOpenRegister={() => setRegisterModalOpen(true)}
        onOpenFindPass={() => setFindPassModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="grow">
        <Hero
          config={config}
          seats={seats}
          onOpenRegister={() => setRegisterModalOpen(true)}
        />
        <SpeakersSection />
        <AboutSection
          seats={seats}
          onOpenRegister={() => setRegisterModalOpen(true)}
        />
        <WhatsInStoreSection />
        <ScheduleSection />
        <VenueSection />
        <YourReceiptSection
          onOpenRegister={() => setRegisterModalOpen(true)}
        />
        <GuidelinesSection />
        <FaqSection />

        {/* Bottom Call to Action Banner */}
        <section className="py-20 bg-slate-950 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
              Seats are limited in the Auditorium
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal">
              Join keynote engineers and fellow researchers at Prof. Laxman Havnoor Auditorium, IGNTU Amarkantak on 14 October 2026.
            </p>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] hover:bg-[#1557b0] font-medium leading-none text-white transition-all h-[54px] px-10 text-[17px] shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <span>Register Free Pass</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Pop-up Modals */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        seats={seats}
        onRegistered={(newSeats) => {
          if (newSeats) {
            setSeats(newSeats);
          } else {
            fetchConfig();
          }
        }}
      />

      <FindPassModal
        isOpen={findPassModalOpen}
        onClose={() => setFindPassModalOpen(false)}
      />
    </div>
  );
}
