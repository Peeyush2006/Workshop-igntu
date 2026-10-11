export type ParticipantRole =
  | 'UG Student'
  | 'PG Student'
  | 'PhD Scholar'
  | 'Faculty Member'
  | 'Industry Professional'
  | 'Invited Guest';

export interface EventConfig {
  id: string;
  title: string;
  themeSubtitle: string;
  institution: string;
  department: string;
  eventDate: string; // "2026-10-14"
  eventDateFormatted: string; // "14 October 2026"
  eventFormat: string; // "One-day academic workshop-cum-seminar"
  startTime: string; // "09:30 AM"
  endTime: string; // "05:30 PM"
  registrationDeadline: string; // "2026-10-13T23:59:59"
  venue: string;
  venueAddress: string;
  registrationFee: string; // "Free"
  maxCapacity: number; // e.g. 250
  contactEmail: string;
  contactPhone: string;
  emergencyNotice?: string;
  allowNewRegistrations: boolean;
}

export interface SeatStats {
  maxCapacity: number;
  totalRegistered: number;
  seatsRemaining: number;
}

export interface TechnicalExpertise {
  category: string;
  skills: string[];
}

export interface Speaker {
  id: string;
  name: string;
  designation: string;
  organization?: string;
  coreAreas: string;
  biography: string;
  technicalExpertise: TechnicalExpertise[];
  photoUrl: string;
  sessionTitle: string;
  sessionTime: string;
  sessionType: 'Keynote Address' | 'Technical Session' | 'Special Lecture';
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: 'Inaugural' | 'Keynote' | 'Technical' | 'Networking' | 'Panel' | 'Valedictory';
  speakerId?: string;
  speakerName?: string;
  description: string;
  venue: string;
}

export interface OrganizingMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  departmentOrOrg: string;
  isChiefPatron?: boolean;
  category: 'Patrons' | 'Convener & Secretaries' | 'Faculty Coordinators' | 'Student Committee';
}

export interface Registration {
  id: string; // e.g. "VB2047-8149"
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  role: ParticipantRole;
  department: string;
  idNumber: string; // Roll number or Employee ID
  reasonForAttending?: string;
  accommodationRequired: 'Yes' | 'No';
  qrCodeDataUrl: string;
  verificationToken: string;
  registeredAt: string; // ISO string
  checkedIn: boolean;
  checkedInAt?: string | null;
  checkInNotes?: string;
}

export interface CheckInResult {
  success: boolean;
  message: string;
  status: 'SUCCESS' | 'ALREADY_CHECKED_IN' | 'NOT_FOUND' | 'INVALID_TOKEN';
  participant?: {
    id: string;
    fullName: string;
    email: string;
    institution: string;
    role: string;
    department: string;
    checkedIn: boolean;
    checkedInAt?: string | null;
  };
}
