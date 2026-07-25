import { Globe, MessageCircle, Users, Mail, ArrowRight, ShieldCheck, Zap, Activity, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="w-full flex flex-col items-center bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-200 overflow-hidden">
      
      {/* Header Section */}
      <section className="relative w-full pt-40 pb-20 px-4 flex flex-col items-center text-center border-b border-slate-200 dark:border-slate-800">
        <div className="absolute top-0 -z-10 h-full w-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px] mix-blend-multiply"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-bold shadow-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Our Mission
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-slate-50 leading-tight max-w-4xl animate-fade-in-up">
          Democratizing Access to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">Essential Healthcare</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          We believe nobody should have to drive for hours or pay exorbitant prices just to get the medication they need to live.
        </p>
      </section>

      {/* The Story */}
      <section className="w-full py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-8">The Problem We Are Solving</h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            <p>
              In modern healthcare, logistics are broken. Patients often receive a prescription, only to find out their local pharmacy is out of stock. They are then forced to manually call dozens of pharmacies, drive across town, and hope the medication is still there when they arrive.
            </p>
            <p>
              Worse, if they need multiple medications, the traveling salesman problem emerges: how do you visit the minimum number of pharmacies in the shortest amount of time to get everything you need?
            </p>
            <p className="p-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900 italic font-semibold">
              "MediOptima was built to apply high-performance computing algorithms to this everyday crisis. We map inventory, calculate distance, and optimize routing instantly."
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-24 px-4 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-500">
              <Activity className="w-10 h-10 text-emerald-500 mb-6 mx-auto" />
              <h3 className="text-slate-900 dark:text-slate-50 font-bold text-3xl mb-2">3.2M</h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium">Hours wasted monthly searching for stock</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-500">
              <Globe className="w-10 h-10 text-teal-500 mb-6 mx-auto" />
              <h3 className="text-slate-900 dark:text-slate-50 font-bold text-3xl mb-2">45+</h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium">States affected by critical drug shortages</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-500">
              <Users className="w-10 h-10 text-cyan-500 mb-6 mx-auto" />
              <h3 className="text-slate-900 dark:text-slate-50 font-bold text-3xl mb-2">1 in 4</h3>
              <p className="text-slate-600 dark:text-slate-300 font-medium">Patients abandon prescriptions due to hassle</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-3xl border border-emerald-500 shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-500 text-white">
              <Zap className="w-10 h-10 text-white mb-6 mx-auto fill-white" />
              <h3 className="text-white font-bold text-3xl mb-2">0</h3>
              <p className="text-emerald-50 font-medium">Reasons this should still be happening today.</p>
            </div>
        </div>
      </section>

      {/* Core Values Bento */}
      <section className="w-full py-24 px-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">Core Principles</h2>
            <p className="text-slate-600 dark:text-slate-300">The engineering philosophy behind our platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-emerald-600 font-black text-6xl mb-6 opacity-20">01</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Speed is a Feature</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                When someone is sick, they don't have time to wait for a spinning loading wheel. Our core routing algorithms are written in heavily optimized C++ to ensure sub-10ms response times.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-teal-600 font-black text-6xl mb-6 opacity-20">02</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Data Integrity</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                An optimization algorithm is only as good as its data. We heavily vet pharmacy inventory feeds and use predictive ML to flag likely false-positives before they send you on a wild goose chase.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-cyan-600 font-black text-6xl mb-6 opacity-20">03</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">User Empathy</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The interface must be dead simple. Complex graphs and multi-objective Pareto frontiers are abstracted away behind a clean, intuitive UI that anyone can use.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="w-full bg-white dark:bg-slate-900 py-24 px-4 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">Get in Touch</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Have questions about MediOptima or want to see a custom demo? Our team is here to help you optimize your pharmacy operations.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow w-full md:w-1/2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Email Us</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-center">We typically reply within 24 hours.</p>
              <a href="mailto:hello@medioptima.com" className="text-lg font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                hello@medioptima.com
              </a>
            </div>
            
            <div className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow w-full md:w-1/2">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Call Us</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 text-center">Available Mon-Fri, 9am to 6pm EST.</p>
              <a href="tel:+18001234567" className="text-lg font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                +1 (800) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Contact */}
      <section className="w-full py-32 px-4 relative flex justify-center border-t border-slate-200 dark:border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-100/50 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl w-full bg-white dark:bg-slate-900/90 backdrop-blur-xl rounded-[3rem] p-12 md:p-20 text-center border border-slate-200 dark:border-slate-800 shadow-xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">Open Source at Heart</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto font-medium">
            MediOptima's core routing engine is open-source. We believe in transparency and community-driven improvements for healthcare tools.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <SocialLink href="https://github.com" icon={<Globe className="w-6 h-6" />} label="GitHub" />
            <SocialLink href="https://twitter.com" icon={<MessageCircle className="w-6 h-6" />} label="Twitter" />
            <SocialLink href="https://linkedin.com" icon={<Users className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href="mailto:hello@medioptima.com" icon={<Mail className="w-6 h-6" />} label="Contact" />
          </div>

          <Link to="/dashboard" className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-bold text-lg hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl group">
            Try the Platform <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      
    </div>
  );
};

const SocialLink = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl text-slate-700 dark:text-slate-200 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all font-bold"
  >
    {icon}
    <span>{label}</span>
  </a>
);
