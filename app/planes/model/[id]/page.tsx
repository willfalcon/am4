import { auth } from '@/auth';
import Title from '@/components/Title';
import { getModels, getPlanesByModel, getRoutes } from '@/lib/queries';
import { redirect } from 'next/navigation';
import { planeColumns } from '@/components/planes/planeColumns';
import DataTable from '@/components/DataTable';
import NewPlaneForm from '@/components/planes/NewPlaneForm';

import RoutesProvider from '@/components/providers/RoutesContext';
import ModelsProvider from '@/components/providers/ModelsContext';
import { Breadcrumb, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import Link from 'next/link';


export default async function PlanesByModel({params}: {params: {id: string}}) {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const planesRes = await getPlanesByModel(params.id);
  const models = await getModels();
  const routes = await getRoutes();


  const model = models.find(model => model.id === params.id);
  
  if (!model) {
    return <p className="container mx-auto max-w-full py-10">Model not found.</p>;
  }
  
  if (routes.error) {
    return <p className="container mx-auto max-w-full py-10">{routes.message}</p>;
  }
  if (planesRes.error) {
    return <p className="container mx-auto max-w-full py-10">{planesRes.message}</p>;
  }

  
  return (
    <div className="container mx-auto max-w-full py-10">
      <Breadcrumb className='mb-3'>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <Link href="/planes">Planes</Link>
          </BreadcrumbLink>
        </BreadcrumbList>
      </Breadcrumb>

      <Title>{model?.name}</Title>

      <ModelsProvider models={models}>
        <RoutesProvider routes={routes.routes}>
          <DataTable columns={planeColumns} data={planesRes.planes} key="planes" />
          <NewPlaneForm model={model} />
        </RoutesProvider>
      </ModelsProvider>
    </div>
  );
}
