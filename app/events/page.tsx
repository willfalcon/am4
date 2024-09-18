import { auth } from '@/auth';
import CountriesProvider from '@/components/airports/CountriesContext';
import DataTable from '@/components/DataTable';
import NewRouteForm from '@/components/routes/NewRouteForm';
import { routeColumns } from '@/components/routes/routeColumns';
import RoutesContextProvider from '@/components/routes/RoutesContextProvider';
import Title from '@/components/Title';
import { getAirports, getCountries, getEventHubs, getEvents, getHubs, getRoutes } from '@/lib/queries';
import { redirect } from 'next/navigation';
import { hubsTag } from '../hubs/cache';
import { airportsTag } from '../airports/cache';
import AirportsProvider from '@/components/airports/AirportsProvider';
import NewHubForm from '@/components/hubs/NewHubForm';
import { eventsTag } from './cache';
import { eventColumns } from '@/components/events/eventColumns';
import NewEventForm from '@/components/events/NewEventForm';

export default async function Events() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const airports = await getAirports();
  const hubsRes = await getEventHubs();
  const countries = await getCountries();
  const eventsRes = await getEvents();

  if (eventsRes.error) {
    <p className="container mx-auto max-w-full py-10">{eventsRes.message}</p>;
  }

  return (
    <div className="container mx-auto max-w-full py-10">
      <Title>Events</Title>
      <RoutesContextProvider airports={airports} hubs={hubsRes.hubs}>
        <AirportsProvider airports={airports}>
            <CountriesProvider countries={countries}>
              <DataTable columns={eventColumns} data={eventsRes.events} />
              <div className="grid grid-cols-2">
                <NewEventForm />
                <NewHubForm event />
              </div>
            </CountriesProvider>
        </AirportsProvider>
      </RoutesContextProvider>
    </div>
  );
}
