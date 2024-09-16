import { useFormContext } from "react-hook-form";
import { useRoutesContext } from "../routes/RoutesContext"
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Check } from "lucide-react";

export default function RouteField() {
  const {routes} = useRoutesContext();
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={form.control}
      name="model"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
          <FormLabel className="text-right">Route</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  tabIndex={0}
                >
                  {field.value ? routes.find(route => route.name === field.value?.name)?.name : 'Select Model'}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search manufacturers" />
                <CommandList>
                  <CommandEmpty>No models found</CommandEmpty>
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
          <FormMessage className="col-start-2" />
        </FormItem>
      )}
    />
  );
}