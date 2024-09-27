'use server';

import { auth } from "@/auth";

import { prisma } from "@/prisma";
import { Plane, Prisma } from "@prisma/client";
import { planesTag } from "./cache";
import { revalidateTag } from "next/cache";
import { PlaneFormData, PlaneSchema } from "@/components/planes/planeSchema";

type CreatePlaneInput = Prisma.PlaneCreateInput;
type UpdatePlaneInput = Prisma.PlaneUpdateInput;

export async function createPlane(data: PlaneFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false, 
      error: 'You must be logged in to do this.'
    }
  }

  const validatedData = PlaneSchema.parse(data);
  const {model, route} = validatedData;
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
            id: model.id,
          },
        },
        ...(route && {
          route: {
            connect: {
              id: route.id,
            },
          },
        }),
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

  const {model, route, ...restData} = validatedData;

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
        ...restData,
        model: {
          connect: { id: model.id },
        },
        ...(route ? { route: { connect: { id: route.id } } } : { route: { disconnect: true } }),
      } as UpdatePlaneInput,
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