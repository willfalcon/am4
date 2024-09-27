'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Airport } from '@prisma/client';
import { Button } from '../ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogTrigger } from '../ui/dialog';
import AirportDialog from './AirportDialog';

const number = new Intl.NumberFormat('en-US');

export const airportColumns: ColumnDef<Airport>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
  },
  {
    accessorKey: 'country',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          City
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'runway',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Runway
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const runway: number = row.getValue('runway');
      return number.format(runway);
    },
  },
  {
    accessorKey: 'market',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Market
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const market: number = row.getValue('market');
      return `${market}%`;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const airport: Airport = row.original;
      // console.log(airport)
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <AirportDialog {...airport} />
        </Dialog>
      );
    },
  },
];