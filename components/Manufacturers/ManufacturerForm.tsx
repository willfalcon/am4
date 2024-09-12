import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ManufacturerSchema } from "@/lib/zodSchemas";
import { cn } from "@/lib/utils";

type FormData = z.infer<typeof ManufacturerSchema>;

type Props = {
  form: UseFormReturn<FormData>;
  fieldArray: UseFieldArrayReturn,
  onSubmit: (data: FormData) => Promise<void>,
  submit: string
};

export default function ManufacturerForm({form, onSubmit, fieldArray, submit}: Props) {
  console.log(form.getValues())
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {fieldArray.fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`lines.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && 'sr-only')}>Lines</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="button" variant="secondary" size="icon" className="mt-2 rounded-full w-7 h-7" onClick={() => fieldArray.append({ value: '' })}>
          <Plus className="w-4 h-4" />
        </Button>
        <br />
        <Button type="submit">{submit} Manufacturer</Button>
      </form>
    </Form>
  );
}