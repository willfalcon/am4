import { forwardRef, useState } from "react";
import PlaneDialog from "../planes/PlaneDialog";
import { Badge, BadgeProps } from "../ui/badge";
import { Dialog, DialogTrigger } from "../ui/dialog";

import { PlaneWithRefs } from "@/lib/types";

function getVariant(status: string) {
  switch (status) {
    case 'groundedToHub':
    case 'groundedToEvent':
      return 'destructive';
    case 'pending':
    case 'maintenance':
      return 'secondary';
    case 'routed':
    default:
      return 'default';
  }
}

export default function EventTablePlane({plane}: {plane: PlaneWithRefs }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge variant={getVariant(plane.status)}>{plane.name}</Badge>
      </DialogTrigger>
      <PlaneDialog plane={plane} setOpen={setOpen} />
    </Dialog>
  );
}
