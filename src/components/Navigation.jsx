import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, User } from 'lucide-react';
import { AirDataContext } from '../App';

const Navigation = () => {
  const { pathname } = useLocation();
  const currentPage = pathname === '/' ? 'home' : pathname.slice(1);

  return (
    <nav className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img
              src="/images/AIRA LOGO.jpeg"
              alt="AIRA Logo"
              className="w-10 h-10 rounded-xl"
            />
            <div>
              <h1 className="text-2xl font-bold text-white font-serif tracking-wide">AIRA</h1>
              <p className="text-sm text-cyan-100 font-medium tracking-wider">Air Intelligence & Reality Assistant</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Link to="/landing">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg font-semibold ${
                  currentPage === 'landing' ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' : 'text-cyan-100 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>AIRA</span>
              </button>
            </Link>

            <Link to="/home">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg font-semibold ${
                  currentPage === 'home' ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' : 'text-cyan-100 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            </Link>

            <Link to="/monitoring">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg font-semibold ${
                  currentPage === 'monitoring' ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' : 'text-cyan-100 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Monitor</span>
              </button>
            </Link>

            <Link to="/profile">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg font-semibold ${
                  currentPage === 'profile' ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30' : 'text-cyan-100 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;