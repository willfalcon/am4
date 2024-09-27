import { auth } from '@/auth';
import DataTable from '@/components/DataTable';
import NewRouteForm from '@/components/routes/NewRouteForm';
import { routeColumns } from '@/components/routes/routeColumns';
import Title from '@/components/Title';

import { getAirports, getCountries, getHub, getHubRoutes, getHubs } from '@/lib/queries';
import { redirect } from 'next/navigation';


export default async function Routes({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const {hub, success, message} = await getHub(params.id);
  if (!success) {
    <p className="container mx-auto max-w-full py-10">{message}</p>;
  }
  const routesRes = await getHubRoutes(params.id);
  
  if (routesRes.error) {
    <p className="container mx-auto max-w-full py-10">{routesRes.message}</p>;
  }

  return (
    <>
      <Title>{hub?.name} Routes</Title> 
      <DataTable columns={routeColumns} data={routesRes.routes} key={`hub-${params.id}`} />
      <NewRouteForm />
    </>
  );
}
