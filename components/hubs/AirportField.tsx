import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import NewAirportForm from '../airports/NewAirportForm';
import { useAirportsContext } from '../providers/AirportsContext';

export default function AirportField() {
  const form = useFormContext();
  const { airports } = useAirportsContext();

  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="airport"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
          <FormLabel className="text-right">Airport</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  tabIndex={0}
                >
                  {field.value ? airports.find(airport => airport.name === field.value?.name)?.name : 'Select Model'}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search manufacturers" />
                <CommandList>
                  <CommandEmpty>
                    <p className="mb-2">No airports found</p>
                  </CommandEmpty>
                  <CommandGroup>
                    {airports.map(airport => (
                      <CommandItem
                        keywords={[airport.code]}
                        value={airport.name}
                        key={airport.id}
                        onSelect={() => {
                          form.setValue('airport', airport);
                          setOpen(false);
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4 flex-shrink-0', airport.name === field.value?.name ? 'opacity-100' : 'opacity-0')} />
                        {airport.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <div className="px-3 pt-1 pb-6 flex justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Airport</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>New Airport</DialogTitle>
                        </DialogHeader>
                        <NewAirportForm />
                      </DialogContent>
                    </Dialog>
                  </div>
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
