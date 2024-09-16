import { clearLine } from "readline";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, InputProps } from "../ui/input";

type Props = InputProps & {
  label: string
}
export default function TextInput(props: Props) {

  return (
    <FormItem className="space-y-0 grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
      <FormLabel className="text-right">{props.label}</FormLabel>
      <FormControl>
        <Input {...props} />
      </FormControl>
      <FormMessage className="col-start-2" />
    </FormItem>
  );
}