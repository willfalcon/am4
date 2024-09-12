
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ModelSchema } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Model } from '@prisma/client';
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { editModel } from './actions';
import ModelForm from '@/components/Models/ModelForm';
import { useModelsContext } from './ModelsContextProvider';


type FormData = z.infer<typeof ModelSchema>;

export default function ActionCell(row: Row<Model>) {
  const model = row.original;
  
  const form = useForm<FormData>({
    resolver: zodResolver(ModelSchema),
    defaultValues: {...model, make: model.makeId} as FormData
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await editModel(model.id, data);
      console.log(res);
    } catch (err) {
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
      <DialogContent className='max-h-[calc(100vh-32px)] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Edit {model.name}</DialogTitle>
        </DialogHeader>
        <ModelForm form={form} onSubmit={onSubmit} submit="Edit" manufacturers={manufacturers} />
      </DialogContent>
    </Dialog>
  );
}