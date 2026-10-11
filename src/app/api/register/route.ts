import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getEventConfig,
  getRegistrations,
  findRegistrationByEmail,
  saveRegistration,
  getStats,
} from '@/lib/storage';
import { generateQrCode, createVerificationToken } from '@/lib/qr';
import { Registration, ParticipantRole } from '@/lib/types';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required (minimum 2 characters)'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().min(10, 'Valid 10-digit mobile number is required'),
  institution: z.string().min(2, 'Institution or University name is required'),
  role: z.enum([
    'UG Student',
    'PG Student',
    'PhD Scholar',
    'Faculty Member',
    'Industry Professional',
    'Invited Guest',
  ]),
  department: z.string().min(2, 'Department is required'),
  idNumber: z.string().min(2, 'Roll number or Employee ID is required'),
  reasonForAttending: z.string().optional(),
  accommodationRequired: z.enum(['Yes', 'No']).default('No'),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = registrationSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      institution,
      role,
      department,
      idNumber,
      reasonForAttending,
      accommodationRequired,
    } = parsed.data;

    const config = getEventConfig();
    const existingList = getRegistrations();

    // Check if registrations are open
    if (!config.allowNewRegistrations) {
      return NextResponse.json(
        { success: false, error: 'Registration is currently closed by the organizers.' },
        { status: 400 }
      );
    }

    // Check capacity limit
    if (existingList.length >= config.maxCapacity) {
      return NextResponse.json(
        {
          success: false,
          error: `Registration capacity reached (${config.maxCapacity} seats). Please contact the department organizers.`,
        },
        { status: 400 }
      );
    }

    // Check if already registered
    const existing = findRegistrationByEmail(email);
    if (existing) {
      if (!existing.qrCodeDataUrl) {
        const qrPayload = JSON.stringify({
          id: existing.id,
          token: existing.verificationToken,
          name: existing.fullName,
          role: existing.role,
          event: 'AI for Viksit Bharat @ 2047',
          date: '2026-10-14',
        });
        existing.qrCodeDataUrl = await generateQrCode(qrPayload);
        saveRegistration(existing);
      }
      const maxCap = config.maxCapacity || 250;
      const totalReg = existingList.length;
      return NextResponse.json(
        {
          success: true,
          message: 'You are already registered for this event! Here is your digital pass.',
          isExisting: true,
          data: existing,
          seats: {
            maxCapacity: maxCap,
            totalRegistered: totalReg,
            seatsRemaining: Math.max(0, maxCap - totalReg),
          },
        },
        { status: 200 }
      );
    }

    // Generate unique ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const regId = `VB2047-${randomSuffix}`;
    const token = createVerificationToken(regId, email);

    // QR payload contains JSON with verification essentials
    const qrPayload = JSON.stringify({
      id: regId,
      token,
      name: fullName,
      role,
      event: 'AI for Viksit Bharat @ 2047',
      date: '2026-10-14',
    });

    const qrCodeDataUrl = await generateQrCode(qrPayload);

    const newRegistration: Registration = {
      id: regId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      institution: institution.trim(),
      role: role as ParticipantRole,
      department: department.trim(),
      idNumber: idNumber.trim(),
      reasonForAttending: reasonForAttending?.trim() || '',
      accommodationRequired,
      qrCodeDataUrl,
      verificationToken: token,
      registeredAt: new Date().toISOString(),
      checkedIn: false,
      checkedInAt: null,
    };

    saveRegistration(newRegistration);
    const updatedStats = getStats();
    const maxCap = config.maxCapacity || 250;
    const totalReg = updatedStats.totalRegistered || 0;

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Digital Pass generated.',
        data: newRegistration,
        seats: {
          maxCapacity: maxCap,
          totalRegistered: totalReg,
          seatsRemaining: Math.max(0, maxCap - totalReg),
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while processing registration.' },
      { status: 500 }
    );
  }
}
