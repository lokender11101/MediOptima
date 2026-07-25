import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const AnimatedLogo = () => (
  <div className="relative w-14 h-14 flex items-center justify-center mr-2 [perspective:800px] group-hover:scale-110 transition-transform duration-500">
    <motion.div
      className="absolute inset-0 [transform-style:preserve-3d]"
      animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)_inset]"></div>
      <div className="absolute inset-[4px] rounded-full border-[1.5px] border-teal-400/50 [transform:rotateX(60deg)_rotateY(45deg)] shadow-[0_0_10px_rgba(45,212,191,0.3)]"></div>
      <div className="absolute inset-[8px] rounded-full border border-emerald-300/70 [transform:rotateX(-60deg)_rotateZ(45deg)] shadow-[0_0_10px_rgba(110,231,183,0.4)]"></div>
    </motion.div>
    <motion.div 
      className="relative z-10 w-[24px] h-[24px] bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.9)]"
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-full h-full rounded-full border border-white/50 absolute"></div>
      <div className="w-3 h-3 bg-white dark:bg-slate-900 rounded-full blur-[1px] opacity-90 absolute"></div>
      <Activity className="w-4 h-4 text-emerald-900 absolute z-20" strokeWidth={4} />
    </motion.div>
  </div>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    ...(isAuthenticated ? [{ name: 'Intelligence', path: '/dashboard' }] : []),
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
          <AnimatedLogo />
          <div className="self-center text-2xl font-extrabold whitespace-nowrap tracking-tight drop-shadow-sm flex items-center group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:-rotate-1 transition-transform duration-300 origin-left">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Medi</span>
            <span className="text-slate-900 dark:text-slate-50">Optima</span>
          </div>
        </Link>
        <div className="flex md:order-2 space-x-3 items-center md:space-x-4 rtl:space-x-reverse">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-slate-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors hidden sm:block">
                Log In
              </Link>
              <Link to="/register" className="text-emerald-600 border border-emerald-600 hover:bg-emerald-50 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors hidden sm:block">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={logout} className="text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-slate-200 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors hidden sm:block">
              Logout
            </button>
          )}
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 dark:text-slate-400 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200">
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-100 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 shadow-lg md:shadow-none md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`block py-2 px-3 rounded md:p-0 transition-colors ${
                    location.pathname === link.path
                      ? 'text-white bg-emerald-600 md:bg-transparent md:text-emerald-600'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-emerald-600'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
