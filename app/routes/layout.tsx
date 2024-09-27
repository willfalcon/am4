import CountriesProvider from "@/components/airports/CountriesContext";
import AirportsProvider from "@/components/providers/AirportsContext";
import HubsProvider from "@/components/providers/HubsContext";
import RoutesMenu from "@/components/routes/RoutesMenu";
import Title from "@/components/Title";
import { getAirports, getCountries, getHubs } from "@/lib/queries";

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const airports = await getAirports();
  const hubsRes = await getHubs();
  const countries = await getCountries();
  return (
    <div className="container mx-auto max-w-full">
      <AirportsProvider airports={airports}>
        <HubsProvider hubs={hubsRes.hubs}>
          <CountriesProvider countries={countries}>
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <RoutesMenu />
                <div className="col-span-3 lg:col-span-4 lg:border-l">
                  <div className="h-full px-4 py-6 lg:px-8">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </CountriesProvider>
        </HubsProvider>
      </AirportsProvider>
    </div>
  );
}
