'use server';

import { ModelSchema } from "@/lib/zodSchemas";
import { prisma } from "@/prisma";
import { Model, Prisma } from "@prisma/client";
import { z } from "zod";
import { modelTag } from "./cache";
import { revalidateTag } from "next/cache";

type CreateModelInput = Prisma.ModelCreateInput;
type ModelType = z.infer<typeof ModelSchema>;

export async function createModel(data: ModelType) {
  const validatedData = ModelSchema.parse(data);

  console.log(validatedData);
  
  
  try {
    const newModel = await prisma.model.create({
      data: {
        ...validatedData,
        make: {
          connect: {
            id: validatedData.make
          }
        },
        discontinued: !!validatedData.discontinued
      } as CreateModelInput
    });
    revalidateTag(modelTag);
    return {
      success: true,
      model: newModel,
    };
    
  } catch(err) {
    console.error('Error creating model: ', err);
    return {
      success: false,
      error: 'Failed to create model.',
    };
  }
}


export async function editModel(id: Model['id'], data: ModelType) {
  const validatedData = ModelSchema.parse(data);
  try {
    const model = await prisma.model.update({
      where: {
        id,
      },
      data: {
        ...validatedData,
        make: {
          connect: {
            id: validatedData.make,
          },
        },
        discontinued: !!validatedData.discontinued,
      },
    });
    revalidateTag(modelTag);
    return {
      success: true,
      model,
    };
  } catch (err) {
    console.error('Error updating model: ', err);
    return {
      success: false,
      error: 'Failed to update model.',
    };
  }
}