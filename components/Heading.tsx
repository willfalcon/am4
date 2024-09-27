import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
};

export default function Heading({children, className, h3 = false, h4 = false, h5 = false, h6 = false}: Props) {
  
  if (h3) {
    return (
      <h3 className={cn('font-semibold text-xl my-2', className)}> 
        {children}
      </h3>
    )
  }
  if (h4) {
    return (
      <h3 className={cn('font-semibold my-2', className)}> 
        {children}
      </h3>
    )
  }
  if (h5) {
    return (
      <h3 className={cn('font-semibold my-2', className)}> 
        {children}
      </h3>
    )
  }
  if (h6) {
    return (
      <h3 className={cn('font-semibold my-2', className)}> 
        {children}
      </h3>
    )
  }
  return <h2 className={cn('font-bold text-xl my-2', className)}>{children}</h2>;
}