'use client';

import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Dialog, DialogTrigger } from "../ui/dialog";
import PlaneDialog from "../planes/PlaneDialog";
import { PlaneWithRefs } from "@/lib/types";
import { Route } from "@prisma/client";

export default function PlaneListItem({ plane, route }: { plane: PlaneWithRefs, route: Route }) {
  const [open, setOpen] = useState(false)
  return (
    <TableRow>
      <TableCell>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>{plane.name}</DialogTrigger>
          <PlaneDialog plane={plane} setOpen={setOpen} route={route} />
        </Dialog>
      </TableCell>
      <TableCell>{plane.y}</TableCell>
      <TableCell>{plane.j}</TableCell>
      <TableCell>{plane.f}</TableCell>
    </TableRow>
  );
}