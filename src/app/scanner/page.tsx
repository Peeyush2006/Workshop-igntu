'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ScannerPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
      <p className="text-sm font-semibold">Redirecting to Organizer Portal...</p>
    </div>
  );
}
