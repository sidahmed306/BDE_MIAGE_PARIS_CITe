import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Tableau de bord', icon: '📊' },
    { path: '/teams', label: 'Équipes', icon: '👥' },
    { path: '/scores', label: 'Scores', icon: '🏆' },
    { path: '/challenges', label: 'Défis', icon: '🎯' },
    { path: '/gamification', label: 'Gamification', icon: '🎮' },
  ];

  const isActive = (path) => location.pathname === path;

  // Get user initials for avatar
  const getUserInitials = (username) => {
    if (!username) return 'U';
    return username.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-bordeaux text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-xl font-bold hover:opacity-80 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
          >
            <span className="text-2xl animate-bounce-subtle flex-shrink-0 leading-none">🌙</span>
            <span className="tracking-wide whitespace-nowrap leading-tight">Nuit de l'Info</span>
          </Link>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                // Unified icon background via shared class
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                    isActive(item.path)
                      ? 'bg-white text-bordeaux font-semibold shadow-md scale-105'
                      : 'hover:bg-white/20'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {/* Slide animation effect */}
                  <span className="absolute inset-0 bg-white/10 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center">
                    <span className="mr-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </span>
                </Link>
              ))}
              <div className="ml-4 flex items-center space-x-3 border-l border-white/20 pl-4">
                {/* User Avatar Circle */}
                <div className="relative group">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm border-2 border-white/30 hover:border-white transition-all duration-300 transform hover:scale-110 cursor-pointer">
                    {getUserInitials(user.username)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-bordeaux"></div>
                </div>
                <span className="text-sm font-medium hidden lg:block">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-2xl transition-transform duration-300">{isMobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* Mobile Menu with Slide Animation */}
        {isMobileMenuOpen && user && (
          <div className="md:hidden pb-4 animate-slide-down overflow-hidden">
            {navItems.map((item, index) => (
              // Unified icon background via shared class
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg mb-1 transition-all duration-300 transform hover:translate-x-2 relative overflow-hidden group ${
                  isActive(item.path)
                    ? 'bg-white text-bordeaux font-semibold'
                    : 'hover:bg-white/20'
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {/* Slide effect */}
                <span className="absolute inset-0 bg-white/10 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="relative flex items-center">
                  <span className="mr-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="font-medium tracking-wide">{item.label}</span>
                </span>
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-3 px-4 py-2">
                {/* Mobile User Avatar */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm border-2 border-white/30">
                  {getUserInitials(user.username)}
                </div>
                <span className="text-sm font-medium">{user.username}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 transform hover:translate-x-2 mt-2 font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

