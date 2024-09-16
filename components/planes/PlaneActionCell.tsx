import { useToast } from '@/hooks/use-toast';
import { PlaneFormData, PlaneSchema } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plane } from '@prisma/client';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import PlaneForm from './PlaneForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { deletePlane, editPlane } from '@/app/planes/actions';


export default function PlaneActionCell(row: Row<Plane>) {
  const plane = row.original;

  const {toast} = useToast();

  const form = useForm<PlaneFormData>({
    resolver: zodResolver(PlaneSchema),
    defaultValues: plane as unknown as PlaneFormData,
  });

  async function onSubmit(data: PlaneFormData) {
    try {
      const res = await editPlane(plane.id, data);
      toast({ title: 'Plane Saved.' });
      console.log(res);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
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
          <DialogTitle>Edit {plane.name}</DialogTitle>
        </DialogHeader>
        <PlaneForm form={form} onSubmit={onSubmit} submit="Save" />
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {plane.name}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={async () => {
                try {
                  const res = await deletePlane(plane.id);
                  if (!res?.success) {
                    toast({
                      variant: 'destructive',
                      title: `Plane wasn't deleted`,
                      description: res?.error
                    });
                  } else {
                    toast({title: 'Plane deleted'});
                  }
                } catch(err) {
                  console.error(err);
                  toast({
                    variant: 'destructive', 
                    title: `Plane wasn't deleted`
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
