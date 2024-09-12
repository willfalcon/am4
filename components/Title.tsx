import { PropsWithChildren } from "react";

export default function Title({children}: PropsWithChildren) {
  return (
    <h1 className="font-bold text-2xl">{children}</h1>
  )
}