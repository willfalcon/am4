'use client';

import { Airport, Hub } from '@prisma/client';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  airports: Airport[];
  hubs: Hub[];
} & PropsWithChildren;

export default function RoutesContextProvider({ airports, hubs, children }: ContextType) {
  return <RoutesContext.Provider value={{ airports, hubs }}>{children}</RoutesContext.Provider>;
}

const RoutesContext = createContext<ContextType>({ airports: [], hubs: [] });

export const useRoutesContext = () => useContext(RoutesContext);
