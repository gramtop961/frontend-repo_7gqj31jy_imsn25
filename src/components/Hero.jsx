import React from 'react';
import { Rocket, ShieldCheck, Download } from 'lucide-react';

/*
  Hero section
  - Banner with brief description of system advantages
  - CTA button to scroll to registration form
*/
const Hero = ({ onDaftarClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-500 text-white">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
          <path fill="currentColor" d="M0,32L48,74.7C96,117,192,203,288,218.7C384,235,480,181,576,165.3C672,149,768,171,864,176C960,181,1056,171,1152,181.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Sistem Pendaftaran Tes EPIC Polinela
            </h1>
            <p className="mt-4 text-blue-50/90 text-lg">
              Mudah, cepat, dan terintegrasi. Daftar online, unggah bukti pembayaran QRIS, dan unduh sertifikat digital setelah lulus.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3">
                <span className="p-2 rounded-full bg-white/20"><Rocket size={18} /></span>
                Pendaftaran online yang praktis
              </li>
              <li className="flex items-center gap-3">
                <span className="p-2 rounded-full bg-white/20"><ShieldCheck size={18} /></span>
                Pembayaran QRIS manual, diverifikasi admin
              </li>
              <li className="flex items-center gap-3">
                <span className="p-2 rounded-full bg-white/20"><Download size={18} /></span>
                Download sertifikat digital (PDF)
              </li>
            </ul>
            <div className="mt-8">
              <button
                onClick={onDaftarClick}
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-full shadow hover:shadow-md hover:bg-blue-50 transition"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop"
              alt="EPIC Test Banner"
              className="rounded-xl shadow-lg w-full h-72 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
