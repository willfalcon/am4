import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Manufacturer, Prisma } from "@prisma/client";
import { cache } from "react";

export async function getCountries() {
  return await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3').then(res => res.json());
}

export const getAirports = cache(async () => {
  return await prisma.airport.findMany();
});

export const getManufacturers = cache(async () => {
  return await prisma.manufacturer.findMany();
})


export const getModels = cache(async () => {
  return await prisma.model.findMany({
    include: {
      make: true
    }
  });
})

export const getPlanes = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      error: 'Not logged in',
      message: 'You must be logged in to do this.',
      planes: []
    }
  }

  const planes = await prisma.plane.findMany({
    where: {
      user: {
        is: {
          id: session.user.id
        }
      }
    },
    include: {
      model: true,
      route: true
    }
  });

  return {
    error: false,
    message: '',
    planes
  }
})

export const getRoutes = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      error: 'Not logged in',
      message: 'You must be logged in to do this.',
      routes: [],
    };
  }

  const routes = await prisma.route.findMany({
    where: {
      user: {
        is: {
          id: session.user.id,
        },
      },
      event: {
        not: {
          equals: true
        }
      }
    },
    include: {
      planes: true,
      hub: true,
      destination: true
    }
  });


  return {
    error: false,
    message: '',
    routes,
  };

});
export const getEvents = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      error: 'Not logged in',
      message: 'You must be logged in to do this.',
      events: [],
    };
  }

  const events = await prisma.route.findMany({
    where: {
      user: {
        is: {
          id: session.user.id,
        },
      },
      event: true
    },
    include: {
      planes: true,
      hub: true,
      destination: true
    }
  });


  return {
    error: false,
    message: '',
    events,
  };

});

export const getHubs = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      error: 'Not logged in',
      message: 'You must be logged in to do this.',
      hubs: [],
    };
  }

  const hubs = await prisma.hub.findMany({
    where: {
      user: {
        is: {
          id: session.user.id,
        },
      },
    },
    include: {
      airport: true
    },
  });

  return {
    error: false,
    message: '',
    hubs,
  };
});

export const getEventHubs = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      error: 'Not logged in',
      message: 'You must be logged in to do this.',
      hubs: [],
    };
  }

  const hubs = await prisma.hub.findMany({
    where: {
      user: {
        is: {
          id: session.user.id,
        },
      },
      eventHub: {
        equals: true
      }
    },
    include: {
      airport: true
    },
  });

  return {
    error: false,
    message: '',
    hubs,
  };
});