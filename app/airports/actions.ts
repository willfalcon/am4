'use server';

import { prisma } from "@/prisma";
import { z } from "zod";
import { AirportFormData, AirportSchema } from "@/lib/zodSchemas";
import { Airport, Prisma } from "@prisma/client";

import {airportsTag} from './cache';
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

type CreateAirportInput = Prisma.AirportCreateInput;

export async function createAirport(data: z.infer<typeof AirportSchema>) {

  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  if (session.user.role !== 'ADMIN') {
    return {
      success: false,
      error: 'You must be an admin to do this.'
    }
  }

  const validatedData = AirportSchema.parse(data);
  const existing = await prisma.airport.findFirst({
    where: {
      code: validatedData.code
    }
  });
  if (existing) {
    return {
      success: false, 
      error: 'Airport already exists',
      airport: existing
    }
  }
  try {
    const newAirport = await prisma.airport.create({ data: validatedData as CreateAirportInput });
    revalidateTag(airportsTag);
    return {
      success: true,
      error: null,
      airport: newAirport,
    };
  } catch (err) {
    console.error('Error creating airport: ', err);
    return {
      success: false,
      error: 'Failed to create airport.',
      airport: null
    };
  }

}


export async function editAirport(id: Airport['id'], data: AirportFormData) {

  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  if (session.user.role !== 'ADMIN') {
    return {
      success: false,
      error: 'You must be an admin to do this.',
    };
  }

  const validatedData = AirportSchema.parse(data);

  try {
    const hub = await prisma.airport.update({
      where: {
        id,
      },
      data: {
        ...validatedData,
      },
    });
    revalidateTag(airportsTag);

    return {
      success: true,
      error: null,
      hub,
    };
  } catch (err) {
    console.error('Error updating airport: ', err);
    return {
      success: false,
      error: 'Failed to update airport.',
    };
  }
}

export async function deleteAirport(id: Airport['id']) {
  
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  if (session.user.role !== 'ADMIN') {
    return {
      success: false,
      error: 'You must be an admin to do this.',
    };
  }

  try {
    await prisma.airport.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      success: false,
      err: `Failed to delete airport.`,
    };
  }
}