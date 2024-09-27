import { auth } from '@/auth';
import Title from '@/components/Title';
import { getAirports, getCountries, getHubs } from '@/lib/queries';
import { redirect } from 'next/navigation';
import DataTable from '@/components/DataTable';
import HubsContextProvider from '@/components/hubs/HubsContextProvider';
import { hubsColumns } from '@/components/hubs/hubsColumns';
import NewHubForm from '@/components/hubs/NewHubForm';
import CountriesProvider from '@/components/airports/CountriesContext';

export default async function Hubs() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const hubsRes = await getHubs();
  const airports = await getAirports();
  const countries = await getCountries();

  if (hubsRes.error) {
    <p className="container mx-auto max-w-full py-10">{hubsRes.message}</p>;
  }

  return (
    <div className="container mx-auto max-w-full py-10">
      <Title>Hubs</Title>
      <HubsContextProvider airports={airports}>
        <CountriesProvider countries={countries}>
          <DataTable columns={hubsColumns} data={hubsRes.hubs} key="hubs" />
          <NewHubForm />
        </CountriesProvider>
      </HubsContextProvider>
    </div>
  );
}
