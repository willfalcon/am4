import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
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
import { Hub } from '@prisma/client';
import { HubFormData, HubSchema } from '@/lib/zodSchemas';
import { deleteHub, editHub } from '@/app/hubs/actions';
import HubForm from './HubForm';

export default function HubDialog(hub: Hub) {

  const { toast } = useToast();

  const form = useForm<HubFormData>({
    resolver: zodResolver(HubSchema),
    defaultValues: hub as unknown as HubFormData,
  });

  async function onSubmit(data: HubFormData) {
    try {
      const res = await editHub(hub.id, data);
      toast({ title: 'Hub Saved.' });
      console.log(res);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Something went wrong.' });
      console.error(err);
    }
  }

  return (
    
      <DialogContent className="max-h-[calc(100vh-32px)] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit {hub.name}</DialogTitle>
        </DialogHeader>
        <HubForm form={form} onSubmit={onSubmit} submit="Save" />
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {hub.name}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    const res = await deleteHub(hub.id);
                    if (!res?.success) {
                      toast({
                        variant: 'destructive',
                        title: `Hub wasn't deleted`,
                        description: res?.error,
                      });
                    } else {
                      toast({ title: 'Hub deleted' });
                    }
                  } catch (err) {
                    console.error(err);
                    toast({
                      variant: 'destructive',
                      title: `Hub wasn't deleted`,
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
