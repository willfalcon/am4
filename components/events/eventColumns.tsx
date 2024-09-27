'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown,  MoreHorizontal } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { Airport, Hub, Plane, Route } from '@prisma/client';
import {  formatDistanceToNow, } from 'date-fns';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { Dialog } from '../ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import HubActionCell from '../hubs/HubDialog';
import AirportDialog from '../airports/AirportDialog';
import EventDialog from './EventDialog';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import EventTablePlane from './EventTablePlane';
import { PlaneWithRefs } from '@/lib/types';

const number = new Intl.NumberFormat('en-US');

export function planeStatusText(status: string) {
  switch (status) {
    case 'groundedToHub':
      return 'Grounded to Hub';
    case 'groundedToEvent':
      return 'Grounded to Event';
    case 'pending':
      return 'Pending';
    case 'maintenance':
      return 'Maintenance';
    case 'routed':
      return 'Routed';
    default:
      return '';
  }
}

export const eventColumns: ColumnDef<Route>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select All"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <Link href={`/events/research/${row.original.id}`}>{row.getValue('name')}</Link>;
    },
  },
  {
    accessorKey: 'hub',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Hub
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: cell => {
      const { row } = cell;
      const hub: Hub = row.getValue('hub');
      return (
        <Dialog>
          <DialogTrigger>{hub.name}</DialogTrigger>
          <HubActionCell {...hub} />
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'destination',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Destination
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const destination: Airport = row.getValue('destination');
      return (
        <Dialog>
          <DialogTrigger>{destination.code}</DialogTrigger>
          <AirportDialog {...destination} />
        </Dialog>
      );
    },
  },
  {
    accessorKey: 'planes',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Planes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const planes: PlaneWithRefs[] = row.getValue('planes');
      const route = row.original;
      
      return (
        <div>{planes.map(plane => {
          return (
            <TooltipProvider key={plane.id}>
              <Tooltip>
                <TooltipTrigger>
                  <EventTablePlane plane={plane} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{planeStatusText(plane.status)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}</div>
      )
    }
  },
  {
    accessorKey: 'expires',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Expires In
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const expires: Date = row.getValue('expires');

      if (expires <= new Date()) {
        return 'Expired';
      }
      return formatDistanceToNow(expires);
    },
  },
  {
    accessorKey: 'distance',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Distance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const distance: number = row.getValue('distance');
      return number.format(distance) + 'km';
    },
  },
  {
    accessorKey: 'yDemand',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Y Demand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const demand: number = row.getValue('yDemand');
      return number.format(demand);
    },
  },
  {
    accessorKey: 'jDemand',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          J Demand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const demand: number = row.getValue('jDemand');
      return number.format(demand);
    },
  },
  {
    accessorKey: 'fDemand',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          F Demand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const demand: number = row.getValue('fDemand');
      return number.format(demand);
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const event: Route = row.original;

      const [open, setOpen] = useState(false);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <EventDialog event={event} setOpen={setOpen} />
        </Dialog>
      );
    },
  },
];