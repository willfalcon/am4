import { prisma } from "@/prisma";
import { Manufacturer, Prisma } from "@prisma/client";
import { cache } from "react";

export const getAirports = cache(async () => {
  return await prisma.airport.findMany();
});

export const getManufacturers = cache(async () => {
  return await prisma.manufacturer.findMany();
})


export const getModels = cache(async () => {
  return await prisma.model.findMany({
    include: {
      make: true
    }
  });
})