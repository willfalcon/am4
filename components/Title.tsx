import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Title({children, className}: PropsWithChildren<{className?: string}>) {
  return (
    <h1 className={cn("font-bold text-2xl", className)}>{children}</h1>
  )
}