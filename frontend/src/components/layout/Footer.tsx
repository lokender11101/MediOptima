import { Activity } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-t-3xl shadow-lg m-4 mt-auto border border-slate-200 dark:border-slate-800">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse group">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_3px_0_rgb(67,56,202),0_5px_10px_rgba(99,102,241,0.4)] border border-indigo-400/30 transform transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_0_rgb(67,56,202),0_8px_15px_rgba(99,102,241,0.5)] group-hover:rotate-[5deg]">
              <Activity className="text-white w-5 h-5 animate-[pulse_3s_ease-in-out_infinite]" />
            </div>
            <span className="self-center text-xl font-extrabold whitespace-nowrap text-slate-900 dark:text-slate-50 drop-shadow-sm">Medi<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Optima</span></span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-slate-500 dark:text-slate-400 sm:mb-0">
            <li>
              <a href="#" className="hover:text-emerald-600 transition-colors me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-600 transition-colors me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-slate-200 dark:border-slate-800 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-slate-500 dark:text-slate-400 sm:text-center">© {new Date().getFullYear()} <a href="/" className="hover:text-emerald-600 transition-colors">MediOptima™</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};
