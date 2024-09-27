'use client';

import {  Hub } from '@prisma/client';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  hubs: Hub[];
} & PropsWithChildren;

export default function HubsProvider({ hubs, children }: ContextType) {
  return <HubsContext.Provider value={{  hubs }}>{children}</HubsContext.Provider>;
}

const HubsContext = createContext<ContextType>({ hubs: [] });

export const useHubsContext = () => useContext(HubsContext);
