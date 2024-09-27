import { deleteAirport, editAirport } from "@/app/airports/actions";
import { useToast } from "@/hooks/use-toast";
import { AirportFormData, AirportSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Airport } from "@prisma/client";
import { useForm } from "react-hook-form";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import AirportForm from "./AirportForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { FormItem, FormLabel } from "../ui/form";
import { useState } from "react";
import { Button } from "../ui/button";

export default function AirportDialog(airport: Airport) {
  const {toast} = useToast();

  const form = useForm<AirportFormData>({
    resolver: zodResolver(AirportSchema),
    defaultValues: airport as unknown as AirportFormData
  });

    async function onSubmit(data: AirportFormData) {
    try {
      const res = await editAirport(airport.id, data);
      toast({title: 'Airport Saved.'})
      console.log(res);
    } catch (err) {
      toast({variant: 'destructive', title: 'Something went wrong.'})
      console.error(err);
    }
  }

  const number = new Intl.NumberFormat('en-US');

  const [editMode, setEditMode] = useState(false);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{airport.name}</DialogTitle>
      </DialogHeader>
      {editMode ? (
        <>
          <AirportForm form={form} onSubmit={onSubmit} submit="Edit" />
          <DialogFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="destructive">Delete</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {airport.name}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      try {
                        const res = await deleteAirport(airport.id);
                        if (!res?.success) {
                          toast({
                            variant: 'destructive',
                            title: `Airport wasn't deleted`,
                            description: res?.error,
                          });
                        } else {
                          toast({ title: 'Airport deleted' });
                        }
                      } catch (err) {
                        console.error(err);
                        toast({
                          variant: 'destructive',
                          title: `Airport wasn't deleted`,
                        });
                      }
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </DialogFooter>
        </>
      ) : (
        <>
          <p className="grid grid-cols-[100px_1fr] items-center gap-x-2">
            <span className="text-sm text-muted-foreground text-right">Code:</span>
            <span className="font-bold"> {airport.code}</span>
          </p>
          <p className="grid grid-cols-[100px_1fr] items-center gap-x-2">
            <span className="text-sm text-muted-foreground text-right">Country:</span>
            <span className="font-bold"> {airport.country}</span>
          </p>
          <p className="grid grid-cols-[100px_1fr] items-center gap-x-2">
            <span className="text-sm text-muted-foreground text-right">City:</span>
            <span className="font-bold"> {airport.city}</span>
          </p>
          <p className="grid grid-cols-[100px_1fr] items-center gap-x-2">
            <span className="text-sm text-muted-foreground text-right">Runway:</span>
            <span className="font-bold"> {number.format(airport.runway)}ft</span>
          </p>
          <p className="grid grid-cols-[100px_1fr] items-center gap-x-2">
            <span className="text-sm text-muted-foreground text-right">Market:</span>
            <span className="font-bold"> {airport.market}%</span>
          </p>

          <DialogFooter>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
}