import { auth } from "@/auth";

import DataTable from "@/components/DataTable";
import NewRouteForm from "@/components/routes/NewRouteForm";
import { routeColumns } from "@/components/routes/routeColumns";
import RoutesTable from "@/components/routes/RoutesTable";
import Title from "@/components/Title";

import {getRoutes } from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function Routes() {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  const routesRes = await getRoutes();
  
  if (routesRes.error) {
    <p className="container mx-auto max-w-full py-10">{routesRes.message}</p>;
  }
  
  
  return (
    <>
      <Title>Routes</Title>
      <RoutesTable columns={routeColumns} data={routesRes.routes} key="routes" />
      <NewRouteForm />
    </>
  );
}