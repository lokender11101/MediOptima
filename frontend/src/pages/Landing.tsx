import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Map, ShieldCheck, Zap, Activity, Clock, Mail, Phone } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-20 px-4 min-h-[90vh]">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 -z-10 h-full w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-emerald-200/40 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[100px] mix-blend-multiply animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-cyan-200/30 rounded-full blur-[120px]"></div>
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 left-[5%] xl:left-[10%] hidden lg:block animate-[bounce_4s_ease-in-out_infinite]">
          <div className="p-4 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 transform -rotate-12">
            <BrainCircuit className="w-8 h-8 text-teal-500" />
          </div>
        </div>
        <div className="absolute bottom-1/3 right-[5%] xl:right-[10%] hidden lg:block animate-[bounce_5s_ease-in-out_infinite_reverse]">
          <div className="p-4 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 transform rotate-12">
            <Activity className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="max-w-5xl text-center z-10 animate-fade-in-up flex flex-col items-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900/90 backdrop-blur-sm border border-emerald-200 text-emerald-700 text-sm font-bold shadow-sm mb-8 hover:scale-105 transition-transform cursor-default">
            <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            <span>AI-Powered Procurement Strategy</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1] text-slate-900 dark:text-slate-50">
            Smart Medicine Access <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 drop-shadow-sm">Optimization</span> Platform
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300 drop-shadow-sm">
            Stop searching blindly. MediOptima computes the most efficient strategy to obtain all your medicines considering distance, cost, delivery time, and availability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:gap-4 shadow-lg hover:shadow-xl group text-lg hover:-translate-y-1">
              Start Optimization
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-emerald-700 hover:bg-slate-50 dark:bg-slate-950 rounded-2xl font-bold flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800 hover:border-emerald-200 shadow-md text-lg hover:-translate-y-1">
              See How It Works
            </a>
          </div>
        </div>

        {/* Live Stats Banner */}
        <div className="max-w-6xl w-full mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <StatCard number="12,450+" label="Pharmacies Indexed" />
          <StatCard number="98.5%" label="Routing Efficiency" />
          <StatCard number="< 10ms" label="Optimization Speed" />
          <StatCard number="24/7" label="Real-Time Updates" />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full bg-slate-50 dark:bg-slate-950 py-24 px-4 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-emerald-100/50 blur-[150px] pointer-events-none -translate-y-1/2"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">How MediOptima Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">From entering your prescription to finding the fastest route, our AI handles the logistics instantly.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-emerald-300 to-slate-200 -z-10 -translate-y-1/2"></div>
            <StepCard step="1" icon={<Activity />} title="Input Medicines" desc="Enter your prescribed list and urgency levels." />
            <StepCard step="2" icon={<BrainCircuit />} title="AI Prediction" desc="Machine learning predicts stock availability." />
            <StepCard step="3" icon={<Map />} title="Route Optimization" desc="C++ Engine calculates the fastest multi-stop path." />
          </div>
        </div>
      </section>

      {/* Features Section (Premium Light Bento Grid) */}
      <section id="features" className="w-full bg-slate-50 dark:bg-slate-950 py-32 px-4 relative overflow-hidden">
        {/* Dynamic Light Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-100/50 rounded-[100%] blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-50 mb-6 tracking-tight">
              Intelligence at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Core</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">A powerful combination of Machine Learning and robust Graph Optimization algorithms working in milliseconds.</p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Card 1: Predictive Analytics (Spans 8 cols) */}
            <div className="md:col-span-8 bg-white dark:bg-slate-900 p-12 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-300 transition-colors duration-500">
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors duration-700 pointer-events-none"></div>
              <div className="absolute right-10 bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 pointer-events-none">
                <BrainCircuit className="w-64 h-64 text-emerald-900" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 border border-emerald-200 backdrop-blur-md">
                  <BrainCircuit className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Predictive Analytics Engine</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-md">Our Python-based FastAPI backend utilizes Scikit-learn to forecast medicine demand, delivery times, and hidden stock shortages before they happen.</p>
              </div>
            </div>
            
            {/* Card 2: Reliability Scoring (Spans 4 cols) */}
            <div className="md:col-span-4 bg-gradient-to-b from-sky-50 to-white p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group hover:border-sky-300 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-sky-100/0 to-sky-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-8 border border-sky-200">
                    <ShieldCheck className="w-7 h-7 text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Reliability Scoring</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Dynamic scoring ensures your time is never wasted on pharmacies with historically false stock reports.</p>
                </div>
              </div>
            </div>

            {/* Card 3: Real-time Constraints (Spans 4 cols) */}
            <div className="md:col-span-4 bg-gradient-to-b from-rose-50 to-white p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group hover:border-rose-300 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-100/0 to-rose-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-8 border border-rose-200">
                    <Clock className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">Real-time Constraints</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Adjusts routes dynamically based on urgency levels and real-time traffic simulations.</p>
                </div>
              </div>
            </div>

            {/* Card 4: C++ Engine (Spans 8 cols) */}
            <div className="md:col-span-8 bg-gradient-to-br from-emerald-50 to-white p-12 rounded-[2rem] border border-emerald-200 shadow-xl relative overflow-hidden group hover:border-emerald-400 transition-all duration-500 hover:shadow-2xl">
              {/* Animated grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-emerald-200 shadow-md">
                  <Map className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">Greedy Set Cover & Dijkstra Routing</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-xl">At the core is our blazingly fast <span className="text-emerald-700 font-semibold">C++17 optimization binary</span>. It solves the multi-objective constrained problem to calculate the mathematically optimal path across multiple pharmacies instantly.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 py-24 px-4 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[2rem] p-12 text-center text-white shadow-2xl relative overflow-hidden border border-emerald-500">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/30 blur-[80px] rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">Ready to transform healthcare logistics?</h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto relative z-10 font-medium">Stop wasting time driving between pharmacies. Let MediOptima build your perfect procurement route today.</p>
          <Link to="/dashboard" className="inline-flex px-10 py-5 bg-white dark:bg-slate-900 text-emerald-900 hover:bg-slate-100 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 relative z-10">
            Open the Dashboard
          </Link>
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
    </div>
  );
};

const StatCard = ({ number, label }: { number: string, label: string }) => (
  <div className="bg-white dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
    <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-1">{number}</div>
    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const StepCard = ({ step, icon, title, desc }: { step: string, icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg relative w-full md:w-1/3 flex flex-col items-center text-center z-10">
    <div className="absolute -top-5 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-md">
      {step}
    </div>
    <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 mt-4 shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300">{desc}</p>
  </div>
);
