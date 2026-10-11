import { NextResponse } from 'next/server';
import { verifyAndCheckIn } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, notes } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid QR code or registration ID is required' },
        { status: 400 }
      );
    }

    let parsedIdentifier = code.trim();

    // Check if code is a JSON payload from the QR
    if (parsedIdentifier.startsWith('{') && parsedIdentifier.endsWith('}')) {
      try {
        const payload = JSON.parse(parsedIdentifier);
        if (payload.token) {
          parsedIdentifier = payload.token;
        } else if (payload.id) {
          parsedIdentifier = payload.id;
        }
      } catch (e) {
        // Continue with raw code if JSON parse fails
      }
    }

    const result = verifyAndCheckIn(parsedIdentifier, notes);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while verifying attendee' },
      { status: 500 }
    );
  }
}
