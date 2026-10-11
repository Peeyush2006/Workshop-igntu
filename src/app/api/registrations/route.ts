import { NextResponse } from 'next/server';
import {
  getRegistrations,
  getStats,
  toggleCheckIn,
  deleteRegistration,
} from '@/lib/storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const role = searchParams.get('role') || 'ALL';
    const status = searchParams.get('status') || 'ALL'; // 'ALL' | 'CHECKED_IN' | 'PENDING'

    let list = getRegistrations();

    if (query) {
      list = list.filter(
        (item) =>
          item.fullName.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.institution.toLowerCase().includes(query) ||
          item.idNumber.toLowerCase().includes(query)
      );
    }

    if (role !== 'ALL') {
      list = list.filter((item) => item.role === role);
    }

    if (status === 'CHECKED_IN') {
      list = list.filter((item) => item.checkedIn);
    } else if (status === 'PENDING') {
      list = list.filter((item) => !item.checkedIn);
    }

    const stats = getStats();

    return NextResponse.json({
      success: true,
      registrations: list,
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve registrations' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, checkedIn } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Registration ID required' }, { status: 400 });
    }

    const updated = toggleCheckIn(id, checkedIn);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update check-in status' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Registration ID required' }, { status: 400 });
    }

    const deleted = deleteRegistration(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Registration deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete registration' },
      { status: 500 }
    );
  }
}
