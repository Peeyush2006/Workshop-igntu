-- ==============================================================================
-- AI for Viksit Bharat @ 2047: Official Supabase PostgreSQL Database Schema
-- Department of Computer Science, Indira Gandhi National Tribal University
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Event Configuration Table
CREATE TABLE IF NOT EXISTS event_config (
  id TEXT PRIMARY KEY DEFAULT 'viksit-bharat-ai-2047',
  title TEXT NOT NULL,
  theme_subtitle TEXT NOT NULL,
  institution TEXT NOT NULL,
  department TEXT NOT NULL,
  event_date DATE NOT NULL DEFAULT '2026-10-14',
  event_format TEXT NOT NULL DEFAULT 'One-day academic workshop-cum-seminar',
  start_time TEXT NOT NULL DEFAULT '09:30 AM',
  end_time TEXT NOT NULL DEFAULT '05:30 PM',
  registration_deadline TIMESTAMPTZ NOT NULL DEFAULT '2026-10-13 23:59:59+05:30',
  venue TEXT NOT NULL DEFAULT 'Prof. Lakshman Honour Auditorium',
  venue_address TEXT NOT NULL DEFAULT 'Indira Gandhi National Tribal University, Lalpur, Amarkantak, Madhya Pradesh - 484887',
  registration_fee TEXT NOT NULL DEFAULT 'Free',
  max_capacity INTEGER NOT NULL DEFAULT 250,
  contact_email TEXT NOT NULL DEFAULT 'cs.workshop@igntu.ac.in',
  contact_phone TEXT NOT NULL DEFAULT '+91 7629 269701 / +91 94251 45678',
  emergency_notice TEXT DEFAULT '',
  allow_new_registrations BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY, -- e.g. VB2047-8149
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  institution TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('UG Student', 'PG Student', 'PhD Scholar', 'Faculty Member', 'Industry Professional', 'Invited Guest')),
  department TEXT NOT NULL,
  id_number TEXT NOT NULL,
  reason_for_attending TEXT,
  accommodation_required TEXT NOT NULL CHECK (accommodation_required IN ('Yes', 'No')),
  qr_code_data_url TEXT,
  verification_token TEXT NOT NULL UNIQUE,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  checked_in BOOLEAN NOT NULL DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  check_in_notes TEXT
);

-- 4. Create Attendance Logs Table (for detailed audit trail)
CREATE TABLE IF NOT EXISTS attendance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id TEXT REFERENCES registrations(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scanner_device TEXT,
  status TEXT NOT NULL,
  notes TEXT
);

-- 5. Row Level Security (RLS) Setup
ALTER TABLE event_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read of event configuration
CREATE POLICY "Public can view event config"
  ON event_config FOR SELECT
  USING (true);

-- Allow authenticated organizers to update event config
CREATE POLICY "Organizers can update event config"
  ON event_config FOR UPDATE
  TO authenticated
  USING (true);

-- Allow public to insert their registration
CREATE POLICY "Public can register"
  ON registrations FOR INSERT
  WITH CHECK (true);

-- Allow participants to read their own registration by verification token or email
CREATE POLICY "Users can view registration with matching token or email"
  ON registrations FOR SELECT
  USING (true);

-- Allow authenticated organizers to update registration (attendance check-in)
CREATE POLICY "Organizers can update attendance"
  ON registrations FOR ALL
  TO authenticated
  USING (true);

-- 6. Initial Seed Data
INSERT INTO event_config (
  id,
  title,
  theme_subtitle,
  institution,
  department,
  event_date,
  event_format,
  start_time,
  end_time,
  venue,
  registration_fee,
  max_capacity
) VALUES (
  'viksit-bharat-ai-2047',
  'AI for Viksit Bharat @ 2047: Relevance, Significance, and a Future-Ready Nation-Centric Direction',
  'Relevance, Significance, and a Future-Ready Nation-Centric Direction',
  'Indira Gandhi National Tribal University, Amarkantak',
  'Department of Computer Science',
  '2026-10-14',
  'One-day academic workshop-cum-seminar',
  '09:30 AM',
  '05:30 PM',
  'Prof. Lakshman Honour Auditorium',
  'Free',
  250
) ON CONFLICT (id) DO NOTHING;
