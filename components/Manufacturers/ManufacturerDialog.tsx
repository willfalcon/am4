import { deleteManufacturer, editManufacturer } from "@/app/manufacturers/actions";
import { useToast } from "@/hooks/use-toast";
import { ManufacturerFormData, ManufacturerSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Manufacturer } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ManufacturerForm from "./ManufacturerForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

type Props = {
  manufacturer: Manufacturer;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export default function ManufacturerDialog({ manufacturer, setOpen }: Props) {
  const { toast } = useToast();

  const form = useForm<ManufacturerFormData>({
    resolver: zodResolver(ManufacturerSchema),
    defaultValues: { name: manufacturer.name, lines: manufacturer.lines?.map(line => ({ value: line })) },
  });

 useEffect(() => {
   form.reset();
 }, [manufacturer]);

 async function onSubmit(data: ManufacturerFormData) { 
   try {
     const res = await editManufacturer(manufacturer.id, data);
     toast({ title: 'Manufacturer Saved.' });
     console.log(res);
     setOpen(false);
   } catch (err) {
     toast({ variant: 'destructive', title: 'Something went wrong.' });
     console.error(err);
   }
 }

 const fieldArray = useFieldArray({
   name: 'lines',
   control: form.control,
 });

 return (
   <DialogContent className="max-h-[calc(100vh-32px)] overflow-auto">
     <DialogHeader>
       <DialogTitle>Edit {manufacturer.name}</DialogTitle>
     </DialogHeader>
     <ManufacturerForm form={form} onSubmit={onSubmit} submit="Edit" fieldArray={fieldArray} />
     <AlertDialog>
       <AlertDialogTrigger>Delete</AlertDialogTrigger>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Delete {manufacturer.name}</AlertDialogTitle>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction
             onClick={async () => {
               try {
                 const res = await deleteManufacturer(manufacturer.id);
                 if (!res?.success) {
                   toast({
                     variant: 'destructive',
                     title: `Manufacturer wasn't deleted`,
                     description: res?.err,
                   });
                 } else {
                   toast({ title: 'Manufacturer deleted' });
                   setOpen(false);
                 }
               } catch (err) {
                 console.error(err);
                 toast({
                   variant: 'destructive',
                   title: `Manufacturer wasn't deleted`,
                 });
               }
             }}
           >
             Continue
           </AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
   </DialogContent>
 );

}
