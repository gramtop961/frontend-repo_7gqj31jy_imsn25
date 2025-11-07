import React from 'react';
import { Home, CalendarDays, History, LogIn, LogOut } from 'lucide-react';

/*
  Header component
  - Displays Polinela logo on the left and navigation on the right
  - Provides simple client-side navigation via callbacks
*/
const Header = ({ currentPage, onNavigate, isLoggedIn, onToggleLogin }) => {
  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16" aria-label="Main Navigation">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/id/0/04/Logo_Politeknik_Negeri_Lampung.png"
              alt="Logo Politeknik Negeri Lampung"
              className="h-10 w-10 object-contain"
            />
            <div className="leading-tight">
              <p className="text-sm text-slate-500">EPIC</p>
              <p className="font-semibold text-slate-800">Politeknik Negeri Lampung</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="hidden md:flex items-center gap-2" role="menubar">
            <li>
              <button
                role="menuitem"
                onClick={() => onNavigate('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  currentPage === 'home' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-slate-700'
                }`}
                aria-current={currentPage === 'home' ? 'page' : undefined}
              >
                <Home size={18} /> Home
              </button>
            </li>
            <li>
              <button
                role="menuitem"
                onClick={() => onNavigate('schedule')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  currentPage === 'schedule' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-slate-700'
                }`}
                aria-current={currentPage === 'schedule' ? 'page' : undefined}
              >
                <CalendarDays size={18} /> Jadwal Tes
              </button>
            </li>
            <li>
              <button
                role="menuitem"
                onClick={() => onNavigate('history')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  currentPage === 'history' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-slate-700'
                }`}
                aria-current={currentPage === 'history' ? 'page' : undefined}
              >
                <History size={18} /> Riwayat Tes
              </button>
            </li>
            <li>
              <button
                role="menuitem"
                onClick={onToggleLogin}
                className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors bg-blue-600 text-white hover:bg-blue-700"
              >
                {isLoggedIn ? <LogOut size={18} /> : <LogIn size={18} />}
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>
            </li>
          </ul>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`p-2 rounded-full ${currentPage === 'home' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}
              aria-label="Home"
            >
              <Home size={18} />
            </button>
            <button
              onClick={() => onNavigate('schedule')}
              className={`p-2 rounded-full ${currentPage === 'schedule' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}
              aria-label="Jadwal Tes"
            >
              <CalendarDays size={18} />
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`p-2 rounded-full ${currentPage === 'history' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700'}`}
              aria-label="Riwayat Tes"
            >
              <History size={18} />
            </button>
            <button
              onClick={onToggleLogin}
              className="p-2 rounded-full bg-blue-600 text-white"
              aria-label={isLoggedIn ? 'Logout' : 'Login'}
            >
              {isLoggedIn ? <LogOut size={18} /> : <LogIn size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
