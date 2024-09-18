import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Route } from '@prisma/client';
import { EventFormData, EventSchema } from './eventSchema';
import EventForm from './EventForm';
import { deleteEvent, editEvent } from '@/app/events/actions';
import { useState } from 'react';


export default function ActionCell(row: Row<Route>) {
  const route = row.original;
  const {toast} = useToast();
  const form = useForm<EventFormData>({
    resolver: zodResolver(EventSchema),
    defaultValues: route as unknown as EventFormData
  });

  async function onSubmit(data: EventFormData) {
    try {
      const res = await editEvent(route.id, data);
      toast({title: 'Route Saved.'})
      console.log(res);
    } catch (err) {
      toast({variant: 'destructive', title: 'Something went wrong.'})
      console.error(err);
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-32px)] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit {route.name}</DialogTitle>
        </DialogHeader>
        <EventForm form={form} onSubmit={onSubmit} submit="Save" />
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {route.name}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={async () => {
                try {
                  await deleteEvent(route.id)
                  setOpen(false);
                } catch(err) {
                  console.error(err);
                  toast({
                    variant:'destructive',
                    title: 'Something went wrong'
                  });
                }
                }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}