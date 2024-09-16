import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getManufacturers, getModels } from '@/lib/queries';

import Title from '@/components/Title';
import Heading from '@/components/Heading';
import ModelsContextProvider from '../../components/models/ModelsContextProvider';
import { columns } from '@/components/models/columns';
import NewModelForm from '@/components/models/NewModelForm';

import DataTable from '@/components/DataTable';

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
          <DataTable columns={columns} data={models} />
          <NewModelForm manufacturers={manufacturers} />
        </ModelsContextProvider>
    </div>
  );
}