import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Lock, FileText, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | AI for Viksit Bharat @ 2047 | IGNTU Amarkantak',
  description:
    'Institutional data governance and privacy policy for participants of AI for Viksit Bharat @ 2047 at Indira Gandhi National Tribal University.',
};

export default function PrivacyPolicyPage() {
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
            <Shield className="w-3.5 h-3.5 text-blue-900" />
            <span>Department of Computer Science | IGNTU Amarkantak</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Participant Data Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            AI for Viksit Bharat @ 2047: Relevance, Significance, and a Future-Ready Nation-Centric Direction
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Effective Date: 1 October 2026</span>
            <span>|</span>
            <span>Compliance: Digital Personal Data Protection Act (DPDP Act, 2023)</span>
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              1. Institutional Commitment
            </h2>
            <p>
              The Department of Computer Science, Indira Gandhi National Tribal University (IGNTU), Amarkantak, is committed to safeguarding the privacy and personal data of all registered attendees, students, research scholars, faculty members, and invited experts participating in the academic workshop-cum-seminar scheduled for 14 October 2026.
            </p>
            <p>
              This policy explains the lawful basis, purpose, storage, and retention of personal data collected through the official event registration portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              2. Information Collected Upon Registration
            </h2>
            <p>To administer the workshop and generate secure digital credentials, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Full Name and Academic Title</li>
              <li>Official Institutional or Personal Email Address</li>
              <li>Mobile or WhatsApp Contact Number</li>
              <li>Affiliated University, College, or Organization</li>
              <li>Academic Role (Undergraduate, Postgraduate, PhD Scholar, Faculty Member, or Professional)</li>
              <li>Academic Department and Institutional Roll Number / Employee ID</li>
              <li>Optional accommodation requirements and academic motivation statements</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              3. Purpose of Processing
            </h2>
            <p>Data collected is strictly used for legitimate academic administration, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Issuing individualized digital delegate passes with encrypted verification tokens.</li>
              <li>Verifying physical attendance at the registration desk of Prof. Laxman Havnoor Auditorium on 14 October 2026.</li>
              <li>Printing official Certificates of Participation.</li>
              <li>Communicating logistical notices, session schedule updates, or emergency announcements.</li>
              <li>Compiling non-personally identifiable statistical summaries for academic accreditation and university reporting.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              4. Digital QR Code and Cryptographic Tokens
            </h2>
            <p>
              Each registration generates a tamper-evident cryptographic verification token. The QR code embedded within your delegate pass contains only your registration reference, participant name, category, and digital signature. No sensitive financial information or government national ID numbers are stored in the QR code.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              5. Non-Disclosure and Third-Party Sharing
            </h2>
            <p>
              The Department of Computer Science and IGNTU do not sell, rent, commercialize, or disclose participant records to any external commercial marketing entities. Data may only be shared with authorized university auditing bodies or statutory agencies where mandated by applicable Indian law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              6. Data Retention and Security Measures
            </h2>
            <p>
              All registration data is stored in secure university databases with role-based authentication restrictions. Following the conclusion of the workshop on 14 October 2026 and the issuance of verified certificates, registration logs are archived in accordance with university record retention standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
              7. Participant Rights and Contact Information
            </h2>
            <p>
              Participants retain the right to review, rectify, or request the deletion of their registration records prior to the event date. Inquiries regarding data governance may be directed to:
            </p>
            <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs space-y-1 font-mono text-slate-800">
              <div>Organizing Committee: AI for Viksit Bharat @ 2047</div>
              <div>Department of Computer Science</div>
              <div>Indira Gandhi National Tribal University, Lalpur, Amarkantak, M.P. - 484887</div>
              <div>Email: cs.workshop@igntu.ac.in</div>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <Link href="/terms" className="text-blue-900 font-bold hover:underline">
            View Terms and Conditions
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
