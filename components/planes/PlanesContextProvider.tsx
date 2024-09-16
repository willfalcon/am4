'use client';

import { Model } from "@prisma/client";
import { createContext, PropsWithChildren, useContext } from "react"

type ContextType = {
  models: Model[]
} & PropsWithChildren

export default function PlanesContextProvider({models, children}: ContextType) {
  return (
    <PlanesContext.Provider value={{models}}>{children}</PlanesContext.Provider>
  );
}

const PlanesContext = createContext<ContextType>({models: []});

export const usePlanesContext = () => useContext(PlanesContext);