'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { AirportFormData, AirportSchema } from '@/lib/zodSchemas';
import { createAirport } from '../../app/airports/actions';
import AirportForm from './AirportForm';
import Heading from '../Heading';


export default function NewAirportForm() {

  const form = useForm<AirportFormData>({
    resolver: zodResolver(AirportSchema)
  });

  async function onSubmit(data: AirportFormData) {
    try {
      const res = await createAirport(data);
      console.log(res);
      form.reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className="relative left-[150px] mx-2">Add Airport</Heading>
      <AirportForm onSubmit={onSubmit} form={form} submit="Add" />
    </div>
  );
}