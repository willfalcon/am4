'use server';

import { auth } from "@/auth";
import { RouteFormData, RouteSchema } from "@/lib/zodSchemas";
import { prisma } from "@/prisma";
import { routesTag } from "./cache";
import { revalidateTag } from "next/cache";
import { Route } from "@prisma/client";

export async function createRoute(data: RouteFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  const validatedData = RouteSchema.parse(data);

  try {
    const route = await prisma.route.create({
      data: {
        ...validatedData,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        hub: {
          connect: {
            id: validatedData.hub.id,
          },
        },
        destination: {
          connect: {
            id: validatedData.destination.id
          }
        }
      },
    });

    revalidateTag(routesTag);
    return {
      success: true,
      route,
    };
  } catch (err) {
    console.error('Error creating route: ', err);
    return {
      success: false,
      error: 'Failed to create route.',
    };
  }
}


export async function editRoute(id: Route['id'], data: RouteFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  const validatedData = RouteSchema.parse(data);

  try {
    const route = await prisma.route.update({
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
        hub: {
          connect: {
            id: validatedData.hub.id,
          },
        },
        destination: {
          connect: {
            id: validatedData.destination.id,
          },
        },
      },
    });
    revalidateTag(routesTag);
    return {
      success: true,
      error: null,
      route,
    };
  } catch (err) {
    console.error('Error updating route: ', err);
    return {
      success: false,
      error: 'Failed to update route.',
    };
  }
}


export async function deleteRoute(id: Route['id']) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  try {
    await prisma.route.delete({
      where: {
        id,
        user: {
          is: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return {
      success: false,
      err: `Failed to delete route`,
    };
  }
}