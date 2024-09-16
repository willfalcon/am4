'use client';

import { ManufacturerSchema } from "@/lib/zodSchemas"
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod"

import { useFieldArray, useForm } from "react-hook-form";

import ManufacturerForm from "@/components/manufacturers/ManufacturerForm";
import Heading from "@/components/Heading";
import { createManufacturer } from "@/app/manufacturers/actions";

type FormData = z.infer<typeof ManufacturerSchema>;

export default function NewManufacturerForm() {
  
  const form = useForm<FormData>({
    resolver: zodResolver(ManufacturerSchema),
    defaultValues: {
      name: '',
      lines: [{value: ''}]
    }
  });


  const fieldArray = useFieldArray({
    name: 'lines',
    control: form.control,
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await createManufacturer(data);
      console.log(res);
      form.reset();
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="mt-8">
      <Heading className="relative left-[150px] mx-2">Add New Manufacturer</Heading>
      <ManufacturerForm form={form} fieldArray={fieldArray} onSubmit={onSubmit} submit="Add" />
    </div>
  );
}




