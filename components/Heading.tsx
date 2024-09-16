import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Heading({children, className}: PropsWithChildren & {
  className?: string
}) {
  return (
    <h2 className={cn("font-bold text-xl my-2", className)}> 
      {children}
    </h2>
  )
}