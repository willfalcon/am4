import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Model } from "@prisma/client";
import { Check } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useModelsContext } from "../providers/ModelsContext";


export default function ModelField() {

  const form = useFormContext();
  const { models } = useModelsContext();

  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="model"
      render={({ field }) => (
        <FormItem className="space-y-0 grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
          <FormLabel className="text-right">Model</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('justify-between', !field.value && 'text-muted-foreground')}
                  tabIndex={0}
                >
                  {field.value ? models.find(model => model.name === field.value?.name)?.name : 'Select Model'}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search manufacturers" />
                <CommandList>
                  <CommandEmpty>No models found</CommandEmpty>
                  <CommandGroup>
                    {models.map(model => (
                      <CommandItem
                        value={model.name}
                        key={model.id}
                        onSelect={() => {
                          form.setValue('model', model);  
                          setOpen(false);
                        }}
                      >
                        <Check className={cn('mr-2 h-4 w-4', model.name === field.value?.name ? 'opacity-100' : 'opacity-0')} />
                        {model.name}
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