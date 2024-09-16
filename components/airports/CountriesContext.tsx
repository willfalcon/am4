'use client';

import { CountryOption } from '@/lib/types';
import { createContext, PropsWithChildren, useContext } from 'react';

type ContextType = {
  countries: CountryOption[];
} & PropsWithChildren;

export default function CountriesProvider({ countries, children }: ContextType) {
  return <CountriesContext.Provider value={{ countries }}>{children}</CountriesContext.Provider>;
}

const CountriesContext = createContext<ContextType>({ countries: [] });

export const useCountriesContext = () => useContext(CountriesContext);
