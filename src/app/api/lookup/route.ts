import { NextResponse } from 'next/server';
import { findRegistrationById, findRegistrationByEmail } from '@/lib/storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Please provide an email or Registration ID' },
        { status: 400 }
      );
    }

    let reg = findRegistrationById(query);
    if (!reg) {
      reg = findRegistrationByEmail(query);
    }

    if (!reg) {
      return NextResponse.json(
        { success: false, error: 'No registration found matching the provided details.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: reg });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal error while looking up pass' },
      { status: 500 }
    );
  }
}
