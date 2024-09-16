import { auth } from "@/auth";
import Title from "@/components/Title";
import { getModels, getPlanes, getRoutes } from "@/lib/queries";
import { redirect } from "next/navigation";
import { planeColumns } from "../../components/planes/planeColumns";
import DataTable from "@/components/DataTable";
import NewPlaneForm from "../../components/planes/NewPlaneForm";
import PlanesContextProvider from "@/components/planes/PlanesContextProvider";
import RoutesProvider from "@/components/routes/RoutesContext";

export default async function Planes() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }
  
  const planesRes = await getPlanes();
  const models = await getModels();
  const routes = await getRoutes();

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
      <PlanesContextProvider models={models}>
        <RoutesProvider routes={routes.routes}>
          <DataTable columns={planeColumns} data={planesRes.planes} />
          <NewPlaneForm />
        </RoutesProvider>
      </PlanesContextProvider>
    </div>
  );
}