import { prisma } from "@/prisma";
import { Model, Prisma, Route } from "@prisma/client";

type RouteWithRefs = Prisma.RouteGetPayload<{
  include: {
    destination: true;
    hub: {
      include: {
        airport: true
      }
    }
  };  
}>;

export async function getCapableModels(route: RouteWithRefs) {
  const destRunway = route.destination?.runway;
  if (!destRunway) {
    return {
      error: 'Destination airport runway is not specified',
      models: null,
    };
  }
  const hubRunway = route.hub.airport.runway;
  const minRunway = destRunway < hubRunway ? destRunway : hubRunway;
  const distance = route.distance;

  const capableModels: Model[] = await prisma.model.findMany({
    where: {
      runway: {
        lte: minRunway,
      },
      range: {
        gte: distance,
      },
    },
  });
  return { error: null, models: capableModels };
}


type Splits = {
  y: number;
  j: number;
  f: number;
}
export function getSplits(pax: number, {yDemand, jDemand, fDemand}: Route): Splits {
  const den = (yDemand + (2 * jDemand) + (3 * fDemand));

  const y = Math.floor((pax * yDemand) / den);
  const j = Math.floor((pax * jDemand) / den);
  const f = Math.floor((pax * fDemand) / den);
  return {y, j, f};
};

export function getEarnings(distance: number, splits: Splits) {
  return distance * ((splits.y / 3) + (splits.j / 6) + splits.f);
}

export function getFuelCost(fuel: number, distance: number) {
  return fuel * 850 / 1000 * distance;
}