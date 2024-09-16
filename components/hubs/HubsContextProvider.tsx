'use client';

import { Airport } from '@prisma/client';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  airports: Airport[];
} & PropsWithChildren;

export default function HubsContextProvider({ airports, children }: ContextType) {
  return <HubsContext.Provider value={{ airports }}>{children}</HubsContext.Provider>;
}

const HubsContext = createContext<ContextType>({ airports: [] });

export const useHubsContext = () => useContext(HubsContext);
