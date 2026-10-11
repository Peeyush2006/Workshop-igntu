import fs from 'fs';
import path from 'path';
import { EventConfig, Registration, CheckInResult, ParticipantRole } from './types';
import { initialEventConfig } from './data';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// In-memory fallback if file system write is blocked
let memoryConfig: EventConfig = { ...initialEventConfig };
let memoryRegistrations: Registration[] = [
  {
    id: 'VB2047-1001',
    fullName: 'Pooja Tiwari',
    email: 'pooja.t@igntu.ac.in',
    phone: '+91 98765 43210',
    institution: 'Indira Gandhi National Tribal University',
    role: 'PhD Scholar',
    department: 'Department of Computer Science',
    idNumber: '24PHDCS004',
    reasonForAttending: 'Research in Indic NLP and Tribal Dialect translation using transformer models.',
    accommodationRequired: 'No',
    qrCodeDataUrl: '',
    verificationToken: 'token_sample_1001',
    registeredAt: '2026-10-01T10:00:00.000Z',
    checkedIn: true,
    checkedInAt: '2026-10-14T09:15:30.000Z',
    checkInNotes: 'Verified at Desk A',
  },
  {
    id: 'VB2047-1002',
    fullName: 'Rahul Verma',
    email: 'rahul.v@mnnit.ac.in',
    phone: '+91 91234 56789',
    institution: 'Motilal Nehru National Institute of Technology',
    role: 'PG Student',
    department: 'Computer Science & Engineering',
    idNumber: '25MCA019',
    reasonForAttending: 'To learn about MLOps and cloud native architectures for nation scale apps.',
    accommodationRequired: 'Yes',
    qrCodeDataUrl: '',
    verificationToken: 'token_sample_1002',
    registeredAt: '2026-10-02T14:20:00.000Z',
    checkedIn: false,
    checkedInAt: null,
  },
  {
    id: 'VB2047-1003',
    fullName: 'Dr. Sunita Baghel',
    email: 'sunita.baghel@bilaspuruniv.ac.in',
    phone: '+91 94060 11223',
    institution: 'Atal Bihari Vajpayee Vishwavidyalaya, Bilaspur',
    role: 'Faculty Member',
    department: 'Information Technology',
    idNumber: 'FAC-IT-882',
    reasonForAttending: 'Collaborative curriculum design on AI for rural development.',
    accommodationRequired: 'Yes',
    qrCodeDataUrl: '',
    verificationToken: 'token_sample_1003',
    registeredAt: '2026-10-04T11:45:00.000Z',
    checkedIn: false,
    checkedInAt: null,
  },
  {
    id: 'VB2047-1004',
    fullName: 'Anurag Meena',
    email: 'anurag.meena@igntu.ac.in',
    phone: '+91 88712 99001',
    institution: 'Indira Gandhi National Tribal University',
    role: 'UG Student',
    department: 'Department of Computer Science',
    idNumber: '23BCACS042',
    reasonForAttending: 'Passionate about backend engineering with Spring Boot and Kubernetes.',
    accommodationRequired: 'No',
    qrCodeDataUrl: '',
    verificationToken: 'token_sample_1004',
    registeredAt: '2026-10-05T09:12:00.000Z',
    checkedIn: false,
    checkedInAt: null,
  },
];

export function getEventConfig(): EventConfig {
  try {
    ensureDataDir();
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return { ...initialEventConfig, ...JSON.parse(data) };
    }
    // initialize file
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(initialEventConfig, null, 2), 'utf-8');
    return initialEventConfig;
  } catch (error) {
    console.warn('Storage: falling back to in-memory config', error);
    return memoryConfig;
  }
}

export function updateEventConfig(updates: Partial<EventConfig>): EventConfig {
  try {
    ensureDataDir();
    const current = getEventConfig();
    const updated = { ...current, ...updates };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    memoryConfig = updated;
    return updated;
  } catch (error) {
    console.warn('Storage: updating in-memory config only', error);
    memoryConfig = { ...memoryConfig, ...updates };
    return memoryConfig;
  }
}

export function getRegistrations(): Registration[] {
  try {
    ensureDataDir();
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      const data = fs.readFileSync(REGISTRATIONS_FILE, 'utf-8');
      const list = JSON.parse(data);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
    // seed file
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(memoryRegistrations, null, 2), 'utf-8');
    return memoryRegistrations;
  } catch (error) {
    console.warn('Storage: falling back to in-memory registrations', error);
    return memoryRegistrations;
  }
}

export function saveRegistration(reg: Registration): Registration {
  const current = getRegistrations();
  const existingIdx = current.findIndex(
    (item) => item.id === reg.id || item.email.toLowerCase() === reg.email.toLowerCase()
  );

  let updatedList: Registration[];
  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = reg;
  } else {
    updatedList = [reg, ...current];
  }

  try {
    ensureDataDir();
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(updatedList, null, 2), 'utf-8');
  } catch (error) {
    console.warn('Storage: saved in memory only', error);
  }
  memoryRegistrations = updatedList;
  return reg;
}

export function findRegistrationById(id: string): Registration | null {
  const list = getRegistrations();
  const normalized = id.trim().toUpperCase();
  return list.find((item) => item.id.toUpperCase() === normalized) || null;
}

export function findRegistrationByEmail(email: string): Registration | null {
  const list = getRegistrations();
  const normalized = email.trim().toLowerCase();
  return list.find((item) => item.email.toLowerCase() === normalized) || null;
}

export function findRegistrationAny(query: string): Registration | null {
  const list = getRegistrations();
  const raw = query.trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const digits = raw.replace(/\D/g, '');

  return (
    list.find((item) => {
      // 1. Exact or normalized ID (e.g. VB2047-1001 or 1001)
      if (item.id.toLowerCase() === lower) return true;
      if (lower.length >= 3 && item.id.toLowerCase().includes(lower)) return true;
      if (digits.length >= 3 && item.id.replace(/\D/g, '').endsWith(digits)) return true;

      // 2. Email match
      if (item.email.toLowerCase() === lower) return true;
      if (lower.includes('@') && item.email.toLowerCase().includes(lower)) return true;

      // 3. Full Name match
      if (item.fullName.toLowerCase() === lower) return true;
      if (lower.length >= 3 && item.fullName.toLowerCase().includes(lower)) return true;

      // 4. Roll / Employee ID Number match
      if (item.idNumber.toLowerCase() === lower) return true;
      if (lower.length >= 3 && item.idNumber.toLowerCase().includes(lower)) return true;

      // 5. Phone number match
      if (digits.length >= 10 && item.phone.replace(/\D/g, '').includes(digits)) return true;

      // 6. Verification token match
      if (item.verificationToken.toLowerCase() === lower) return true;

      return false;
    }) || null
  );
}

export function findRegistrationByTokenOrId(identifier: string): Registration | null {
  const list = getRegistrations();
  const normalized = identifier.trim();
  return (
    list.find(
      (item) =>
        item.id.toLowerCase() === normalized.toLowerCase() ||
        item.verificationToken === normalized
    ) || null
  );
}

export function verifyAndCheckIn(idOrToken: string, notes?: string): CheckInResult {
  const reg = findRegistrationByTokenOrId(idOrToken);

  if (!reg) {
    return {
      success: false,
      message: 'No registration record found with this ID or QR code.',
      status: 'NOT_FOUND',
    };
  }

  if (reg.checkedIn) {
    return {
      success: true,
      message: `Already checked in at ${new Date(reg.checkedInAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
      status: 'ALREADY_CHECKED_IN',
      participant: {
        id: reg.id,
        fullName: reg.fullName,
        email: reg.email,
        institution: reg.institution,
        role: reg.role,
        department: reg.department,
        checkedIn: true,
        checkedInAt: reg.checkedInAt,
      },
    };
  }

  // Mark checked in
  const now = new Date().toISOString();
  reg.checkedIn = true;
  reg.checkedInAt = now;
  if (notes) reg.checkInNotes = notes;

  saveRegistration(reg);

  return {
    success: true,
    message: 'Attendance verified successfully! Welcome to AI for Viksit Bharat @ 2047.',
    status: 'SUCCESS',
    participant: {
      id: reg.id,
      fullName: reg.fullName,
      email: reg.email,
      institution: reg.institution,
      role: reg.role,
      department: reg.department,
      checkedIn: true,
      checkedInAt: now,
    },
  };
}

export function toggleCheckIn(id: string, forceStatus?: boolean): Registration | null {
  const reg = findRegistrationById(id);
  if (!reg) return null;

  const nextStatus = forceStatus !== undefined ? forceStatus : !reg.checkedIn;
  reg.checkedIn = nextStatus;
  reg.checkedInAt = nextStatus ? new Date().toISOString() : null;
  saveRegistration(reg);
  return reg;
}

export function deleteRegistration(id: string): boolean {
  const current = getRegistrations();
  const filtered = current.filter((item) => item.id.toUpperCase() !== id.trim().toUpperCase());
  if (filtered.length === current.length) return false;

  try {
    ensureDataDir();
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  } catch (error) {
    console.warn('Storage: deleted in memory only', error);
  }
  memoryRegistrations = filtered;
  return true;
}

export function getStats() {
  const list = getRegistrations();
  const config = getEventConfig();

  const totalRegistered = list.length;
  const totalCheckedIn = list.filter((item) => item.checkedIn).length;
  const remaining = totalRegistered - totalCheckedIn;
  const attendanceRate = totalRegistered > 0 ? Math.round((totalCheckedIn / totalRegistered) * 100) : 0;

  const byRole: Record<string, number> = {};
  const byInstitution: Record<string, number> = {};

  list.forEach((item) => {
    byRole[item.role] = (byRole[item.role] || 0) + 1;
    const inst = item.institution.trim() || 'Other';
    byInstitution[inst] = (byInstitution[inst] || 0) + 1;
  });

  return {
    totalRegistered,
    totalCheckedIn,
    remaining,
    attendanceRate,
    maxCapacity: config.maxCapacity,
    capacityUtilizedPercent: Math.min(100, Math.round((totalRegistered / config.maxCapacity) * 100)),
    byRole,
    recentRegistrations: list.slice(0, 5),
    recentCheckIns: list
      .filter((item) => item.checkedIn)
      .sort((a, b) => new Date(b.checkedInAt || 0).getTime() - new Date(a.checkedInAt || 0).getTime())
      .slice(0, 6),
  };
}
