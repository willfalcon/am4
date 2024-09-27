'use client';

import PlaneDialog from "@/components/planes/PlaneDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlaneWithRefs } from "@/lib/types";
import { Route } from "@prisma/client";
import { useState } from "react";

export default function RoutedPlane({plane, route}: {plane: PlaneWithRefs, route: Route}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{plane.name}</DialogTrigger>
      <PlaneDialog plane={plane} setOpen={setOpen} route={route} />
    </Dialog>
  );
}