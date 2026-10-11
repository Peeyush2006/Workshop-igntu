import React, { Suspense } from 'react';
import PassDetailContent from './PassDetailContent';

export const dynamic = 'force-dynamic';

export default async function PassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="text-xs font-semibold text-slate-500">
            Loading pass details...
          </div>
        </div>
      }
    >
      <PassDetailContent passId={resolvedParams.id} />
    </Suspense>
  );
}
