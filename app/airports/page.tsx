import { auth } from "@/auth";

import { getAirports, getCountries } from "@/lib/queries";
import { redirect } from "next/navigation";
import DataTable from "@/components/DataTable";
import NewAirportForm from "@/components/airports/NewAirportForm";
import { airportColumns } from "@/components/airports/airportColumns";
import CountriesProvider from "@/components/airports/CountriesContext";

export default async function Airports() {
  const session = await auth();
  
  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/');
  }

  const airports = await getAirports();
  const countries = await getCountries();

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold">Airports</h2>
      <CountriesProvider countries={countries}>
        <DataTable columns={airportColumns} data={airports} key="airports" />
        <NewAirportForm />
      </CountriesProvider>
    </div>
  );
}