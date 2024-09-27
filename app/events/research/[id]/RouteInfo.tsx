'use client';

import AirportDialog from "@/components/airports/AirportDialog";
import Heading from "@/components/Heading";
import Title from "@/components/Title";
import { Dialog } from "@/components/ui/dialog";
import { RouteWithRefs } from "@/lib/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { MoveRight } from "lucide-react";

const number = new Intl.NumberFormat('en-US');

export default function RouteInfo({route}: {route: RouteWithRefs}) {
  return (
    <div>
      <Title>{route.name}</Title>
      <p className="flex items-center gap-2">
        {route.hub.name} <MoveRight />{' '}
        <Dialog>
          {route.destination ? (
            <>
              <DialogTrigger>{route.destination.code}</DialogTrigger>
              <AirportDialog {...route.destination} />
            </>
          ) : (
            '???'
          )}
        </Dialog>
      </p>
      <p>
        <span>Distance: </span>
        <span className="font-bold">{number.format(route.distance)} km</span>
      </p>
      <p>
        <span>Demand: </span>
        <span className="font-bold">
          Y: {route.yDemand} - J: {route.jDemand} - F: {route.fDemand}
        </span>
      </p>
      {route.expires && (
        <p>
          <span>Expires: </span>
          <span className="font-bold">
          {route.expires <= new Date() ? ('Expired') : formatDistanceToNow(route.expires)}
          </span>
        </p>
      )}
    </div>
  );
}