'use server';

import { auth } from "@/auth";
import { HubFormData, HubSchema } from "@/lib/zodSchemas";
import { prisma } from "@/prisma";
import { Hub, Prisma } from "@prisma/client";
import { hubsTag } from "./cache";
import { revalidateTag } from "next/cache";


export async function createHub(data: HubFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  const validatedData = HubSchema.parse(data);

  try {
    const newHub = await prisma.hub.create({
      data: {
        ...validatedData,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        airport: {
          connect: {
            id: validatedData.airport?.id,
          },
        },
      }
    });

    revalidateTag(hubsTag);
    return {
      success: true,
      model: newHub,
    };
  } catch (err) {
    console.error('Error creating hub: ', err);
    return {
      success: false,
      error: 'Failed to create hub.',
    };
  }
}

export async function editHub(id: Hub['id'], data: HubFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  const validatedData = HubSchema.parse(data);

  try {
    const hub = await prisma.hub.update({
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
        airport: {
          connect: {
            id: validatedData.airport.id,
          },
        },
      },
    });
    revalidateTag(hubsTag);
    return {
      success: true,
      error: null,
      hub,
    };
  } catch (err) {
    console.error('Error updating hub: ', err);
    return {
      success: false,
      error: 'Failed to update hub.',
    };
  }
}

export async function deleteHub(id: Hub['id']) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  try {
    await prisma.hub.delete({
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
      err: `Failed to delete hub`,
    };
  }
}