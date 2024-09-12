'use server';

import { ManufacturerSchema } from "@/lib/zodSchemas";
import { prisma } from "@/prisma";
import { Manufacturer, Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { manufacturerTag } from "./cache";

type CreateManufacturerInput = Prisma.ManufacturerCreateInput;

export async function createManufacturer(data: z.infer<typeof ManufacturerSchema>) {
  const validatedData = ManufacturerSchema.parse(data);

  const create = {
    name: validatedData.name,
    lines: {set: validatedData.lines?.map(line => line.value),}
  };

  try {
    const newManufacturer = await prisma.manufacturer.create({ data: create as CreateManufacturerInput })
    revalidateTag(manufacturerTag);
    return {
      success: true,
      manufacturer: newManufacturer
    }
  } catch(err) {
    console.error('Error creating manufacturer: ', err);
    return {
      success: false,
      error: 'Failed to create manufacturer.'
    }
  }
}

export async function editManufacturer(id: Manufacturer['id'], data: z.infer<typeof ManufacturerSchema>) {
  const {name, lines} = ManufacturerSchema.parse(data);
  
  try {
    const manufacturer = await prisma.manufacturer.update({
      where: {
        id
      },
      data: {
        name,
        lines: {
          set: lines?.map(line => line.value)
        }
      }
    });
    revalidateTag(manufacturerTag)
    return {
      success: true,
      manufacturer
    }
  } catch(err) {
    console.error('Error updating manufacturer: ', err);
    return {
      success: false,
      error: 'Failed to update manufacturer.',
    };
  }
}

export async function deleteManufacturer(id: Manufacturer['id']) {
  try {
    await prisma.manufacturer.delete({
      where: {
        id
      }
    });
    revalidateTag(manufacturerTag);
    return {
      success: true
    }
  } catch(err) {
    console.error(err)
    return {
      success: false,
      err: `Failed to delete manufacturer`
    }
  }
}