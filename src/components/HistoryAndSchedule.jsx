import React, { useMemo, useState } from 'react';
import { Download, CheckCircle2, Clock, XCircle, Filter } from 'lucide-react';

/*
  Combined component for:
  - Test history table
  - Test schedule list with filters
  - Simple dashboard notifications
  All are powered by static dummy data for demonstration.
*/

const dummyHistory = [
  { id: 1, tanggal: '2025-01-12', jenis: 'EPIC A1', bayar: 'verified', hasil: 'Lulus', sertifikatUrl: '#' },
  { id: 2, tanggal: '2025-02-03', jenis: 'EPIC B1', bayar: 'pending', hasil: '-', sertifikatUrl: '#' },
  { id: 3, tanggal: '2025-03-18', jenis: 'EPIC A2', bayar: 'rejected', hasil: '-', sertifikatUrl: '#' },
];

const dummySchedule = [
  { id: 's1', tanggal: '2025-11-20', lokasi: 'Lab Bahasa 1', kuota: 30 },
  { id: 's2', tanggal: '2025-11-27', lokasi: 'Lab Bahasa 2', kuota: 25 },
  { id: 's3', tanggal: '2025-12-05', lokasi: 'Aula Utama', kuota: 50 },
];

const StatusBadge = ({ status }) => {
  const map = {
    verified: { text: 'Terverifikasi', color: 'bg-green-50 text-green-700 border-green-200', Icon: CheckCircle2 },
    pending: { text: 'Menunggu', color: 'bg-amber-50 text-amber-700 border-amber-200', Icon: Clock },
    rejected: { text: 'Ditolak', color: 'bg-red-50 text-red-700 border-red-200', Icon: XCircle },
  };
  const cfg = map[status] || map.pending;
  const Icon = cfg.Icon;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm ${cfg.color}`}>
      <Icon size={16} /> {cfg.text}
    </span>
  );
};

const Notifications = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
      <p className="font-medium text-blue-900">Notifikasi</p>
      <ul className="mt-2 list-disc list-inside text-blue-900/80">
        <li>Status pembayaran Anda untuk EPIC B1 masih menunggu verifikasi.</li>
        <li>Hasil tes EPIC A1 telah tersedia. Silakan unduh sertifikat.</li>
      </ul>
    </div>
  );
};

const HistoryAndSchedule = ({ currentPage }) => {
  const [filters, setFilters] = useState({ date: '', location: '' });

  const filteredSchedule = useMemo(() => {
    return dummySchedule.filter((s) => {
      const matchDate = filters.date ? s.tanggal === filters.date : true;
      const matchLoc = filters.location ? s.lokasi.toLowerCase().includes(filters.location.toLowerCase()) : true;
      return matchDate && matchLoc;
    });
  }, [filters]);

  return (
    <section className="py-16 bg-white" aria-label="Dashboard Area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Notifications Area */}
        <Notifications />

        {/* Conditional blocks based on currentPage */}
        {(currentPage === 'home' || currentPage === 'history') && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Riwayat Tes</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border rounded-2xl overflow-hidden">
                <thead className="bg-slate-50">
                  <tr className="text-left text-slate-700">
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Jenis Tes</th>
                    <th className="px-4 py-3">Status Pembayaran</th>
                    <th className="px-4 py-3">Hasil Tes</th>
                    <th className="px-4 py-3">Sertifikat</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyHistory.map((row, idx) => (
                    <tr key={row.id} className="border-t">
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3">{row.tanggal}</td>
                      <td className="px-4 py-3">{row.jenis}</td>
                      <td className="px-4 py-3"><StatusBadge status={row.bayar} /></td>
                      <td className="px-4 py-3">{row.hasil}</td>
                      <td className="px-4 py-3">
                        <a href={row.sertifikatUrl} className="inline-flex items-center gap-2 text-blue-700 hover:underline">
                          <Download size={16} /> Download PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(currentPage === 'home' || currentPage === 'schedule') && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Jadwal Tes</h2>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div>
                <label className="block text-sm text-slate-600">Filter Tanggal</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="mt-1 rounded-full border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Filter Lokasi</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Cari lokasi..."
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="mt-1 rounded-full border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-200 w-full"
                  />
                  <span className="p-2 rounded-full bg-blue-50 text-blue-700"><Filter size={18}/></span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {filteredSchedule.map((item) => (
                <div key={item.id} className="border rounded-2xl p-4 bg-white shadow-sm">
                  <p className="font-semibold text-slate-800">{item.lokasi}</p>
                  <p className="text-slate-600">{item.tanggal}</p>
                  <p className="text-slate-500 text-sm">Kuota: {item.kuota}</p>
                  <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                    Pilih Jadwal
                  </button>
                </div>
              ))}
              {filteredSchedule.length === 0 && (
                <div className="md:col-span-3 text-slate-500">Tidak ada jadwal sesuai filter.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HistoryAndSchedule;
