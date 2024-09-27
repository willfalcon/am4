import { useToast } from '@/hooks/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

import PlaneForm from './PlaneForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { deletePlane, editPlane } from '@/app/planes/actions';
import { PlaneFormData, PlaneSchema } from './planeSchema';
import { PlaneWithRefs } from '@/lib/types';
import { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { Route } from '@prisma/client';

type Props = {
  plane: PlaneWithRefs;
  setOpen: Dispatch<SetStateAction<boolean>>;
  route?: Route | null
};
export default function PlaneDialog({plane, setOpen, route = null}: Props) {
  const { toast } = useToast();

  const form = useForm<PlaneFormData>({
    resolver: zodResolver(PlaneSchema),
    defaultValues: {} as PlaneFormData,
  });

  useEffect(() => {
    const cleanedPlane = {
      ...plane,
      route: route || plane.route,
      eventPlane: !!plane.eventPlane
    };
    form.reset(cleanedPlane as unknown as PlaneFormData);
  }, [plane]);
  

  async function onSubmit(data: PlaneFormData) {
    console.log('data:');
    console.log(data);
    try {
      const res = await editPlane(plane.id, data);
      toast({ title: 'Plane Saved.' });
      console.log(res);
      setOpen(false);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
      console.error(err);
    }
  }

  return (
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
            <AlertDialogAction
              onClick={async () => {
                try {
                  const res = await deletePlane(plane.id);
                  if (!res?.success) {
                    toast({
                      variant: 'destructive',
                      title: `Plane wasn't deleted`,
                      description: res?.error,
                    });
                  } else {
                    toast({ title: 'Plane deleted' });
                    setOpen(false);
                  }
                } catch (err) {
                  console.error(err);
                  toast({
                    variant: 'destructive',
                    title: `Plane wasn't deleted`,
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
