'use client';

import Link from "next/link";
import Heading from "../Heading";
import { Button } from "../ui/button";
import { useHubsContext } from "../providers/HubsContext";

export default function RoutesMenu() {
  const {hubs} = useHubsContext();
  
  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Heading className="mb-2 px-4">Hubs</Heading>
          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={`/routes`}>All</Link>
            </Button> 
            {hubs.filter(hub => !hub.eventHub).map((hub) => (
              <Button asChild variant="ghost" key={hub.id} className="w-full justify-start">
                <Link href={`/routes/hub/${hub.id}`}>{hub.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}