import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { Hub, Manufacturer, Prisma, Route } from "@prisma/client";
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

export const getPlanesByModel = cache(async (id: string) => {
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
      },
      model: {
        id
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
      OR: [
        {event: false},
        {event: null}
      ]
    },
    include: {
      planes: true,
      hub: true,
      destination: true,
    },
  });


  return {
    error: false,
    message: '',
    routes,
  };

});

export const getHubRoutes = cache(async (id: Hub['id']) => {
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
      hub: {
        is: {
          id
        }
      },
      OR: [
        {event: false},
        {event: null}
      ]
    },
    include: {
      planes: true,
      hub: true,
      destination: true,
    },
  });


  return {
    error: false,
    message: '',
    routes,
  };

});

export const getAllRoutes = cache(async () => {
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
    },
    include: {
      planes: true,
      hub: true,
      destination: true,
    },
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
      planes: {
        include: {
          model: true,
          route: true
        }
      },
      hub: {
        include: {
          airport: true
        }
      },
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

export const getHub = cache(async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'You must be logged in to do this.',
      route: null
    };
  }

  const hub = await prisma.hub.findUnique({
    where: {
      id,
      user: {
        is: {
          id: session.user.id
        }
      }
    }
  });

  if (!hub) {
    return {
      success: false,
      message: 'Hub not found.',
      route: null,
    };
  } 

  return {
    success: true,
    message: '',
    hub,
  };
})

export const getRoute = cache(async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
      message: 'You must be logged in to do this.',
      route: null
    };
  }

  const route = await prisma.route.findUnique({
    where: {
      id,
      user: {
        is: {
          id: session.user.id
        }
      }
    },
    include: {
      destination: true,
      hub: {
        include: {
          airport: true
        }
      },
      planes: {
        include: {
          model: true,
          route: true
        }
      }
    }
  });

  if (!route) {
    return {
      success: false,
      message: 'Route not found.',
      route: null
    }
  } 
  
  return {
    success: true,
    message: '',
    route
  };
})

export const getAvailableEventPlanes = cache(async (modelId: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      success: false,
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
      },
      modelId,
      eventPlane: true,
      OR: [
        {route: null},
        {route: {
          expires: {
            lte: new Date()
          }
        }}
      ]
    },
    include: {
      model: true,
      route: true
    }
  })

  return {
    success: true,
    message: '',
    planes
  }
})  