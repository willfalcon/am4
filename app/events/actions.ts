'use server';

import { auth } from "@/auth";
import { EventFormData, EventSchema } from "@/components/events/eventSchema";
import { prisma } from "@/prisma";
import { revalidateTag } from "next/cache";
import { eventsTag } from "./cache";
import { Route } from "@prisma/client";

export async function createEvent(data: EventFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  const validatedData = EventSchema.parse(data);

  try {
    const route = await prisma.route.create({
      data: {
        ...validatedData,
        event: true,
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
            id: validatedData.destination.id,
          },
        },
      },
    });

    revalidateTag(eventsTag);
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



export async function editEvent(id: Route['id'], data: EventFormData) {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to do this.',
    };
  }

  const validatedData = EventSchema.parse(data);

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
    revalidateTag(eventsTag);
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

export async function deleteEvent(id: Route['id']) {
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
    revalidateTag(eventsTag);
    return {
      success: true,
      error: null
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      err: `Failed to delete route`,
    };
  }
}