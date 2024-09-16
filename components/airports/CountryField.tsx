import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useCountriesContext } from "./CountriesContext";
import { useState } from "react";

export default function CountryField() {
  const form = useFormContext();
  const {countries} = useCountriesContext();

  const [open, setOpen] = useState(false);

  console.log(countries)
  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
          <FormLabel className="text-right">Country</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                  tabIndex={0}
                >
                  {field.value ? countries.find(country => country.name.common === field.value)?.name.common : 'Select Country'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search countries..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                </CommandList>
                <CommandGroup>
                  {countries.map(country => {
                    const name = country.name.common;
                    return (
                      <CommandItem
                        value={name}
                        key={name}
                        keywords={[country.cca2, country.cca3, country.name.common]}
                        onSelect={() => {
                          form.setValue('country', name);
                          setOpen(false);
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', name === field.value ? 'opacity-100' : 'opacity-0')} />
                        {name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}