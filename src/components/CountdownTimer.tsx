'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

interface CountdownTimerProps {
  eventDate: string; // e.g. "2026-10-14"
  startTime?: string; // e.g. "09:30 AM"
  endTime?: string; // e.g. "05:30 PM"
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
  isEnded: boolean;
}

export default function CountdownTimer({
  eventDate,
  startTime = '09:30 AM',
  endTime = '05:30 PM',
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    function parseEventDateTime(): { start: Date; end: Date } {
      const [year, month, day] = eventDate.split('-').map(Number);
      
      let startHours = 9;
      let startMinutes = 30;
      if (startTime) {
        const match = startTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (match) {
          startHours = parseInt(match[1], 10);
          startMinutes = parseInt(match[2], 10);
          const modifier = match[3]?.toUpperCase();
          if (modifier === 'PM' && startHours < 12) startHours += 12;
          if (modifier === 'AM' && startHours === 12) startHours = 0;
        }
      }

      let endHours = 17;
      let endMinutes = 30;
      if (endTime) {
        const match = endTime.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (match) {
          endHours = parseInt(match[1], 10);
          endMinutes = parseInt(match[2], 10);
          const modifier = match[3]?.toUpperCase();
          if (modifier === 'PM' && endHours < 12) endHours += 12;
          if (modifier === 'AM' && endHours === 12) endHours = 0;
        }
      }

      const start = new Date(year, month - 1, day, startHours, startMinutes, 0);
      const end = new Date(year, month - 1, day, endHours, endMinutes, 0);
      return { start, end };
    }

    const updateCountdown = () => {
      const now = new Date();
      const { start, end } = parseEventDateTime();

      if (now > end) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isStarted: true,
          isEnded: true,
        });
        return;
      }

      if (now >= start && now <= end) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isStarted: true,
          isEnded: false,
        });
        return;
      }

      const diff = start.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        isStarted: false,
        isEnded: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate, startTime, endTime]);

  if (!timeRemaining) {
    return (
      <div className="flex flex-col items-start gap-2 w-full max-w-sm">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          <Clock className="w-3.5 h-3.5 text-[#1A73E8]" />
          <span>Event Countdown</span>
        </div>
        <div className="grid grid-cols-4 gap-2 w-full">
          {['Days', 'Hours', 'Mins', 'Secs'].map((label) => (
            <div key={label} className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/90 rounded-2xl py-2 px-1 shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-slate-400 font-mono tracking-tight leading-none">
                --
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (timeRemaining.isEnded) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold">
        <CheckCircle className="w-4 h-4 text-emerald-700" />
        <span>Workshop Concluded on 14 October 2026. Certificates Issued.</span>
      </div>
    );
  }

  if (timeRemaining.isStarted) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
        <span className="w-2 h-2 rounded bg-amber-600" />
        <span>Workshop in Progress: Prof. Laxman Havnoor Auditorium</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2 w-full max-w-sm">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
        <Clock className="w-3.5 h-3.5 text-[#1A73E8]" />
        <span>Event Countdown</span>
      </div>
      <div className="grid grid-cols-4 gap-2 w-full">
        <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/90 rounded-2xl py-2 px-1 shadow-2xs">
          <span className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight leading-none">
            {timeRemaining.days}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Days</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/90 rounded-2xl py-2 px-1 shadow-2xs">
          <span className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight leading-none">
            {String(timeRemaining.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Hours</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/90 rounded-2xl py-2 px-1 shadow-2xs">
          <span className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight leading-none">
            {String(timeRemaining.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Mins</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-blue-50/40 border border-blue-200/90 rounded-2xl py-2 px-1 shadow-2xs">
          <span className="text-xl sm:text-2xl font-black text-[#1A73E8] font-mono tracking-tight leading-none">
            {String(timeRemaining.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold text-[#1A73E8] uppercase mt-1">Secs</span>
        </div>
      </div>
    </div>
  );
}
