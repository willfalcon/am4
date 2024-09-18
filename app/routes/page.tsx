import { auth } from "@/auth";
import CountriesProvider from "@/components/airports/CountriesContext";
import DataTable from "@/components/DataTable";
import NewRouteForm from "@/components/routes/NewRouteForm";
import { routeColumns } from "@/components/routes/routeColumns";
import RoutesContextProvider from "@/components/routes/RoutesContextProvider";
import Title from "@/components/Title";
import { getAirports, getCountries, getHubs, getRoutes } from "@/lib/queries";
import { redirect } from "next/navigation";
import { routesTag } from "./cache";

export default async function Routes() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const routesRes = await getRoutes();
  const airports = await getAirports();
  const hubsRes = await getHubs();
  const countries = await getCountries();
  const tag = routesTag;
  
  if (routesRes.error) {
    <p className="container mx-auto max-w-full py-10">{routesRes.message}</p>;
  }
  
  
  return (
    <div className="container mx-auto max-w-full py-10">
      <Title>Routes</Title>
      <RoutesContextProvider airports={airports} hubs={hubsRes.hubs} tag={routesTag}>
        <CountriesProvider countries={countries}>
          <DataTable columns={routeColumns} data={routesRes.routes} />
          <NewRouteForm tag={routesTag} />
        </CountriesProvider>
      </RoutesContextProvider>
    </div>
  );
}