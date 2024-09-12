import { auth } from '@/auth';

import Title from '@/components/Title';
import { redirect } from 'next/navigation';
import NewModelForm from './NewModelForm';
import { columns } from './columns';
import { getManufacturers, getModels } from '@/lib/queries';
import Heading from '@/components/Heading';
import { ModelsTable } from './ModelsTable';
import ModelsContextProvider from './ModelsContextProvider';

export default async function Models() {
  const session = await auth();
  
  if (!session?.user || session?.user.role !== 'ADMIN') {
    redirect('/');
  }

  const models = await getModels();
  const manufacturers = await getManufacturers();

  return (
    <div className="container mx-auto max-w-full py-10">
      <Title>Models</Title>
        <ModelsContextProvider manufacturers={manufacturers}>
          <ModelsTable columns={columns} data={models} />
          <Heading>Add Model</Heading>
          <NewModelForm manufacturers={manufacturers} />
        </ModelsContextProvider>
    </div>
  );
}