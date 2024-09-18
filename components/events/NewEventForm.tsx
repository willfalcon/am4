'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { getDefaults,  } from '@/lib/zodSchemas';
import { toast } from '@/hooks/use-toast';

import Heading from '../Heading';

import { EventFormData, EventSchema } from './eventSchema';
import { createEvent } from '@/app/events/actions';
import EventForm from './EventForm';

export default function NewEventForm() {
  const form = useForm<EventFormData>({
    resolver: zodResolver(EventSchema),
    defaultValues: getDefaults(EventSchema),
  });

  console.log(form.formState.errors);
  console.log(form.getValues());
  async function onSubmit(data: EventFormData) {
    console.log('submit');
    try {
      const res = await createEvent({ ...data });
      console.log(res);
      toast({ title: 'Event added.' });
      form.reset();
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Something went wrong' });
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className="relative left-[150px] mx-2">Add Event</Heading>
      <EventForm form={form} onSubmit={onSubmit} submit="Add" />
    </div>
  );
}
