import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRoutesContext } from './RoutesContextProvider';

export default function HubField({ }) {

  const { hubs } = useRoutesContext();
  const form = useFormContext();

  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="hub"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
          <FormLabel className="text-right">Hub</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  tabIndex={0}
                >
                  {field.value ? hubs?.find(hub => hub.name === field.value?.name)?.name : 'Select Model'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search manufacturers" />
                <CommandList>
                  <CommandEmpty>No hubs found</CommandEmpty>
                  <CommandGroup>
                    {hubs?.map(hub => (
                      <CommandItem
                        value={hub.name}
                        key={hub.id}
                        onSelect={() => {
                          form.setValue('hub', hub);
                          setOpen(false);
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', hub.name === field.value?.name ? 'opacity-100' : 'opacity-0')} />
                        {hub.name}
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
