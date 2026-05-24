// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setDropdownOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg py-4 px-6 fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform flex items-center">
          📚 <span className="ml-2">LMS Pro</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/courses" className="text-gray-700 hover:text-purple-600 font-semibold px-3 py-2 rounded-lg hover:bg-purple-50 transition-all">
            📚 Courses
          </Link>
          
          {/* Role-specific quick links (Desktop) */}
          {token && userRole === 'admin' && (
            <Link to="/dashboard/admin" className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transform hover:-translate-y-1 transition-all shadow-md">
              <span>🛠️</span>
              <span>Admin Panel</span>
            </Link>
          )}

          {token && userRole === 'instructor' && (
            <Link to="/dashboard/instructor" className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all shadow-md">
              <span>👨‍🏫</span>
              <span>Instructor Panel</span>
            </Link>
          )}
          
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 font-semibold px-3 py-2 rounded-lg hover:bg-purple-50 transition-all">
                📊 Dashboard
              </Link>

              {/* Profile Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 px-6 py-3 rounded-2xl font-semibold border border-purple-200 hover:border-purple-300 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{userName}</p>
                    <p className="text-xs text-purple-600 font-medium capitalize">{userRole}</p>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* DROPDOWN MENU */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{userName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{userName}</p>
                          <p className="text-sm text-gray-500">{localStorage.getItem('userEmail') || 'No Email'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link 
                        to="/dashboard" 
                        className="flex items-center px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700 rounded-xl mx-2 my-1 transition-all font-medium"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        My Dashboard
                      </Link>

                      {/* INSTRUCTOR LINK IN DROPDOWN */}
                      {userRole === 'instructor' && (
                        <Link 
                          to="/dashboard/instructor" 
                          className="flex items-center px-6 py-4 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl mx-2 my-1 transition-all font-semibold border-l-4 border-emerald-500"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                          Instructor Panel
                        </Link>
                      )}

                      <Link 
                        to="/profile" 
                        className="flex items-center px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700 rounded-xl mx-2 my-1 transition-all font-medium"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Settings
                      </Link>

                      <div className="border-t border-gray-100 mt-2 pt-3">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-6 py-4 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all hover:text-red-700"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 transition-all">
                🔐 Login
              </Link>
              
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-1 transition-all duration-300"
              >
                🚀 Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;