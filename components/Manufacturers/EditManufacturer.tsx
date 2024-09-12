'use client';

import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import {  Manufacturer } from '@prisma/client';
import ManufacturerForm from './ManufacturerForm';
import { useFieldArray, useForm } from 'react-hook-form';
import { ManufacturerSchema } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { deleteManufacturer, editManufacturer } from '@/app/manufacturers/actions';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { deleteCache } from 'next/dist/server/lib/render-server';

type Props = {
  manufacturer: Manufacturer  
}

type FormData = z.infer<typeof ManufacturerSchema>;

export default function EditManufacturer({manufacturer}: Props) {

  const form = useForm<FormData>({
    resolver: zodResolver(ManufacturerSchema),
    defaultValues: {
      name: manufacturer.name,
      lines: manufacturer.lines?.map(line => ({value: line})),
    },
  });

  const fieldArray = useFieldArray({
    name: 'lines',
    control: form.control,
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await editManufacturer(manufacturer.id, data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Manufacturer</DialogTitle>
        </DialogHeader>
        <ManufacturerForm form={form} fieldArray={fieldArray} onSubmit={onSubmit} submit="Edit" />
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {manufacturer.name}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteManufacturer(manufacturer.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}