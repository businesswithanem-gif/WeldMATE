import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UnitSystem = "metric" | "imperial";

interface UnitsContextType {
  system: UnitSystem;
  toggleSystem: () => void;
  formatThickness: (mm: number) => string;
  formatSpeed: (mmPerMin: number) => string;
  formatGas: (lpm: number) => string;
}

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [system, setSystem] = useState<UnitSystem>(() => {
    const saved = localStorage.getItem("weldassist-units");
    return (saved as UnitSystem) || "metric";
  });

  useEffect(() => {
    localStorage.setItem("weldassist-units", system);
  }, [system]);

  const toggleSystem = () => {
    setSystem((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const formatThickness = (mm: number) => {
    if (system === "metric") return `${mm} mm`;
    // Approximate inches / fractions
    const inches = mm / 25.4;
    return `${inches.toFixed(3)}"`;
  };

  const formatSpeed = (mmPerMin: number) => {
    if (system === "metric") return `${mmPerMin} mm/min`;
    const ipm = mmPerMin / 25.4;
    return `${ipm.toFixed(1)} ipm`;
  };

  const formatGas = (lpm: number) => {
    if (system === "metric") return `${lpm} L/min`;
    const cfh = lpm * 2.11888;
    return `${cfh.toFixed(1)} CFH`;
  };

  return (
    <UnitsContext.Provider value={{ system, toggleSystem, formatThickness, formatSpeed, formatGas }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const context = useContext(UnitsContext);
  if (context === undefined) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
}
