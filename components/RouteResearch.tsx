'use client';

import { Route } from "@prisma/client";
import Research from "./research/ResearchModel";

type Props = {
  routes: Route[]
}
export default function RouteResearch({routes}: Props) {
  console.log(routes);

  return (
    <div className="grid grid-cols-3">
      {routes.map(route => <Research key={route.id} {...route} />)}
    </div>
  )
}