"use client";

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod';

import { ModelSchema } from '@/lib/zodSchemas';
import ModelForm from '@/components/Models/ModelForm';
import { createModel } from './actions';
import { Manufacturer } from '@prisma/client';

type FormData = z.infer<typeof ModelSchema>;

type Props = {
  manufacturers: Manufacturer[]
}

export default function NewModelForm({manufacturers}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(ModelSchema),
  });
  
  async function onSubmit(data: FormData) {
    try {
      const res = await createModel(data);
      console.log(res);
      form.reset();
    } catch (err) {
      console.error(err);
    }
  }

  return ( 
    <div className="w-[600px] max-w-full mx-auto">
      <ModelForm form={form} onSubmit={onSubmit} manufacturers={manufacturers} submit="Add" />
    </div>
  );
}