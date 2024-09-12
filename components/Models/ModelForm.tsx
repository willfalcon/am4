
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ModelSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import { Manufacturer } from '@prisma/client';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Check } from 'lucide-react';
import { Switch } from '../ui/switch';

type FormData = z.infer<typeof ModelSchema>; 

type Props = {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
  submit: string;
  manufacturers: Manufacturer[]
};

export default function ModelForm({ form, onSubmit, submit, manufacturers }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Make</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn('w-full flex-grow justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? manufacturers.find(make => make.id === field.value)?.name : 'Select Manufacturer'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search manufacturers" />
                    <CommandList>
                      <CommandEmpty>No manufacturers found</CommandEmpty>
                      <CommandGroup>
                        {manufacturers.map(make => (
                          <CommandItem
                            value={make.id}
                            key={make.id}
                            onSelect={() => {
                              form.setValue('make', make.id);
                            }}
                          >
                            <Check className={cn('mr-2 h-4 w-4', make.id === field.value ? 'opacity-100' : 'opacity-0')} />
                            {make.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 w-52 text-right">Price</FormLabel>
              <FormControl>
                <Input className='flex-auto' {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discontinued"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Discontinued</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speed"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Speed</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pax"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Pax</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="runway"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Minimum Runway</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkCost"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">A-Check Cost</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Range</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fuel"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">Fuel Consumption</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="co2"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">CO2 Consumption</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkTime"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="basis-52 text-right">A-Check Time</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{submit} Model</Button>
      </form>
    </Form>
  );
}
