import { Link } from 'react-router-dom';
import { Pill, MapPin, DollarSign, Clock, Search, Navigation2, Zap } from 'lucide-react';

export const Features = () => {
  return (
    <div className="w-full flex flex-col items-center bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-700 dark:text-slate-200 selection:bg-emerald-500/30">
      
      {/* Hero Header */}
      <section className="relative w-full flex flex-col items-center justify-center pt-40 pb-20 px-4 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-200/40 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        
        <div className="max-w-4xl text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-bold shadow-sm mb-8">
            <Search className="w-4 h-4 text-emerald-600" />
            <span>Comprehensive Platform Features</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-slate-50 leading-tight">
            Find your medicine. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">Without the headache.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300">
            MediOptima is designed to solve every frustration of finding prescriptions. From live stock checking to building the ultimate pickup route.
          </p>
        </div>
      </section>

      {/* Feature 1: Live Availability */}
      <section className="w-full py-24 px-4 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Real-Time <span className="text-emerald-600">Medicine Availability</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Never drive to a pharmacy only to be told they are out of stock. Our platform connects to pharmacy inventories in real-time, instantly showing you exactly who has your prescription ready to go.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-200">
                <CheckCircle icon={<Pill className="w-5 h-5 text-emerald-600" />} />
                Live inventory tracking across major networks
              </li>
              <li className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-200">
                <CheckCircle icon={<Zap className="w-5 h-5 text-emerald-600" />} />
                Instant alerts when out-of-stock items return
              </li>
            </ul>
          </div>
          
          <div className="lg:w-1/2 w-full">
            {/* Mock Stock UI */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-md shadow-xl p-6 relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 blur-[80px] rounded-full"></div>
              <h4 className="text-slate-900 dark:text-slate-50 font-bold mb-4 text-lg relative z-10">Availability Check: Amoxicillin 500mg</h4>
              <div className="space-y-3 relative z-10">
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 dark:text-slate-50 font-semibold">CVS Pharmacy - Main St.</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">2.4 miles away</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">In Stock (12 units)</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between opacity-60">
                  <div>
                    <p className="text-slate-900 dark:text-slate-50 font-semibold">Walgreens - 5th Ave.</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">3.1 miles away</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full border border-rose-200">Out of Stock</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-slate-900 dark:text-slate-50 font-semibold">Local Care Rx</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">4.5 miles away</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">Low Stock (2 units)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Multi-Stop Routing */}
      <section className="w-full py-24 px-4 relative bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 w-full relative">
            {/* Mock Map UI */}
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-xl p-2 relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-100 blur-[100px] rounded-full"></div>
              <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-6 relative z-10 border border-slate-200 dark:border-slate-800 min-h-[300px] flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6 relative">
                   <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 z-10 shadow-md"><MapPin className="w-4 h-4 text-white" /></div>
                   <div className="h-0.5 bg-slate-200 flex-grow relative"><div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-emerald-500 to-teal-500"></div></div>
                   <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0 z-10 shadow-md"><MapPin className="w-4 h-4 text-white" /></div>
                   <div className="h-0.5 bg-slate-200 flex-grow relative"><div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-teal-500 to-cyan-500"></div></div>
                   <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0 z-10 shadow-md"><MapPin className="w-4 h-4 text-white" /></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-2 font-bold">
                  <span>Home</span>
                  <span>Pharmacy A (Meds 1 & 2)</span>
                  <span>Pharmacy B (Med 3)</span>
                </div>
                <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-emerald-700 font-bold">Optimal Route Found: Saves 45 minutes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Multi-Stop</span> Routing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Need three different medicines and no single pharmacy has them all? Our platform builds the ultimate multi-stop itinerary, factoring in live traffic to get you home as quickly as possible.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-200">
                <CheckCircle icon={<Navigation2 className="w-5 h-5 text-emerald-600" />} />
                Intelligent multi-destination pathfinding
              </li>
              <li className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-200">
                <CheckCircle icon={<Clock className="w-5 h-5 text-emerald-600" />} />
                Real-time traffic & drive-time calculations
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature 3 & 4: Bento Grid */}
      <section className="w-full py-24 px-4 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden group hover:border-amber-300 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-8 border border-amber-200 relative z-10">
              <DollarSign className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 relative z-10">Price Comparison</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 relative z-10">Medication costs can vary wildly. We aggregate prices across your local area so you can choose the most cost-effective route, maximizing your savings.</p>
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 relative z-10">
               <span className="text-slate-600 dark:text-slate-300">Total Savings Detected:</span>
               <span className="text-2xl font-bold text-emerald-600">+$42.50</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden group hover:border-cyan-300 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-8 border border-cyan-200 relative z-10">
              <Pill className="w-7 h-7 text-cyan-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 relative z-10">Generic Alternatives</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 relative z-10">If your prescribed brand name is completely out of stock everywhere, MediOptima will automatically suggest safely approved generic equivalents available nearby.</p>
             <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 relative z-10">
               <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold rounded-full border border-cyan-200">Auto-Suggest Enabled</span>
            </div>
          </div>

        </div>
      </section>

      {/* Massive CTA */}
      <section className="w-full py-32 px-4 relative overflow-hidden flex justify-center border-t border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-emerald-100 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-5xl w-full bg-white dark:bg-slate-900/90 backdrop-blur-2xl rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl p-16 md:p-24 text-center relative z-10 transform hover:scale-[1.02] transition-transform duration-700">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider shadow-lg shadow-emerald-500/30">
            START NOW
          </div>
          <h2 className="text-5xl md:text-8xl font-extrabold text-slate-900 dark:text-slate-50 mb-8 tracking-tighter leading-[1.1]">
            Stop waiting. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">Start optimizing.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto font-medium leading-relaxed text-balance">
            Experience the raw speed of our C++ optimization engine mixed with intelligent UI design. <br className="hidden md:block" /> 
            Your pharmacy logistics will never be the same.
          </p>
          <Link to="/dashboard" className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-bold text-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-2 group">
            <Zap className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            Launch Platform
          </Link>
        </div>
      </section>

    </div>
  );
};

const CheckCircle = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm">
    {icon}
  </div>
);
