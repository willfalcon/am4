import { AirportFormData } from "@/lib/zodSchemas";
import { UseFormReturn } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import TextInput from "../forms/TextInput";
import CountryField from "./CountryField";
import { Button } from "../ui/button";

type Props = {
  form: UseFormReturn<AirportFormData>;
  onSubmit: (data: AirportFormData) => Promise<void>;
  submit: string;
};

export default function AirportForm({onSubmit, form, submit}: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-[150px_1fr]">
        <FormField control={form.control} name="code" render={({ field }) => <TextInput {...field} label="Code" />} />
        <FormField control={form.control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />
        <CountryField />
        <FormField control={form.control} name="city" render={({ field }) => <TextInput {...field} label="City" />} />
        <FormField control={form.control} name="runway" render={({ field }) => <TextInput {...field} label="Runway" />} />
        <FormField control={form.control} name="market" render={({ field }) => <TextInput {...field} label="Market" />} />
        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Airport
        </Button>
      </form>
    </Form>
  );
}