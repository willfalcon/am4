import { Manufacturer } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

import EditManufacturer from "./EditManufacturer";

export default async function ManufacturerCard(manufacturer: Manufacturer) {
  const { name, lines } = manufacturer;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="font-bold">Lines</h3>
        <ul>
          {lines?.map(line => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-end">
        <EditManufacturer manufacturer={manufacturer} />
      </CardFooter>
    </Card>
  );
}