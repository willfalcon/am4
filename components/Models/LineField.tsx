import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';

import { useFormContext } from "react-hook-form";
import { useState } from 'react';

type Props = {
  lines: string[]
}

export default function LineField({ lines }: Props) {
  
  const form = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="line"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
          <FormLabel className="text-right">Line</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  tabIndex={0}
                >
                  {field.value ? lines.find(line => line === field.value) : 'Select Line'}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search lines" />
                <CommandList>
                  <CommandEmpty>No lines found</CommandEmpty>
                  <CommandGroup>
                    {lines.map(line => (
                      <CommandItem
                        value={line}
                        key={line}
                        onSelect={() => {
                          form.setValue('line', line);
                          setOpen(false);
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', line === field.value ? 'opacity-100' : 'opacity-0')} />
                        {line}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage className="col-start-2" />
        </FormItem>
      )}
    />
  );
}