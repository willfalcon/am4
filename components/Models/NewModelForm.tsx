"use client";

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { Manufacturer } from '@prisma/client';

import { createModel } from '@/app/models/actions';
import { getDefaults, ModelFormData, ModelSchema } from '@/lib/zodSchemas';
import { toast } from '@/hooks/use-toast';

import ModelForm from '@/components/models/ModelForm';
import Heading from '../Heading';


type Props = {
  manufacturers: Manufacturer[]
}

export default function NewModelForm({manufacturers}: Props) {
  const form = useForm<ModelFormData>({
    resolver: zodResolver(ModelSchema),
    defaultValues: getDefaults(ModelSchema)
  });
  
  async function onSubmit(data: ModelFormData) {
    console.log('submit')
    console.log(data)
    try {
      await createModel(data);
      toast({title: 'Model added.'})
      form.reset();
    } catch (err) {
      console.error(err);
      toast({variant: 'destructive', title:'Something went wrong'});
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className='relative left-[150px] mx-2'>Add Model</Heading>
      <ModelForm form={form} onSubmit={onSubmit} manufacturers={manufacturers} submit="Add" />
    </div>
  );
}