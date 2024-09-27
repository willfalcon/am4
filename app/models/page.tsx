import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getManufacturers, getModels } from '@/lib/queries';

import Title from '@/components/Title';


import NewModelForm from '@/components/models/NewModelForm';

import DataTable from '@/components/DataTable';
import { modelColumns } from '@/components/models/modelColumns';

import ManufacturersProvider from '@/components/providers/ManufacturersContext';

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
        <ManufacturersProvider manufacturers={manufacturers}>
          <DataTable columns={modelColumns} data={models} key="models" />
          <NewModelForm />
        </ManufacturersProvider>
    </div>
  );
}