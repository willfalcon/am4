'use server';

import { prisma } from "@/prisma";
import { z } from "zod";
import { AirportSchema } from "@/lib/zodSchemas";
import { Prisma } from "@prisma/client";

import {airportsTag} from './cache';
import { revalidateTag } from "next/cache";

type CreateAirportInput = Prisma.AirportCreateInput;

export async function createAirport(data: z.infer<typeof AirportSchema>) {
  const validatedData = AirportSchema.parse(data);

  try {
    const newAirport = await prisma.airport.create({ data: validatedData as CreateAirportInput });
    revalidateTag(airportsTag);
    return {
      success: true,
      airport: newAirport,
    };
  } catch (err) {
    console.error('Error creating airport: ', err);
    return {
      success: false,
      error: 'Failed to create airport.',
    };
  }

}