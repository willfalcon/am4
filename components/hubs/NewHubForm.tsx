'use client';

import { createHub } from '@/app/hubs/actions';
import Heading from '@/components/Heading';
import { useToast } from '@/hooks/use-toast';
import { getDefaults, HubFormData, HubSchema } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import HubForm from './HubForm';

export default function NewHubForm() {
  const { toast } = useToast();

  const form = useForm<HubFormData>({
    resolver: zodResolver(HubSchema),
    defaultValues: getDefaults(HubSchema),
  });

  async function onSubmit(data: HubFormData) {
    console.log('submit');
    console.log(data);
    try {
      const hubRes = await createHub(data);
      console.log(hubRes);
      toast({ title: 'Hub added.' });
      form.reset();
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Something went wrong' });
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className="relative left-[150px] mx-2">Add Hub</Heading>
      <HubForm form={form} onSubmit={onSubmit} submit="Add" />
    </div>
  );
}
