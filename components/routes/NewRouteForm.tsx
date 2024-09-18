"use client";

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { getDefaults, } from '@/lib/zodSchemas';
import { RouteFormData, RouteSchema } from './routeSchema';
import { toast } from '@/hooks/use-toast';

import Heading from '../Heading';
import RouteForm from './RouteForm';
import { createRoute } from '@/app/routes/actions';


type Props = {
  event?: boolean;
  tag: string
}
export default function NewRouteForm({event = false, tag}: Props) {
  const form = useForm<RouteFormData>({
    resolver: zodResolver(RouteSchema),
    defaultValues: getDefaults(RouteSchema)
  });

  console.log(form.formState.errors)
  console.log(form.getValues()) 
  async function onSubmit(data: RouteFormData) {
    console.log('submit')
    try {
  
      const res = await createRoute({...data, event}, tag);
      console.log(res)
      toast({title: 'Route added.'})
      form.reset();
    } catch (err) {
      console.error(err);
      toast({variant: 'destructive', title:'Something went wrong'});
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className='relative left-[150px] mx-2'>Add {event? 'Event' : 'Route'}</Heading>
      <RouteForm form={form} onSubmit={onSubmit} submit="Add" event={event} />
    </div>
  );
}