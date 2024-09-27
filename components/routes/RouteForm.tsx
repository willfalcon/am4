import TextInput from '@/components/forms/TextInput';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import HubField from './HubField';
import DestinationField from './DestinationField';
import { RouteFormData } from './routeSchema';

type Props = {
  form: UseFormReturn<RouteFormData>;
  onSubmit: (data: RouteFormData) => Promise<void>;
  submit: string;
  event?: boolean;
};

export default function RouteForm({ form, onSubmit, submit }: Props) {

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-[150px_1fr]">
        <FormField control={form.control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />
        <HubField />
        <DestinationField />
        <FormField control={form.control} name="distance" render={({ field }) => <TextInput {...field} label="Distance" />} />
        <FormField control={form.control} name="yDemand" render={({ field }) => <TextInput {...field} label="Y Demand" />} />
        <FormField control={form.control} name="jDemand" render={({ field }) => <TextInput {...field} label="J Demand" />} />
        <FormField control={form.control} name="fDemand" render={({ field }) => <TextInput {...field} label="F Demand" />} />
        
        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Route
        </Button>
      </form>
    </Form>
  );
}
