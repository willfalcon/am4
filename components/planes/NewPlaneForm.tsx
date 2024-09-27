'use client';

import Heading from "@/components/Heading";
import { useToast } from "@/hooks/use-toast";
import { getDefaults, } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PlaneForm from "./PlaneForm";
import { createPlane } from "@/app/planes/actions";
import { PlaneFormData, PlaneSchema } from "./planeSchema";
import { Model } from "@prisma/client";

export default function NewPlaneForm({model}: {model?: Model}) {
  
  const { toast } = useToast();

  const form = useForm<PlaneFormData>({
    resolver: zodResolver(PlaneSchema),
    defaultValues: {
      ...getDefaults(PlaneSchema),
      ...(model && (
        {
          model
        }
      ))
    }
  });
  
  async function onSubmit(data: PlaneFormData) {
    console.log('submit')
    console.log(data)
    try {
      const planeRes = await createPlane(data);
      console.log(planeRes);
      if (planeRes.success) {
        toast({title: 'Plane added.'})
        form.reset();
      } else {
        toast({variant: 'destructive', title: planeRes.error});
      }
    } catch (err) {
      console.error(err);
      toast({variant: 'destructive', title:'Something went wrong'});
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <Heading className="relative left-[150px] mx-2">Add Plane</Heading>
      <PlaneForm form={form} onSubmit={onSubmit} submit="Add" />
    </div>
  );
}