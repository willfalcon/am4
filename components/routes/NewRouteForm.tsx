"use client";

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { getDefaults, RouteFormData, RouteSchema } from '@/lib/zodSchemas';
import { toast } from '@/hooks/use-toast';

import Heading from '../Heading';
import RouteForm from './RouteForm';
import { createRoute } from '@/app/routes/actions';

export default function NewRouteForm() {
  const form = useForm<RouteFormData>({
    resolver: zodResolver(RouteSchema),
    defaultValues: getDefaults(RouteSchema)
  });
  
  async function onSubmit(data: RouteFormData) {
    console.log('submit')
    console.log(data)
    try {
      await createRoute(data);
      toast({title: 'Route added.'})
      form.reset();
    } catch (err) {
      console.error(err);
      toast({variant: 'destructive', title:'Something went wrong'});
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className='relative left-[150px] mx-2'>Add Route</Heading>
      <RouteForm form={form} onSubmit={onSubmit} submit="Add" />
    </div>
  );
}