import { Prisma } from "@prisma/client";

export type CountryOption = {
  name: {
    common: string;
    nativeName: {
      eng: {
        common: string;
        official: string;
      };
    };
    official: string;
  };
  cca2: string;
  cca3: string;
};


export type RouteWithRefs = Prisma.RouteGetPayload<{
  include: {
    destination: true;
    hub: true;
  }
}>

export type PlaneWithRefs = Prisma.PlaneGetPayload<{
  include: {
    route: true;
    model: true;
  };
}>;