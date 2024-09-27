import { useFormContext } from "react-hook-form";
import { useRoutesContext } from "../providers/RoutesContext"
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Check, ChevronsUpDown, X } from "lucide-react";

export default function RouteField() {
  const {routes} = useRoutesContext();
  
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="route"
      render={({ field }) => {
        const hasValue = !!field.value;
        return (
          <FormItem className="space-y-0 grid grid-cols-[150px_1fr_40px] items-center gap-x-2 col-span-2">
            <FormLabel className="text-right">Route</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn('justify-between', !field.value && 'text-muted-foreground', !hasValue && 'col-span-2')}
                    tabIndex={0}
                  >
                    {field.value ? routes.find(route => route.id === field.value?.id)?.name : 'Select Route'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search routes" />
                  <CommandList>
                    <CommandEmpty>No routes found</CommandEmpty>
                    <CommandGroup>
                      {routes.map(route => (
                        <CommandItem
                          value={route.name}
                          key={route.id}
                          onSelect={() => {
                            form.setValue('route', route);
                            setOpen(false);
                          }}
                        >
                          <Check className={cn('mr-2 h-4 w-4', route.name === field.value?.name ? 'opacity-100' : 'opacity-0')} />
                          {route.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {hasValue && (
              <Button variant="outline" size="icon" title="Remove Route" onClick={() => {
                form.setValue('route', null);
              }}><X /></Button>
            )}
            <FormMessage className="col-start-2" />
          </FormItem>
        );
    }}
    />
  );
}