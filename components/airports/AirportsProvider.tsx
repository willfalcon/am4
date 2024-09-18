'use client';


import { Airport } from '@prisma/client';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  airports: Airport[];
} & PropsWithChildren;

export default function AirportsProvider({ airports, children }: ContextType) {
  return <AirportsContext.Provider value={{ airports }}>{children}</AirportsContext.Provider>;
}

const AirportsContext = createContext<ContextType>({ airports: [] });

export const useAirportsContext = () => useContext(AirportsContext);
