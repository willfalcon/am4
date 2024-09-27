
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Route } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { EventFormData, EventSchema } from './eventSchema';
import { deleteEvent, editEvent } from '@/app/events/actions';
import EventForm from './EventForm';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  event: Route;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EventDialog({event, setOpen}: Props) {
  const { toast } = useToast();

  const form = useForm<EventFormData>({
    resolver: zodResolver(EventSchema),
    defaultValues: event as unknown as EventFormData,
  });

  useEffect(() => {
    form.reset(event as unknown as EventFormData);
  }, [event]);

  async function onSubmit(data: EventFormData) {
    try {
      const res = await editEvent(event.id, data);
      toast({ title: 'Event Saved.' });
      console.log(res);
      setOpen(false);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
      console.error(err);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{event.name}</DialogTitle>
      </DialogHeader>
      <EventForm form={form} onSubmit={onSubmit} submit="Edit" />
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {event.name}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  const res = await deleteEvent(event.id);
                  if (!res?.success) {
                    toast({
                      variant: 'destructive',
                      title: `Event wasn't deleted`,
                      description: res?.error,
                    });
                  } else {
                    toast({ title: 'Event deleted' });
                    setOpen(false);
                  }
                } catch (err) {
                  console.error(err);
                  toast({
                    variant: 'destructive',
                    title: `Event wasn't deleted`,
                  });
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContent>
  );
}
