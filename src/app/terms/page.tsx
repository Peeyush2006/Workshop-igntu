import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Terms and Conditions | AI for Viksit Bharat @ 2047 | IGNTU Amarkantak',
  description:
    'Academic workshop terms, participation conditions, and certification guidelines for AI for Viksit Bharat @ 2047 at Indira Gandhi National Tribal University.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-900 bg-white border border-slate-300 px-3 py-1.5 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Event Home</span>
          </Link>
        </div>

        {/* Header Container */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-10 shadow-sm mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-blue-900" />
            <span>Academic Regulations | IGNTU Amarkantak</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Terms and Conditions of Participation
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            AI for Viksit Bharat @ 2047: Relevance, Significance, and a Future-Ready Nation-Centric Direction
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Date of Workshop: 14 October 2026</span>
            <span>|</span>
            <span>Venue: Prof. Laxman Havnoor Auditorium</span>
          </div>
        </div>

        {/* Terms Body */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              1. Event Scope and Structure
            </h2>
            <p>
              AI for Viksit Bharat @ 2047 is a single-day academic workshop-cum-seminar convened on Wednesday, 14 October 2026, by the Department of Computer Science, Indira Gandhi National Tribal University (IGNTU), Amarkantak.
            </p>
            <p>
              By registering through this portal, participants agree to comply fully with the academic guidelines, auditorium regulations, and institutional rules of IGNTU.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              2. Eligibility and Free Registration
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Registration is 100% free of charge for eligible students, research scholars, faculty members, and technology professionals.</li>
              <li>Registrations are accepted on a first-come, first-served basis up to the auditorium seating capacity of 250 delegates.</li>
              <li>Applicants must provide genuine institutional identification details (Roll Number, Faculty ID, or Organization ID). The organizing committee reserves the right to cancel unverified registrations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              3. Digital Pass and Physical Check-in Requirements
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Each registered participant is issued a unique Digital E-Pass with an encrypted QR code.</li>
              <li>Delegate passes are non-transferable and may not be shared, duplicated, or reassigned.</li>
              <li>Physical attendance must be verified at the registration desk of Prof. Laxman Havnoor Auditorium on 14 October 2026 between 09:00 AM and 09:45 AM using the digital QR scanner.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              4. Certificate of Participation Eligibility
            </h2>
            <p>
              Certificates of Participation are awarded exclusively to registered delegates who meet all of the following criteria:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>Successfully completed registration through the official portal.</li>
              <li>Completed physical QR code verification at the auditorium desk on the morning of 14 October 2026.</li>
              <li>Attended all keynote lectures, technical sessions, and the panel discussion throughout the single-day schedule.</li>
            </ol>
            <p className="text-xs text-slate-500 italic">
              Note: Proxy attendance, failure to check in, or departure prior to the valedictory session will invalidate certificate eligibility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              5. Intellectual Property and Academic Integrity
            </h2>
            <p>
              All presentation materials, slides, demonstrations, and technical code samples delivered by keynote speakers (Aditi Saraf, Shivansh Gupta, and Shivam Patel) remain the intellectual property of the respective speakers or their affiliated organizations. Materials are shared strictly for educational and non-commercial research purposes. Unauthorized commercial reproduction is prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              6. Auditorium Decorum and Campus Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Delegates are required to observe formal academic decorum throughout the workshop.</li>
              <li>Mobile devices must remain on silent mode within the auditorium.</li>
              <li>All attendees must comply with university security standards, waste disposal regulations, and environmental guidelines across the Amarkantak biosphere campus.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              7. Jurisdiction and Dispute Resolution
            </h2>
            <p>
              These terms are governed by the applicable laws of India and university statutes of Indira Gandhi National Tribal University. Any disputes arising in connection with the event shall fall under the exclusive jurisdiction of the competent courts in Anuppur / Jabalpur, Madhya Pradesh.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <Link href="/privacy" className="text-blue-900 font-bold hover:underline">
            View Privacy Policy
          </Link>
          <span className="mx-2">|</span>
          <Link href="/" className="text-slate-600 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
