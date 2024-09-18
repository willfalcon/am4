import { useFormContext } from "react-hook-form"
import {add, formatDuration, formatISO, intervalToDuration} from 'date-fns';
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormLabel } from "../ui/form";
import { timeUntil } from "@/lib/utils";

export default function Expires() {
  const form = useFormContext();
  
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const [expiresIn, setExpiresIn] = useState(form.formState.defaultValues?.expires || formatISO(new Date()));
  const [timer, setTimer] = useState('')
  useEffect(() => {
    const expireDate = add(new Date() , {
      days: parseInt(days) || 0,
      hours: parseInt(hours) || 0,
      minutes: parseInt(minutes) || 0
    });

    setExpiresIn(formatISO(expireDate));
    form.setValue('expires', formatISO(expireDate));
  }, [days, hours, minutes])

  useEffect(() => {
    const interval = setInterval(() => {
      
      const duration = intervalToDuration({
        start: new Date(),
        end: expiresIn
      });
      
      setTimer(formatDuration(duration));
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [expiresIn])

  return (
    <div className="space-y-0 grid grid-cols-[150px_1fr] items-center gap-x-2 col-span-2">
      <FormLabel className="text-right">Expires</FormLabel>
      <div className="flex items-end space-x-2">
        <div className="flex items-center h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <Input
            onChange={e => {
              setDays(e.target.value);
            }}
            value={days}
            name="days"
            className="outline-none border-none w-12 text-center"
          />
          <Label className="mx-3 text-muted-foreground" htmlFor="days">
            D
          </Label>
          <Input
            onChange={e => setHours(e.target.value)}
            value={hours}
            name="hours"
            // type="number"
            className="outline-none border-none w-12 text-center"
          />
          <Label className="mx-3 text-muted-foreground" htmlFor="hours">
            H
          </Label>
          <Input
            onChange={e => setMinutes(e.target.value)}
            value={minutes}
            // type="number"
            name="minutes"
            className="outline-none border-none w-12 text-center"
          />
          <Label className="mx-3 text-muted-foreground" htmlFor="minutes">
            M
          </Label>
          <div className="ml-4">{timeUntil(expiresIn)}</div>
        </div> 
      </div>
    </div>
  );
}