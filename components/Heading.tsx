import { PropsWithChildren } from "react";

export default function Heading({children}: PropsWithChildren) {
  return (
    <h2 className="font-bold text-xl">
      {children}
    </h2>
  )
}