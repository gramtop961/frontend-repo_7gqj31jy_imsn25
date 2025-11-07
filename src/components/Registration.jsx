import React, { useMemo, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

/*
  Registration form
  - Collect NPM, Nama, Prodi, Email, No HP
  - Realtime validation and large submit button (dummy action)
*/
const prodiList = [
  'Teknologi Pertanian',
  'Teknik Informatika',
  'Manajemen Informatika',
  'Akuntansi',
  'Agroindustri',
  'Agribisnis',
  'Teknologi Pangan',
  'Peternakan',
];

const Registration = React.forwardRef((props, ref) => {
  const [form, setForm] = useState({ npm: '', nama: '', prodi: '', email: '', hp: '' });
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!/^\d{8,15}$/.test(form.npm)) e.npm = 'NPM harus 8-15 digit angka';
    if (form.nama.trim().length < 3) e.nama = 'Nama minimal 3 karakter';
    if (!form.prodi) e.prodi = 'Pilih program studi';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email tidak valid';
    if (!/^\d{10,15}$/.test(form.hp)) e.hp = 'No HP harus 10-15 digit';
    return e;
  }, [form]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    // Dummy submit: show success and reset
    alert('Pendaftaran berhasil dikirim! Ini hanya simulasi tanpa backend.');
    setForm({ npm: '', nama: '', prodi: '', email: '', hp: '' });
    setSubmitted(false);
  };

  return (
    <section ref={ref} className="py-16 bg-white" aria-labelledby="registration-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="registration-title" className="text-2xl font-bold text-slate-800">Form Registrasi Mahasiswa</h2>
        <p className="text-slate-600 mt-2">Masukkan data dengan benar. Validasi terjadi secara realtime.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid md:grid-cols-2 gap-6">
          {/* NPM */}
          <div>
            <label className="block text-sm font-medium text-slate-700">NPM</label>
            <input
              type="text"
              value={form.npm}
              onChange={(e) => setForm({ ...form, npm: e.target.value })}
              className={`mt-1 w-full rounded-full border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.npm ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
              }`}
              placeholder="Contoh: 2012345678"
              aria-invalid={!!errors.npm}
              aria-describedby={errors.npm ? 'npm-error' : undefined}
            />
            {errors.npm && (
              <p id="npm-error" className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16}/> {errors.npm}</p>
            )}
          </div>

          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className={`mt-1 w-full rounded-full border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.nama ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
              }`}
              placeholder="Nama sesuai KTP"
              aria-invalid={!!errors.nama}
            />
            {errors.nama && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16}/> {errors.nama}</p>
            )}
          </div>

          {/* Prodi */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Program Studi</label>
            <select
              value={form.prodi}
              onChange={(e) => setForm({ ...form, prodi: e.target.value })}
              className={`mt-1 w-full rounded-full border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.prodi ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
              }`}
              aria-invalid={!!errors.prodi}
            >
              <option value="">-- Pilih Program Studi --</option>
              {prodiList.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.prodi && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16}/> {errors.prodi}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`mt-1 w-full rounded-full border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
              }`}
              placeholder="nama@polinela.ac.id"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16}/> {errors.email}</p>
            )}
          </div>

          {/* HP */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">No HP</label>
            <input
              type="tel"
              value={form.hp}
              onChange={(e) => setForm({ ...form, hp: e.target.value })}
              className={`mt-1 w-full rounded-full border px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.hp ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
              }`}
              placeholder="08xxxxxxxxxx"
              aria-invalid={!!errors.hp}
            />
            {errors.hp && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1"><AlertCircle size={16}/> {errors.hp}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow transition flex items-center gap-2"
            >
              {isValid ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />} Kirim Pendaftaran
            </button>
            {submitted && !isValid && (
              <p className="mt-2 text-sm text-red-600">Periksa kembali data Anda yang belum valid.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
});

export default Registration;
