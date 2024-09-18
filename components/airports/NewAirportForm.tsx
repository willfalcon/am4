'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { AirportFormData, AirportSchema, getDefaults } from '@/lib/zodSchemas';
import { createAirport } from '../../app/airports/actions';
import AirportForm from './AirportForm';
import Heading from '../Heading';
import { useToast } from '@/hooks/use-toast';


export default function NewAirportForm() {
  
  const {toast} = useToast();
  
  const form = useForm<AirportFormData>({
    resolver: zodResolver(AirportSchema),
    defaultValues: getDefaults(AirportSchema)
  });

  async function onSubmit(data: AirportFormData) {
    try {
      const res = await createAirport(data);
      console.log(res);
      if (res.success) {
        toast({title: `Created ${res.airport?.name}.`, description: `${res.airport?.code} in ${res.airport?.city}, ${res.airport?.country}.`});
        form.reset();
      } else if (res.error === 'Airport already exists') {
        toast({title: `${res.airport?.code} already exists.`})
      }
    } catch (err) {
      console.error(err);
      toast({variant: 'destructive', title: 'Something went wrong.'})
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className="relative left-[150px] mx-2">Add Airport</Heading>
      <AirportForm onSubmit={onSubmit} form={form} submit="Add" />
    </div>
  );
}