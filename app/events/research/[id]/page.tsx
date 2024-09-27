import { auth } from '@/auth';
import Title from '@/components/Title';
import { getEvents, getModels, getRoute } from '@/lib/queries';
import { MoveRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getCapableModels } from './researchFunctions';

import Heading from '@/components/Heading';
import CapableModels from './CapableModels';
import ModelsProvider from '@/components/providers/ModelsContext';
import RoutesProvider from '@/components/providers/RoutesContext';

import RoutedPlane from './RoutedPlane';
import RouteInfo from './RouteInfo';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default async function ResearchEvent({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const { route, success, message } = await getRoute(params.id);
  if (!success || !route) {
    return (
      <>
        <Title className="text-center">Something went wrong.</Title>
        <p>{message}</p>
      </>
    );
  }

  

  const capableModels = await getCapableModels(route)
  const models = await getModels()
  const events = await getEvents();

  return (
    <ModelsProvider models={models}>
      <RoutesProvider routes={events.events}>
        <Breadcrumb className='my-3'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/events">Back to Events</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <RouteInfo route={route} />


        <Heading>Routed Planes</Heading>
        {route.planes.map(plane => <RoutedPlane key={plane.id} plane={plane} route={route} />)}

        <Heading>Capable Models</Heading>

        {capableModels.error || !capableModels.models?.length ? (
          <p>No capable models found.</p>
        ) : (
          <CapableModels models={capableModels.models} route={route} />
        )}
      </RoutesProvider>
    </ModelsProvider>
  );
}
