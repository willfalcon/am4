import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function StatusField() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[150px_1fr] gap-x-2 col-span-2 items-start">
          <FormLabel className="text-right">Status</FormLabel>
          <FormControl>
            <RadioGroup onValueChange={field.onChange} value={field.value} defaultValue={field.value} className="!mt-0">
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="routed" />
                </FormControl>
                <FormLabel className="font-normal">Routed</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="groundedToHub" />
                </FormControl>
                <FormLabel className="font-normal">Grounded to Hub</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="groundedToEvent" />
                </FormControl>
                <FormLabel className="font-normal">Grounded to Event</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="pending" />
                </FormControl>
                <FormLabel className="font-normal">Pending</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="maintenance" />
                </FormControl>
                <FormLabel className="font-normal">Maintenance</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}