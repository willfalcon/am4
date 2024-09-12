'use client';

import { Manufacturer } from "@prisma/client"
import { createContext, PropsWithChildren, useContext } from "react"

type ContextType = {
  manufacturers: Manufacturer[]
} & PropsWithChildren

export default function ModelsContextProvider({manufacturers, children}: ContextType) {
  return (
    <ModelsContext.Provider value={{manufacturers}}>{children}</ModelsContext.Provider>
  )
}

const ModelsContext = createContext<ContextType>({manufacturers: []})

export const useModelsContext = () => useContext(ModelsContext);