import { NextResponse } from 'next/server';
import { getEventConfig, updateEventConfig, getStats } from '@/lib/storage';

export async function GET() {
  try {
    const config = getEventConfig();
    const stats = getStats();
    const maxCapacity = config.maxCapacity || 250;
    const totalRegistered = stats.totalRegistered || 0;
    const seatsRemaining = Math.max(0, maxCapacity - totalRegistered);

    return NextResponse.json({
      success: true,
      data: config,
      seats: {
        maxCapacity,
        totalRegistered,
        seatsRemaining,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch config' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = updateEventConfig(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update config' }, { status: 500 });
  }
}
