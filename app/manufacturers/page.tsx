import Title from "@/components/Title";
import ManufacturersList from "./ManufacturersList";
import NewManufacturerForm from "@/components/manufacturers/NewManufacturerForm";

export default function Manufacturers() {
  return (
    <div className="container w-content mx-auto max-w-full py-10">
      <Title>Manufacturers</Title>
      <ManufacturersList />
      <NewManufacturerForm />
    </div>
  );
}