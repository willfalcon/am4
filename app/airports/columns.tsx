'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Airport } from '@prisma/client';

export const columns: ColumnDef<Airport>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'runway',
    header: 'Runway',
  },
  {
    accessorKey: 'market',
    header: 'Market',
  },
];