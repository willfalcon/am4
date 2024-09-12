import ManufacturerCard from "@/components/Manufacturers/ManufacturerCard";
import { getManufacturers } from "@/lib/queries"

export default async function ManufacturersList() {
  
  const manufacturers = await getManufacturers();
  
  return (
    <div className="grid grid-cols-3 gap-2 mt-8">
      {manufacturers.map(manufacturer => (
        <ManufacturerCard key={manufacturer.id} {...manufacturer} />
      ))}
    </div>
  )
}