'use client';

import { Model } from '@prisma/client';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  models: Model[];
} & PropsWithChildren;

export default function ModelsProvider({ models, children }: ContextType) {
  return <ModelsContext.Provider value={{ models }}>{children}</ModelsContext.Provider>;
}

const ModelsContext = createContext<ContextType>({ models: [] });

export const useModelsContext = () => useContext(ModelsContext);
