import TextInput from "@/components/forms/TextInput";
import { usePlanesContext } from "@/components/planes/PlanesContextProvider";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { PlaneFormData } from "@/lib/zodSchemas";
import { UseFormReturn } from "react-hook-form";
import ModelField from "./ModelField";
import RouteField from "./RouteField";

type Props = {
  form: UseFormReturn<PlaneFormData>;
  onSubmit: (data: PlaneFormData) => Promise<void>;
  submit: string;
};

export default function PlaneForm({form, onSubmit, submit}: Props) {
  
  const {models} = usePlanesContext();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid grid-cols-[150px_1fr]">
        <FormField control={form.control} name="name" render={({ field }) => <TextInput {...field} label="Name" />} />
        <ModelField models={models} />
        <RouteField />
        <FormField control={form.control} name="y" render={({ field }) => <TextInput {...field} label="Y" />} />
        <FormField control={form.control} name="j" render={({ field }) => <TextInput {...field} label="J" />} />
        <FormField control={form.control} name="f" render={({ field }) => <TextInput {...field} label="F" />} />
        <Button type="submit" className="col-start-2 justify-self-start ml-2">
          {submit} Plane
        </Button>
      </form>
    </Form>
  );
}