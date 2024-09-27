import { auth } from "@/auth";
import Title from "@/components/Title";
import { getRoute } from "@/lib/queries";
import { MoveRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ResearchRoute({params}: {params: { id: string }}) {
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }


  const {route, success, message} = await getRoute(params.id);
  if (!success || !route){
    return (
      <>
      <Title>Something went wrong.</Title>
      <p>{message}</p>
      </>
    )
  }

  const number = new Intl.NumberFormat('en-US');

  return (
    <>
      <Title>{route.name}</Title>
      <p className="flex items-center gap-2">
        {route.hub.name} <MoveRight /> {route.destination?.code}
      </p>
      <p>{number.format(route.distance)} km</p>
      <p>Y: {route.yDemand} - J: {route.jDemand} - F: {route.fDemand}</p>
    </>
  );

}