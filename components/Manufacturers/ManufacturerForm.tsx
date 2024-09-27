import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ManufacturerSchema } from "@/lib/zodSchemas";
import { cn } from "@/lib/utils";
import TextInput from "../forms/TextInput";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-[150px_1fr]">
        <FormField control={form.control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />
        {fieldArray.fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`lines.${index}.value`}
            render={({ field }) => (
              <FormItem className="space-y-0 grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
                <FormLabel className={cn(index !== 0 && 'sr-only', 'text-right')}>Lines</FormLabel>
                <FormControl>
                  <Input {...field} className="col-start-2"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="mt-2 rounded-full w-7 h-7 col-start-2"
          onClick={() => fieldArray.append({ value: '' })}
          aria-label="Add Line"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <br />
        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Manufacturer
        </Button>
      </form>
    </Form>
  );
}