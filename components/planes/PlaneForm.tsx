import TextInput from "@/components/forms/TextInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import ModelField from "./ModelField";
import RouteField from "./RouteField";
import { PlaneFormData } from "./planeSchema";
import { Switch } from "../ui/switch";
import StatusField from "./StatusField";

type Props = {
  form: UseFormReturn<PlaneFormData>;
  onSubmit: (data: PlaneFormData) => Promise<void>;
  submit: string;
};

export default function PlaneForm({form, onSubmit, submit}: Props) {
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-[150px_1fr]">
        <FormField control={form.control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />
        <ModelField />
        <FormField
          control={form.control}
          name="eventPlane"
          render={({ field }) => (
            <FormItem className="space-y-0 grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
              <FormLabel className="text-right">Event Plane</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} tabIndex={0} />
              </FormControl>
              <FormMessage className="col-start-2" />
            </FormItem>
          )}
        />
        <RouteField />
        <FormField control={form.control} name="y" render={({ field }) => <TextInput {...field} label="Y" />} />
        <FormField control={form.control} name="j" render={({ field }) => <TextInput {...field} label="J" />} />
        <FormField control={form.control} name="f" render={({ field }) => <TextInput {...field} label="F" />} />
        <StatusField />
        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Plane
        </Button>
      </form>
    </Form>
  );
}