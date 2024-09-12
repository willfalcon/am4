import { auth } from "@/auth";
import AirportsTable from "./AirportsTable";
import { getAirports } from "@/lib/queries";
import { redirect } from "next/navigation";
import NewAirportForm from "@/app/airports/NewAirportForm";
import { columns } from "./columns";

export default async function Airports() {
  const session = await auth();
  
  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/');
  }

  const airports = await getAirports();
  const countries = await fetch('https://restcountries.com/v3.1/all?fields=name').then(res => res.json());

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold">Airports</h2>
      <AirportsTable columns={columns} data={airports} />
      <NewAirportForm countries={countries} />
    </div>
  );
}