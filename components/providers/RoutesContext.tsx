'use client';

import { Route } from '@prisma/client';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  routes: Route[]
} & PropsWithChildren;

export default function RoutesProvider({ routes, children }: ContextType) {
  return <RoutesContext.Provider value={{ routes }}>{children}</RoutesContext.Provider>;
}

const RoutesContext = createContext<ContextType>({ routes: [] });

export const useRoutesContext = () => useContext(RoutesContext);
