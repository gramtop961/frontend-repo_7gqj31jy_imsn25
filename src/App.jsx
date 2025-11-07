import React, { useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Registration from './components/Registration';
import PaymentUpload from './components/PaymentUpload';
import HistoryAndSchedule from './components/HistoryAndSchedule';

/*
  App structure using semantic layout:
  - header: logo + nav
  - main: hero, registration, upload, history & schedule, notifications
  - footer: contact info
  Notes: No backend calls; all actions are simulated on the client.
*/

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'schedule' | 'history'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const regRef = useRef(null);

  const handleDaftarClick = () => {
    regRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-25">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn((v) => !v)}
      />

      <main>
        {currentPage === 'home' && <Hero onDaftarClick={handleDaftarClick} />}

        {/* Registration Form */}
        <Registration ref={regRef} />

        {/* Payment Upload */}
        <PaymentUpload />

        {/* History + Schedule + Notifications area */}
        <HistoryAndSchedule currentPage={currentPage} />
      </main>

      <footer className="bg-slate-900 text-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold">Laboratorium Bahasa Polinela</p>
            <p className="text-slate-400 text-sm mt-2">
              Jl. Soekarno Hatta No.10, Rajabasa, Bandar Lampung 35144
            </p>
            <p className="text-slate-400 text-sm">Email: labbahasa@polinela.ac.id | Telp: (0721) 703995</p>
          </div>
          <div className="md:text-right text-sm text-slate-400 flex md:justify-end items-center">
            <p>
              © {new Date().getFullYear()} EPIC Polinela. Dibuat untuk demonstrasi frontend (tanpa backend).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
