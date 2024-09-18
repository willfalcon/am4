'use client';

import { Button } from '@/components/ui/button';
import { Hub } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Check } from 'lucide-react';
import HubActionCell from './HubsActionCell';

export const hubsColumns: ColumnDef<Hub>[] = [
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
    accessorKey: 'airport',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Airport
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const airport: { name: string } = row.getValue('airport');
      return airport.name;
    },
  },
  {
    accessorKey: 'eventHub',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Event Hub
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const eventHub = row.getValue('eventHub');
      console.log(eventHub);
      return eventHub && <Check />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <HubActionCell {...row} />,
  },
];
