import TextInput from '@/components/forms/TextInput';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { HubFormData } from '@/lib/zodSchemas';
import { UseFormReturn } from 'react-hook-form';
import AirportField from './AirportField';
import { Switch } from '../ui/switch';

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
        <FormField
          control={form.control}
          name="eventHub"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
              <FormLabel className="text-right">Event Hub</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} tabIndex={0} />
              </FormControl>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Hub
        </Button>
      </form>
    </Form>
  );
}
