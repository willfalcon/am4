import { auth } from "@/auth";
import Title from "@/components/Title";
import { getModels, getPlanes, getRoutes } from "@/lib/queries";
import { redirect } from "next/navigation";
import { planeColumns } from "../../components/planes/planeColumns";
import DataTable from "@/components/DataTable";
import NewPlaneForm from "../../components/planes/NewPlaneForm";
import PlanesContextProvider from "@/components/planes/PlanesContextProvider";
import RoutesProvider from "@/components/providers/RoutesContext";
import ModelsProvider from "@/components/providers/ModelsContext";
import Heading from "@/components/Heading";
import { UtensilsCrossed } from "lucide-react";
import { Model } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Planes() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }
  
  const planesRes = await getPlanes();
  const models = await getModels();
  const routes = await getRoutes();

  const ownedModels = models.filter(model => {
    return planesRes.planes.some(plane => plane.model.id === model.id);
  }).map(model => {
    const count = planesRes.planes.reduce((acc, cur) => {
      if (cur.model.id === model.id) {
        return acc + 1;
      }
      return acc;
    }, 0)
    return {
      ...model,
      count
    }
  });

  console.log(ownedModels)

  if (routes.error) {
    return <p className="container mx-auto max-w-full py-10">{routes.message}</p>;
  }
  if (planesRes.error) {
    return <p className="container mx-auto max-w-full py-10">
      {planesRes.message}
    </p>
  }

  return (
    <div className="container mx-auto max-w-full py-10">
      <Title>Planes</Title>

      <Heading>View by Model</Heading>

      <div className="grid grid-cols-6 gap-2">
        {ownedModels.map(model => (
          <Link key={model.id} href={`/planes/model/${model.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{model.name}</CardTitle>
                <CardDescription>
                  <span>{model.make?.name}</span>
                </CardDescription>
                  <p className="text-sm">Owned: {model.count}</p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <ModelsProvider models={models}>
        <RoutesProvider routes={routes.routes}>
          <DataTable columns={planeColumns} data={planesRes.planes} key="planes" />
          <NewPlaneForm />
        </RoutesProvider>
      </ModelsProvider>
    </div>
  );
}