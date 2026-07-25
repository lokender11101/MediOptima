import { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Plus, X, Zap, ShieldCheck, Car, Network, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DemandTrendChart } from '../components/analytics/DemandTrendChart';
import { useOptimization } from '../context/OptimizationContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { medicines, addMedicine: contextAddMedicine, removeMedicine } = useOptimization();
  const [newMed, setNewMed] = useState('');

  const addMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMed.trim() && !medicines.includes(newMed.trim())) {
      contextAddMedicine(newMed.trim());
      setNewMed('');
    }
  };

  const handleOptimize = () => {
    if (newMed.trim() && !medicines.includes(newMed.trim())) {
      contextAddMedicine(newMed.trim());
    }
    navigate('/results');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 relative z-10">
      
      {/* Ambient background glows */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-teal-200/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Main Search Panel */}
      <div className="flex-1">
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-200">
               <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Optimization Parameters</h2>
          </div>
          
          <div className="space-y-8">
            {/* Medicine Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Required Medicines</label>
              <form onSubmit={addMedicine} className="flex gap-3">
                <div className="relative flex-1 group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <Search className="w-5 h-5 text-emerald-500/70 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    value={newMed}
                    onChange={(e) => setNewMed(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 text-base rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block w-full ps-12 p-4 outline-none transition-all shadow-inner placeholder-slate-400" 
                    placeholder="Search medicine name..." 
                  />
                </div>
                <button type="submit" className="px-6 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 transition-colors flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <Plus className="w-6 h-6" />
                </button>
              </form>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 mt-3 mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center mr-1">Trending:</span>
                {['Paracetamol 500mg', 'Amoxicillin 250mg', 'Vitamin C', 'Ibuprofen'].map((suggestion) => (
                  <button 
                    key={suggestion}
                    type="button" 
                    onClick={() => {
                      setNewMed(suggestion);
                    }}
                    className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 hover:bg-emerald-50 px-2.5 py-1 rounded-md transition-colors cursor-pointer border border-transparent hover:border-emerald-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {medicines.map((med) => (
                  <span key={med} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                    {med}
                    <button type="button" onClick={() => removeMedicine(med)} className="ms-2 hover:bg-emerald-200 hover:text-emerald-900 rounded-full p-1 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                {medicines.length === 0 && (
                  <span className="text-sm text-slate-500 dark:text-slate-400 italic mt-2">No medicines added yet.</span>
                )}
              </div>
            </div>

            {/* Constraints */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Location</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <MapPin className="w-5 h-5 text-emerald-500/70 group-focus-within:text-emerald-600" />
                  </div>
                  <input type="text" defaultValue="NIT Silchar, Assam" className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 text-base rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block w-full ps-12 p-4 outline-none transition-all placeholder-slate-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Max Travel Distance (km)</label>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                  <input type="range" min="1" max="50" defaultValue="15" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-1" />
                  <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mt-3">
                    <span>1km</span>
                    <span>50km</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Transportation Mode</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <Car className="w-5 h-5 text-emerald-500/70 group-focus-within:text-emerald-600" />
                  </div>
                  <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 text-base rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block w-full ps-12 p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option>Driving (Fastest Route)</option>
                    <option>Public Transit</option>
                    <option>Bicycle</option>
                    <option>Walking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Preferred Network</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <Network className="w-5 h-5 text-emerald-500/70 group-focus-within:text-emerald-600" />
                  </div>
                  <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 text-base rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block w-full ps-12 p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option>All Pharmacies (Optimal)</option>
                    <option>CVS & Walgreens Only</option>
                    <option>Independent Pharmacies</option>
                    <option>In-Network (Insurance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Urgency Level</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <Clock className="w-5 h-5 text-emerald-500/70 group-focus-within:text-emerald-600" />
                  </div>
                  <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 text-base rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block w-full ps-12 p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option>High (Need immediately)</option>
                    <option>Medium (Within 24hrs)</option>
                    <option>Low (Restocking)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Budget Priority</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <DollarSign className="w-5 h-5 text-emerald-500/70 group-focus-within:text-emerald-600" />
                  </div>
                  <select className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 text-base rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block w-full ps-12 p-4 outline-none transition-all appearance-none cursor-pointer">
                    <option>Balanced (Cost vs Distance)</option>
                    <option>Cheapest Option</option>
                    <option>Closest Regardless of Cost</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Max Multi-Stops</label>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                  <input type="range" min="1" max="5" defaultValue="3" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500 mt-1" />
                  <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mt-3">
                    <span>1 Stop</span>
                    <span>5 Stops</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">Advanced Options</label>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 h-[72px] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-teal-600" />
                    <span className="text-slate-900 dark:text-slate-50 text-sm font-medium">Allow Generic Substitutions</span>
                  </div>
                  <div className="w-12 h-6 bg-teal-600 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white dark:bg-slate-900 rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={handleOptimize}
                disabled={medicines.length === 0}
                className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1 group"
              >
                Run Optimization Engine
                <Zap className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Sidebar with Recharts */}
      <div className="md:w-96 space-y-6">
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-slate-200 dark:border-slate-800 h-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-xl text-slate-900 dark:text-slate-50">Live Demand</h3>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Real-time prediction across requested items.</p>
          
          <div className="mb-8">
            <DemandTrendChart />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-200 text-sm">
              <span className="font-bold flex items-center gap-2 text-rose-700 text-base mb-1">
                <Zap className="w-5 h-5 fill-rose-500 text-rose-500"/> High Demand Alert
              </span>
              <p className="leading-relaxed">Paracetamol is currently experiencing 40% higher demand in your area.</p>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200 text-sm">
              <span className="font-bold flex items-center gap-2 text-emerald-700 text-base mb-1">
                <ShieldCheck className="w-5 h-5 fill-emerald-500 text-emerald-500"/> Network Stable
              </span>
              <p className="leading-relaxed">85% of pharmacies in a 5km radius are reporting accurate stock levels.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
