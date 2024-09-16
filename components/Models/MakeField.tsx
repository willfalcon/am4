import { useFormContext, UseFormReturn } from 'react-hook-form';
import { Manufacturer } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ModelFormData } from '@/lib/zodSchemas';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

type Props = {
  manufacturers: Manufacturer[];
  setLines: Dispatch<SetStateAction<string[]>>
};

export default function MakeField({ manufacturers, setLines }: Props) {
  
  const form = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="make"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
          <FormLabel className="text-right">Make</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  tabIndex={0}
                >
                  {field.value ? manufacturers.find(make => make.name === field.value?.name)?.name : 'Select Manufacturer'}
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
                        value={make.name}
                        key={make.id}
                        onSelect={() => {
                          form.setValue('make', make);
                          setLines(make.lines);
                          setOpen(false);
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', make.name === field.value?.name ? 'opacity-100' : 'opacity-0')} />
                        {make.name}
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
