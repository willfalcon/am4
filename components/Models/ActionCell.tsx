import { zodResolver } from '@hookform/resolvers/zod';
import { Model } from '@prisma/client';
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { deleteModel, editModel } from '@/app/models/actions';
import { useModelsContext } from '@/components/models/ModelsContextProvider';
import { ModelSchema } from '@/lib/zodSchemas';
import { toast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ModelForm from '@/components/models/ModelForm';


type FormData = z.infer<typeof ModelSchema>;

export default function ActionCell(row: Row<Model>) {
  const model = row.original;
  
  const form = useForm<FormData>({
    resolver: zodResolver(ModelSchema),
    defaultValues: model as FormData
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await editModel(model.id, data);
      toast({title: 'Model Saved.'})
      console.log(res);
    } catch (err) {
      toast({variant: 'destructive', title: 'Something went wrong.'})
      console.error(err);
    }
  }

  const {manufacturers} = useModelsContext();

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
          <DialogTitle>Edit {model.name}</DialogTitle>
        </DialogHeader>
        <ModelForm form={form} onSubmit={onSubmit} submit="Save" manufacturers={manufacturers} />
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {model.name}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteModel(model.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}