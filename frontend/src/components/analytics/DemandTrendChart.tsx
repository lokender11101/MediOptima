// Removed unused React import
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { time: '08:00', demand: 400 },
  { time: '10:00', demand: 300 },
  { time: '12:00', demand: 600 },
  { time: '14:00', demand: 800 },
  { time: '16:00', demand: 500 },
  { time: '18:00', demand: 900 },
  { time: '20:00', demand: 400 },
];

export const DemandTrendChart = () => {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#0f172a', boxShadow: '0 4px 20px -2px rgba(16, 185, 129, 0.2)' }}
            itemStyle={{ color: '#059669', fontWeight: 'bold' }}
          />
          <Area
            type="monotone"
            dataKey="demand"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorDemand)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
