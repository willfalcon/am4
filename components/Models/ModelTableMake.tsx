import { forwardRef, useState } from 'react';
import PlaneDialog from '../planes/PlaneDialog';
import { Badge, BadgeProps } from '../ui/badge';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { Manufacturer } from '@prisma/client';
import ManufacturerDialog from '../manufacturers/ManufacturerDialog';


export default function ModelTableMake(manufacturer: Manufacturer) {
  const [open, setOpen] = useState(false);
  console.log(manufacturer)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {manufacturer.name}
      </DialogTrigger>
      <ManufacturerDialog manufacturer={manufacturer} setOpen={setOpen} />
    </Dialog>
  );
}
