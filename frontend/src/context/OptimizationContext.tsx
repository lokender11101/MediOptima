import { createContext, useContext, useState, type ReactNode } from 'react';

interface RouteSegment {
  step: number;
  pharmacy_name: string;
  distance_km: number;
  items_fulfilled: string[];
  cost: number;
}

interface OptimizationResult {
  status: string;
  route: RouteSegment[];
  total_distance_km: number;
  total_cost: number;
  missing_items: string[];
}

interface OptimizationContextType {
  medicines: string[];
  addMedicine: (med: string) => void;
  removeMedicine: (med: string) => void;
  result: OptimizationResult | null;
  setResult: (res: OptimizationResult | null) => void;
}

const OptimizationContext = createContext<OptimizationContextType | undefined>(undefined);

export const OptimizationProvider = ({ children }: { children: ReactNode }) => {
  const [medicines, setMedicines] = useState<string[]>(['Paracetamol 500mg', 'Amoxicillin 250mg']);
  const [result, setResult] = useState<OptimizationResult | null>(null);

  const addMedicine = (med: string) => {
    if (!medicines.includes(med)) setMedicines([...medicines, med]);
  };

  const removeMedicine = (med: string) => {
    setMedicines(medicines.filter(m => m !== med));
  };

  return (
    <OptimizationContext.Provider value={{ medicines, addMedicine, removeMedicine, result, setResult }}>
      {children}
    </OptimizationContext.Provider>
  );
};

export const useOptimization = () => {
  const context = useContext(OptimizationContext);
  if (context === undefined) {
    throw new Error('useOptimization must be used within an OptimizationProvider');
  }
  return context;
};
