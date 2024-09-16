'use server';

import { ModelFormData, ModelSchema } from "@/lib/zodSchemas";
import { prisma } from "@/prisma";
import { Model, Prisma } from "@prisma/client";
import { modelTag } from "./cache";
import { revalidateTag } from "next/cache";

type CreateModelInput = Prisma.ModelCreateInput;

export async function createModel(data: ModelFormData) {
  const validatedData = ModelSchema.parse(data);

  try {
    const newModel = await prisma.model.create({
      data: {
        ...validatedData,
        make: {
          connect: {
            id: validatedData.make?.id,
          },
        },
        discontinued: !!validatedData.discontinued,
      } as CreateModelInput,
    });
    revalidateTag(modelTag);
    return {
      success: true,
      model: newModel,
    };
  } catch (err) {
    console.error('Error creating model: ', err);
    return {
      success: false,
      error: 'Failed to create model.',
    };
  }
}


export async function editModel(id: Model['id'], data: ModelFormData) {
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
            id: validatedData.make?.id,
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

export async function deleteModel(id: Model['id']) {
  try {
    await prisma.model.delete({
      where: {
        id,
      },
    });
    revalidateTag(modelTag);
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      err: `Failed to delete model`,
    };
  }
}