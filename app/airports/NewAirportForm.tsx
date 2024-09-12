'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { Check, ChevronsUpDown } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

import { AirportSchema } from '@/lib/zodSchemas';
import { createAirport } from './actions';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../components/ui/command';

type FormData = z.infer<typeof AirportSchema>;

type CountryOption = {
  name: {
    common: string,
    nativeName: {
      eng: {
        common: string,
        official: string
      }
    },
    official: string
  }
}
type Props = {
  countries: CountryOption[];
};

export default function NewAirportForm({countries}: Props) {

  const form = useForm<FormData>({
    resolver: zodResolver(AirportSchema)
  });

  async function onSubmit(data: FormData) {
    
    try {
      const res = await createAirport(data);
      console.log(res);
      form.reset();
    } catch(err) {
      console.error(err);
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mb-4">
        <FormField
          control={form.control}
          name="code"
          render={({field}) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({field}) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Name</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                      {field.value ? countries.find(country => country.name.common === field.value)?.name.common : "Select Country"}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder="Search countries..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                    </CommandList>
                    <CommandGroup>
                      {countries.map(country => {
                        const name = country.name.common;
                        return (
                        <CommandItem value={name} key={name} onSelect={() => {
                          form.setValue('country', name)
                        }}>
                          <Check className={cn('mr-2 h-4 w-4', name === field.value ? 'opacity-100' : 'opacity-0')} />
                          {name}
                        </CommandItem>
                      )})}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({field}) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="runway"
          render={({field}) => (
            <FormItem>
              <FormLabel>Runway</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="market"
          render={({field}) => (
            <FormItem>
              <FormLabel>Market</FormLabel>
              <FormControl>
                <Input {...field} type="number" onChange={e => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Airport</Button>
      </form>
    </Form>
  )
}