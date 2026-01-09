
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  setView: (view: 'home' | 'login' | 'dashboard' | 'team') => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, setView }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
              ZeroCrumb
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className="text-gray-600 hover:text-green-600 font-medium">Home</button>
            <button onClick={() => setView('team')} className="text-gray-600 hover:text-green-600 font-medium">About Us</button>
            {user ? (
              <>
                <button onClick={() => setView('dashboard')} className="text-gray-600 hover:text-green-600 font-medium">Dashboard</button>
                <div className="flex items-center space-x-4 border-l pl-8 ml-8">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{user.orgName}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => setView('login')}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
