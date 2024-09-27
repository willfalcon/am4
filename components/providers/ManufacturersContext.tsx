'use client';

import { Manufacturer, Model } from '@prisma/client';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  manufacturers: Manufacturer[];
} & PropsWithChildren;

export default function ManufacturersProvider({ manufacturers, children }: ContextType) {
  return <ManufacturersContext.Provider value={{manufacturers}}>{children}</ManufacturersContext.Provider>;
}

const ManufacturersContext = createContext<ContextType>({manufacturers: []});

export const useManufacturersContext = () => useContext(ManufacturersContext);
