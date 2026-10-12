'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Users,
  CheckCircle2,
  Clock,
  Search,
  Trash2,
  Settings,
  ArrowLeft,
  QrCode,
  RefreshCw,
  Lock,
  Eye,
  Check,
  X,
  AlertCircle,
  FileSpreadsheet,
  ExternalLink,
} from 'lucide-react';
import { Registration, EventConfig } from '@/lib/types';
import DigitalPassView from '@/components/DigitalPassView';
import dynamic from 'next/dynamic';

const AdminQrScanner = dynamic(() => import('@/components/AdminQrScanner'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded border border-slate-300 p-8 text-center text-slate-500">
      Loading QR Attendance Station...
    </div>
  ),
});

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'roster' | 'scanner' | 'settings'>('roster');

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [config, setConfig] = useState<EventConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected pass for viewing
  const [viewingPass, setViewingPass] = useState<Registration | null>(null);

  // Config editing state
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [configForm, setConfigForm] = useState<Partial<EventConfig>>({});
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('vb2047_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'Cs@2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vb2047_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vb2047_admin_auth');
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const regRes = await fetch(
        `/api/registrations?q=${encodeURIComponent(searchQuery)}&role=${roleFilter}&status=${statusFilter}`
      );
      const regData = await regRes.json();
      if (regData.success) {
        setRegistrations(regData.registrations);
        setStats(regData.stats);
      }

      const confRes = await fetch('/api/config');
      const confData = await confRes.json();
      if (confData.success) {
        setConfig(confData.data);
        setConfigForm(confData.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, searchQuery, roleFilter, statusFilter]);

  const handleToggleCheckIn = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, checkedIn: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete registration for ${name} (${id})?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/registrations?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      alert('Failed to delete registration');
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configForm),
      });
      const data = await res.json();
      if (data.success) {
        setConfig(data.data);
        setConfigSaveSuccess(true);
        setTimeout(() => setConfigSaveSuccess(false), 3000);
      }
    } catch (err) {
      alert('Failed to save configuration');
    }
  };

  const exportToCSV = () => {
    if (!registrations.length) {
      alert('No records to export');
      return;
    }

    const headers = [
      'Registration ID',
      'Full Name',
      'Role',
      'Email',
      'Phone',
      'Institution',
      'Department',
      'ID Number',
      'Accommodation Needed',
      'Checked In',
      'Checked In Time',
      'Registered At',
    ];

    const rows = registrations.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.role}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.institution.replace(/"/g, '""')}"`,
      `"${r.department.replace(/"/g, '""')}"`,
      `"${r.idNumber}"`,
      `"${r.accommodationRequired}"`,
      `"${r.checkedIn ? 'YES' : 'NO'}"`,
      `"${r.checkedInAt || ''}"`,
      `"${r.registeredAt}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ViksitBharat2047-Registrations-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded border border-slate-300 p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded bg-slate-900 text-white flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-lg font-black text-slate-900">
              Organizer Portal Login
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              AI for Viksit Bharat @ 2047 | Department of Computer Science
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {pinError && (
              <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invalid Password. Enter the authorized organizer password.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Organizer Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter organizer password"
                  className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-slate-800"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Authorized Access Only
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs transition-colors border border-blue-950"
            >
              Authenticate &amp; Open Dashboard
            </button>

            <div className="pt-2 text-center">
              <Link href="/" className="text-xs text-slate-600 hover:text-slate-900">
                Return to Public Event Site
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-300 px-4 py-3 sm:px-6 shadow-xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-slate-900" />
                <h1 className="text-sm sm:text-base font-bold text-slate-900">
                  Organizer Dashboard
                </h1>
              </div>
              <p className="text-[11px] text-slate-500">
                AI for Viksit Bharat @ 2047 | IGNTU Amarkantak
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'scanner' ? 'roster' : 'scanner')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-blue-900 text-white shadow-xs ring-2 ring-blue-300'
                  : 'bg-blue-50 border border-blue-200 text-blue-900 hover:bg-blue-100'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{activeTab === 'scanner' ? 'Close Scanner' : 'QR Scanner Station'}</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'settings' ? 'roster' : 'settings')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Event Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="grow max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Real Analytics Highlights */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('roster')}
              className={`bg-white rounded p-4 border shadow-xs cursor-pointer transition-all ${
                activeTab === 'roster'
                  ? 'border-slate-900 ring-2 ring-slate-900/10'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              title="Click to view full registrations roster"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                <span>Registrations</span>
                <Users className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {stats.totalRegistered}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Configured Capacity: {stats.maxCapacity} ({stats.capacityUtilizedPercent}%)
              </div>
            </div>

            <div
              onClick={() => setActiveTab('scanner')}
              className={`bg-white rounded p-4 border shadow-xs cursor-pointer transition-all group ${
                activeTab === 'scanner'
                  ? 'border-blue-900 ring-2 ring-blue-300'
                  : 'border-slate-300 hover:border-blue-400'
              }`}
              title="Click to open QR Attendance Scanner Station"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                <span>Checked In</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-emerald-800 font-mono">
                {stats.totalCheckedIn}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Physical Attendance: {stats.attendanceRate}%</span>
                <span className="text-blue-700 font-bold group-hover:underline">Open Scanner →</span>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('scanner')}
              className="bg-white rounded p-4 border border-slate-300 shadow-xs cursor-pointer hover:border-blue-400 transition-all group"
              title="Click to verify pending attendees"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                <span>Pending Entry</span>
                <Clock className="w-4 h-4 text-slate-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-slate-800 font-mono">
                {stats.remaining}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Awaiting desk verification</span>
                <span className="text-slate-700 font-semibold group-hover:underline">Verify →</span>
              </div>
            </div>

            <div className="bg-white rounded p-4 border border-slate-300 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                <span>Event Date</span>
                <Clock className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-base font-bold text-slate-900">
                14 Oct 2026
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Prof. Laxman Havnoor Aud.
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Delegates Roster ({registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'scanner'
                  ? 'bg-blue-900 text-white shadow-xs ring-2 ring-blue-300'
                  : 'bg-white border border-slate-300 text-blue-900 hover:bg-blue-50/50'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-amber-500" />
              <span>QR Attendance Scanner Station</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Event Settings</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/scanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-600 hover:text-blue-700 flex items-center gap-1 font-medium hover:underline py-1"
              title="Open full-screen kiosk in a separate browser window"
            >
              <span>Dedicated Kiosk Window</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Integrated QR Scanner Station */}
        {activeTab === 'scanner' && (
          <AdminQrScanner
            onCheckInUpdated={fetchData}
            onViewPass={(reg) => setViewingPass(reg)}
            onClose={() => setActiveTab('roster')}
          />
        )}

        {/* Configuration Manager */}
        {(activeTab === 'settings' || isEditingConfig) && config && (
          <div className="bg-white rounded border border-slate-300 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-700" />
                <h2 className="text-base font-bold text-slate-900">
                  Event Parameters &amp; Logistics Setup
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsEditingConfig(false);
                  setActiveTab('roster');
                }}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
                title="Close Settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              {configSaveSuccess && (
                <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Configuration updated successfully.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={configForm.startTime || ''}
                    onChange={(e) => setConfigForm({ ...configForm, startTime: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={configForm.endTime || ''}
                    onChange={(e) => setConfigForm({ ...configForm, endTime: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Auditorium Capacity
                  </label>
                  <input
                    type="number"
                    value={configForm.maxCapacity || 250}
                    onChange={(e) => setConfigForm({ ...configForm, maxCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={configForm.contactEmail || ''}
                    onChange={(e) => setConfigForm({ ...configForm, contactEmail: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={configForm.contactPhone || ''}
                    onChange={(e) => setConfigForm({ ...configForm, contactPhone: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Event Announcement Banner (Optional)
                </label>
                <input
                  type="text"
                  value={configForm.emergencyNotice || ''}
                  onChange={(e) => setConfigForm({ ...configForm, emergencyNotice: e.target.value })}
                  placeholder="e.g. Registered delegates please collect session badges at Auditorium Desk 1."
                  className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="allowReg"
                  checked={configForm.allowNewRegistrations ?? true}
                  onChange={(e) => setConfigForm({ ...configForm, allowNewRegistrations: e.target.checked })}
                  className="w-3.5 h-3.5 text-blue-900 rounded"
                />
                <label htmlFor="allowReg" className="text-xs font-bold text-slate-700">
                  Allow Public Registrations (Uncheck to close registrations)
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold border border-blue-950"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Participant Management Table Card */}
        <div className="bg-white rounded border border-slate-300 shadow-xs overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Registered Delegates Roster
              </h2>
              <p className="text-xs text-slate-500">
                Manage registered delegates, verify attendance, and reprint credentials.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={fetchData}
                className="p-1.5 rounded border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
                title="Refresh Table"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={exportToCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-2">
            <div className="relative grow">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, ID, or institution..."
                className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:border-slate-800 bg-white"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
              >
                <option value="ALL">All Roles</option>
                <option value="UG Student">UG Student</option>
                <option value="PG Student">PG Student</option>
                <option value="PhD Scholar">PhD Scholar</option>
                <option value="Faculty Member">Faculty Member</option>
                <option value="Industry Professional">Industry Professional</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded border border-slate-300 text-xs bg-white"
              >
                <option value="ALL">All Status</option>
                <option value="CHECKED_IN">Checked In</option>
                <option value="PENDING">Pending Entry</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Participant</th>
                  <th className="px-4 py-2.5">Role</th>
                  <th className="px-4 py-2.5">Institution / Dept</th>
                  <th className="px-4 py-2.5">Attendance</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-slate-400">
                      No participants match the specified filter or query.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-900">
                        {reg.id}
                      </td>

                      <td className="px-4 py-2.5">
                        <div className="font-bold text-slate-900">{reg.fullName}</div>
                        <div className="text-[11px] text-slate-500">{reg.email}</div>
                        <div className="text-[11px] text-slate-400">{reg.phone}</div>
                      </td>

                      <td className="px-4 py-2.5">
                        <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                          {reg.role}
                        </span>
                      </td>

                      <td className="px-4 py-2.5 max-w-xs">
                        <div className="font-medium text-slate-800 truncate">{reg.institution}</div>
                        <div className="text-[11px] text-slate-500 truncate">{reg.department}</div>
                      </td>

                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => handleToggleCheckIn(reg.id, reg.checkedIn)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                            reg.checkedIn
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                          }`}
                        >
                          {reg.checkedIn ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              <span>Checked In</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-amber-700" />
                              <span>Pending</span>
                            </>
                          )}
                        </button>
                        {reg.checkedInAt && (
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {new Date(reg.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-2.5 text-right space-x-1">
                        <button
                          onClick={() => setViewingPass(reg)}
                          className="p-1 rounded text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                          title="View Digital Pass"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(reg.id, reg.fullName)}
                          className="p-1 rounded text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal for viewing pass */}
      {viewingPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded p-5 shadow-xl border border-slate-300">
            <button
              onClick={() => setViewingPass(null)}
              className="absolute top-3 right-3 p-1 rounded text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
            <DigitalPassView registration={viewingPass} onClose={() => setViewingPass(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
