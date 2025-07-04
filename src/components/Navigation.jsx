import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, User } from 'lucide-react';
import { AirDataContext } from '../App';

const Navigation = () => {
  const { pathname } = useLocation();
  const currentPage = pathname === '/' ? 'home' : pathname.slice(1);

  return (
    <nav className="bg-green-700 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img
              src="/images/AIRA LOGO.jpeg"
              alt="AIRA Logo"
              className="w-10 h-10 rounded-xl"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">AIRA</h1>
              <p className="text-sm text-gray-200">Air Intelligence and Reality Assistant</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Link to="/landing">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg ${
                  currentPage === 'landing' ? 'bg-green-100 text-green-700' : 'text-white hover:bg-green-700'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Landing</span>
              </button>
            </Link>

            <Link to="/home">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg ${
                  currentPage === 'home' ? 'bg-green-100 text-green-700' : 'text-white hover:bg-green-700'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            </Link>

            <Link to="/monitoring">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg ${
                  currentPage === 'monitoring' ? 'bg-green-100 text-green-700' : 'text-white hover:bg-green-700'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Monitor</span>
              </button>
            </Link>

            <Link to="/profile">
              <button
                className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all text-lg ${
                  currentPage === 'profile' ? 'bg-green-100 text-green-700' : 'text-white hover:bg-green-700'
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
