import { Model, Plane, Route } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Heading from "../Heading";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { getAvailableEventPlanes } from "@/lib/queries";
import { Dialog, DialogTrigger } from "../ui/dialog";
import PlaneDialog from "../planes/PlaneDialog";
import { useState } from "react";
import { PlaneWithRefs } from "@/lib/types";
import PlaneListItem from "./PlaneListItem";

type Props = {
  model: Model;
  route: Route;
  splits: {
    y: number;
    j: number;
    f: number;
  };
  net: number;
  duration: number;
  tripsToFulfillment: number;
  fulfillmentTime: number;
  possibleTrips: number;
  possibleEarnings: number;
}

function seconds(seconds: number): string {
  let hours = Math.floor(seconds/3600);
  let minutes = Math.floor((seconds%3600)/60);
  const minuteString = minutes < 10 ? '0' + minutes as string : minutes;
  
  return `${hours}:${minuteString}`;
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default async function ResearchModel({model, route, splits, net, duration, tripsToFulfillment, fulfillmentTime, possibleTrips, possibleEarnings}: Props) {

  const availablePlanes = await getAvailableEventPlanes(model.id);



  return (
    <Card>
      <CardHeader>
        <CardTitle>{model.name}</CardTitle>
        <CardDescription>{currency.format(model.price)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Heading h3>Splits</Heading>
        <div className="flex gap-2 divide-solid divide-x-2 space-x-2 text-center">
          <div className="px-2">
            <Heading h4>Y</Heading>
            <span className="text-sm text-muted-foreground">{splits.y}</span>
          </div>
          <div className="px-2">
            <Heading h4>J</Heading>
            <span className="text-sm text-muted-foreground">{splits.j}</span>
          </div>
          <div className="px-2">
            <Heading h4>F</Heading>
            <span className="text-sm text-muted-foreground">{splits.f}</span>
          </div>
        </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Trip Earnings</TableCell>
              <TableCell>{currency.format(net)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Trip Duration</TableCell>
              <TableCell>{seconds(duration)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Trips to Fulfillment</TableCell>
              <TableCell>{tripsToFulfillment}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fulfillment Time</TableCell>
              <TableCell>{seconds(fulfillmentTime)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Possible Trips in Day</TableCell>
              <TableCell>{possibleTrips}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Possible Earnings</TableCell>
              <TableCell>{currency.format(possibleEarnings)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {availablePlanes.planes.length > 0 ? (
          <>
            <Heading h3>Available Planes</Heading>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Y</TableHead>
                  <TableHead>J</TableHead>
                  <TableHead>F</TableHead>
                </TableRow>
                {availablePlanes.planes.map(plane => (
                  <PlaneListItem key={plane.id} plane={plane} route={route}/>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <Heading h3>No available planes</Heading>
        )}
      </CardContent>
    </Card>
  );
}
