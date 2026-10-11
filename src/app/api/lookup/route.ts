import { NextResponse } from 'next/server';
import { findRegistrationAny, saveRegistration } from '@/lib/storage';
import { generateQrCode } from '@/lib/qr';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Please enter your email, Registration ID, phone, or roll number.' },
        { status: 400 }
      );
    }

    const reg = findRegistrationAny(query);

    if (!reg) {
      return NextResponse.json(
        {
          success: false,
          error: `No registration found matching "${query}". Please verify your details or register for a free pass.`,
        },
        { status: 404 }
      );
    }

    // Ensure QR code is generated if missing
    if (!reg.qrCodeDataUrl) {
      const qrPayload = JSON.stringify({
        id: reg.id,
        token: reg.verificationToken,
        name: reg.fullName,
        role: reg.role,
        event: 'AI for Viksit Bharat @ 2047',
        date: '2026-10-14',
      });
      reg.qrCodeDataUrl = await generateQrCode(qrPayload);
      saveRegistration(reg);
    }

    return NextResponse.json({ success: true, data: reg });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal error while looking up pass' },
      { status: 500 }
    );
  }
}
