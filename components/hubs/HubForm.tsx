import TextInput from '@/components/forms/TextInput';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { HubFormData } from '@/lib/zodSchemas';
import { UseFormReturn } from 'react-hook-form';
import AirportField from './AirportField';

type Props = {
  form: UseFormReturn<HubFormData>;
  onSubmit: (data: HubFormData) => Promise<void>;
  submit: string;
};

export default function HubForm({ form, onSubmit, submit }: Props) {

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-[150px_1fr]">
        <FormField control={form.control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />
        <AirportField />
        
        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Hub
        </Button>
      </form>
    </Form>
  );
}
