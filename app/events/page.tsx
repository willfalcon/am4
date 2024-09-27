import { auth } from '@/auth';
import CountriesProvider from '@/components/airports/CountriesContext';
import DataTable from '@/components/DataTable';

import Title from '@/components/Title';
import { getAirports, getAllRoutes, getCountries, getEventHubs, getEvents, getModels } from '@/lib/queries';
import { redirect } from 'next/navigation';

import NewHubForm from '@/components/hubs/NewHubForm';

import { eventColumns } from '@/components/events/eventColumns';
import NewEventForm from '@/components/events/NewEventForm';

import AirportsProvider from '@/components/providers/AirportsContext';
import HubsProvider from '@/components/providers/HubsContext';
import ModelsProvider from '@/components/providers/ModelsContext';
import RoutesProvider from '@/components/providers/RoutesContext';


export default async function Events() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const airports = await getAirports();
  const hubsRes = await getEventHubs();
  const countries = await getCountries();
  const eventsRes = await getEvents();
  const models = await getModels();
  const routesRes = await getAllRoutes();

  if (eventsRes.error) {
    <p className="container mx-auto max-w-full py-10">{eventsRes.message}</p>;
  }

  // const researchedRoutes = eventsRes.events.filter(event => event.research);
  
  return (
    <div className="container mx-auto max-w-full">
      <Title>Events</Title>
      <HubsProvider hubs={hubsRes.hubs}>
        <AirportsProvider airports={airports}>
          <CountriesProvider countries={countries}>
            <ModelsProvider models={models}>
              <RoutesProvider routes={routesRes.routes}>
                <DataTable columns={eventColumns} data={eventsRes.events} />
                <div className="grid grid-cols-2">
                  <NewEventForm />
                  <NewHubForm event />
                </div>
              </RoutesProvider>
            </ModelsProvider>
          </CountriesProvider>
        </AirportsProvider>
      </HubsProvider>
    </div>
  );
}
