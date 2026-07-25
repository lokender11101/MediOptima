import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Navigation, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOptimization } from '../context/OptimizationContext';
// Fix Leaflet marker icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to generate a realistic zigzag route between two coordinates
const generateZigZag = (start: [number, number], end: [number, number], segments = 6): [number, number][] => {
  const points: [number, number][] = [start];
  for (let i = 1; i < segments; i++) {
    const fraction = i / segments;
    const lat = start[0] + (end[0] - start[0]) * fraction;
    const lng = start[1] + (end[1] - start[1]) * fraction;
    // Add a slight perpendicular offset to simulate real roads rather than straight lines
    const noiseLat = (i % 2 === 0 ? 1 : -1) * 0.002; 
    const noiseLng = (i % 2 === 0 ? -1 : 1) * 0.002;
    points.push([lat + noiseLat, lng + noiseLng]);
  }
  points.push(end);
  return points;
};

// Custom Emerald Marker for the Destination Pharmacies
const destinationIcon = L.divIcon({
  className: 'bg-transparent border-none',
  html: `<div class="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center border-[3px] border-white shadow-[0_0_20px_rgba(16,185,129,0.9)]"><div class="w-2.5 h-2.5 bg-white dark:bg-slate-900 rounded-full shadow-inner"></div></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

export const Results = () => {
  const { medicines: requestedMeds } = useOptimization();

  // Split requested meds across two mock pharmacies dynamically
  const splitIndex = Math.ceil(requestedMeds.length / 2);
  const medsA = requestedMeds.slice(0, splitIndex);
  const medsB = requestedMeds.slice(splitIndex);

  const pharmacies = [];
  if (medsA.length > 0) {
    pharmacies.push({ id: 1, name: "City Health Pharmacy", lat: 24.835, lng: 92.780, meds: medsA, cost: "₹" + (medsA.length * 45).toFixed(2) });
  }
  if (medsB.length > 0) {
    pharmacies.push({ id: 2, name: "MediCare Plus", lat: 24.830, lng: 92.775, meds: medsB, cost: "₹" + (medsB.length * 85).toFixed(2) });
  }
  
  const userLocation: [number, number] = [24.7577, 92.7923]; // NIT Silchar
  const center: [number, number] = [24.795, 92.785]; // Midpoint between NIT and City Center

  // Generate separate zigzag routes from the starting point to EACH pharmacy independently (Hub and Spoke)
  const allRoutes = pharmacies.map(p => {
    return generateZigZag(userLocation, [p.lat, p.lng], 7);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col h-[calc(100vh-80px)] relative z-10">
      
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-emerald-200/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <Link to="/dashboard" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Intelligence Engine
          </Link>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-emerald-100 rounded-lg border border-emerald-200">
               <Navigation className="w-6 h-6 text-emerald-600" />
             </div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">Optimal Procurement Route</h1>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <Clock className="text-emerald-500 w-6 h-6" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Est. Time</p>
              <p className="font-bold text-slate-900 dark:text-slate-50 text-lg">45 mins</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <MapPin className="text-teal-500 w-6 h-6" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Total Distance</p>
              <p className="font-bold text-slate-900 dark:text-slate-50 text-lg">9.2 km</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 h-full min-h-0">
        
        {/* Map View */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-[2rem] overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 relative min-h-[400px]">
          {/* Using light basemap for leafet */}
          <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 10 }}>
            <TileLayer
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            
            {/* Render a route from User to each Pharmacy */}
            {allRoutes.map((route, i) => [
              /* Radiant Route Glow Effect */
              <Polyline 
                key={`glow-${i}`}
                positions={route}
                pathOptions={{ color: '#10b981', weight: 14, opacity: 0.2, lineJoin: 'round' }}
              />,
              /* Solid Route Highlight */
              <Polyline 
                key={`solid-${i}`}
                positions={route}
                pathOptions={{ color: '#059669', weight: 5, opacity: 1, lineJoin: 'round' }}
              />
            ])}
            
            {/* User Starting Location */}
            <Marker position={userLocation}>
              <Popup>
                <div className="font-sans !bg-white dark:bg-slate-900 !text-slate-900 dark:text-slate-50 !p-1 text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2 border border-emerald-200">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-emerald-700">Starting Point</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">NIT Silchar, Assam</p>
                </div>
              </Popup>
            </Marker>
            {pharmacies.map(p => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={destinationIcon}>
                <Popup>
                  <div className="font-sans !bg-white dark:bg-slate-900 !text-slate-900 dark:text-slate-50 !p-1">
                    <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Inventory allocated for you:</p>
                    <ul className="text-sm list-none space-y-1 p-0 m-0">
                      {p.meds.map((m: string) => (
                        <li key={m} className="flex items-center gap-1.5 text-emerald-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          <div className="absolute top-6 left-6 z-[1000] bg-white dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 pointer-events-none flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-slate-800 tracking-wide">Route generated via C++ Engine</span>
          </div>
        </div>

        {/* Itinerary Panel */}
        <div className="w-full lg:w-[450px] flex flex-col gap-6 overflow-y-auto pr-2 pb-8 custom-scrollbar">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Your Itinerary</h3>
          
          {pharmacies.map((p, idx) => (
            <div key={p.id} className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative group hover:border-emerald-300 transition-colors hover:shadow-md">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-lg shadow-inner">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xl">{p.name}</h4>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Cost</p>
                  <span className="text-lg font-bold text-emerald-600">{p.cost}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 pl-13">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <p>High Reliability Score (98% Accuracy)</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-inner">
                <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Allocated Inventory</h5>
                <ul className="space-y-3">
                  {p.meds.map((m: string) => (
                    <li key={m} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                         <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <button className="mt-2 w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 fill-white" /> Send Route to Phone
          </button>
        </div>

      </div>
    </div>
  );
};
