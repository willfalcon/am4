import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';


import {  RouteFormData, RouteSchema } from '@/lib/zodSchemas';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Route } from '@prisma/client';
import { deleteRoute, editRoute } from '@/app/routes/actions';
import RouteForm from './RouteForm';


export default function ActionCell(row: Row<Route>) {
  const route = row.original;
  
  const form = useForm<RouteFormData>({
    resolver: zodResolver(RouteSchema),
    defaultValues: route
  });

  async function onSubmit(data: RouteFormData) {
    try {
      const res = await editRoute(route.id, data);
      toast({title: 'Route Saved.'})
      console.log(res);
    } catch (err) {
      toast({variant: 'destructive', title: 'Something went wrong.'})
      console.error(err);
    }
  }

  return (
    <Dialog>
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
        <RouteForm form={form} onSubmit={onSubmit} submit="Save" />
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {route.name}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteRoute(route.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}