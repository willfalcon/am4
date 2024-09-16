import { UseFormReturn } from 'react-hook-form';
import { Manufacturer } from '@prisma/client';
import { useState } from 'react';

import { ModelFormData } from '@/lib/zodSchemas';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import TextInput from '@/components/forms/TextInput';

import MakeField from './MakeField';
import LineField from './LineField';


type Props = {
  form: UseFormReturn<ModelFormData>;
  onSubmit: (data: ModelFormData) => Promise<void>;
  submit: string;
  manufacturers: Manufacturer[]
};

export default function ModelForm({ form, onSubmit, submit, manufacturers }: Props) {
  const defaultLines = form.getValues('make')?.lines || [];
  
  const [lines, setLines] = useState<string[]>(defaultLines);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-[150px_1fr]">
        <FormField control={form.control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />

        <MakeField manufacturers={manufacturers} setLines={setLines} />
        
        <LineField lines={lines} />

        <FormField control={form.control} name="price" render={({ field }) => <TextInput {...field} label="Price" />} />
        <FormField
          control={form.control}
          name="discontinued"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
              <FormLabel className="text-right">Discontinued</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} tabIndex={0} />
              </FormControl>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="speed" render={({ field }) => <TextInput {...field} label="Speed" />} />
        <FormField control={form.control} name="pax" render={({ field }) => <TextInput {...field} label="Pax" />} />
        <FormField control={form.control} name="runway" render={({ field }) => <TextInput {...field} label="Runway" />} />
        <FormField control={form.control} name="checkCost" render={({ field }) => <TextInput {...field} label="A-Check Cost" />} />
        <FormField control={form.control} name="range" render={({ field }) => <TextInput {...field} label="Range" />} />
        <FormField control={form.control} name="fuel" render={({ field }) => <TextInput {...field} label="Fuel Consumption" />} />
        <FormField control={form.control} name="co2" render={({ field }) => <TextInput {...field} label="CO2 Consumption" />} />
        <FormField control={form.control} name="checkTime" render={({ field }) => <TextInput {...field} label="A-Check Time" />} />
        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Model
        </Button>
      </form>
    </Form>
  );
}
