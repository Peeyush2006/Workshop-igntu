import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI for Viksit Bharat @ 2047 | Department of Computer Science, IGNTU Amarkantak',
  description:
    'Official academic workshop-cum-seminar website for "AI for Viksit Bharat @ 2047: Relevance, Significance, and a Future-Ready Nation-Centric Direction" held on 14 October 2026 at Indira Gandhi National Tribal University, Amarkantak.',
  metadataBase: new URL('https://viksitbharat2047.igntu.ac.in'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
  },
  keywords: [
    'AI for Viksit Bharat @ 2047',
    'IGNTU Amarkantak',
    'Department of Computer Science',
    'Indira Gandhi National Tribal University',
    'Academic Workshop 14 October 2026',
    'Prof. Laxman Havnoor Auditorium',
    'Artificial Intelligence India',
    'Aditi Saraf',
    'Shivansh Gupta',
    'Shivam Patel',
  ],
  authors: [{ name: 'Department of Computer Science, IGNTU' }],
  openGraph: {
    title: 'AI for Viksit Bharat @ 2047 | IGNTU Amarkantak',
    description:
      'National academic workshop-cum-seminar exploring AI for inclusive development, tribal empowerment, and national technological readiness. 14 October 2026.',
    type: 'website',
    url: 'https://viksitbharat2047.igntu.ac.in',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
