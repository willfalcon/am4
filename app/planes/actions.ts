'use server';

import { auth } from "@/auth";
import { PlaneFormData, PlaneSchema } from "@/lib/zodSchemas";
import { prisma } from "@/prisma";
import { Plane, Prisma } from "@prisma/client";
import { planesTag } from "./cache";
import { revalidateTag } from "next/cache";

type CreatePlaneInput = Prisma.PlaneCreateInput;

export async function createPlane(data: PlaneFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false, 
      error: 'You must be logged in to do this.'
    }
  }

  const validatedData = PlaneSchema.parse(data);

  try {
    const newPlane = await prisma.plane.create({
      data: {
        ...validatedData,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        model: {
          connect: {
            id: validatedData.model?.id,
          },
          route: {
            connect: {
              id: validatedData.route.id,
            },
          },
        },
      } as CreatePlaneInput,
    });

    revalidateTag(planesTag);
    return {
      success: true,
      model: newPlane,
    };

  } catch (err) {

    console.error('Error creating model: ', err);
    return {
      success: false,
      error: 'Failed to create model.',
    };

  }

}

export async function editPlane(id: Plane['id'], data: PlaneFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  const validatedData = PlaneSchema.parse(data);

  try {

    const plane = await prisma.plane.update({
      where: {
        id,
        user: {
          is: {
            id: session.user.id,
          },
        },
      },
      data: {
        ...validatedData,
        model: {
          connect: {
            id: validatedData.model.id
          }
        },
        route: {
          connect: {
            id: validatedData.route.id
          }
        }
      },
    });
    revalidateTag(planesTag);
    return {
        success: true,
        error: null,
        plane
      }
  } catch(err) {
    console.error('Error updating plane: ', err);
    return {
      success: false,
      error: 'Failed to update plane.',
    };
  }
}

export async function deletePlane(id: Plane['id']) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  try {
    await prisma.plane.delete({
      where: {
        id,
        user: {
          is: {
            id: session.user.id
          }
        }
      }
    })
  } catch(err) {
    console.error(err);
    return {
      success: false,
      err: `Failed to delete plane`,
    };
  }
}