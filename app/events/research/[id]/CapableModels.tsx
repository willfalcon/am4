import ResearchModel from "@/components/research/ResearchModel";
import { Model, Route } from "@prisma/client";
import { getEarnings, getSplits } from "./researchFunctions";
import ModelsContextProvider from "@/components/models/ModelsContextProvider";

type Props = {
  models: Model[];
  route: Route;
}



export default function CapableModels({models, route}: Props) {

  const capableModels = models.map(model => {
    const splits = getSplits(model.pax, route);
    const { y, j, f } = splits;

    const earnings = getEarnings(route.distance, splits)
    const fuelCost = model.fuel * 850 / 1000 * route.distance;
    const quotas = model.pax * route.distance * model.co2;
    const co2Cost = quotas / route.distance * 145 / 1000;
    const kmPerCheck = model.speed * model.checkTime;
    const checkCostPerKm = model.checkCost / kmPerCheck;
    const checkCost = checkCostPerKm * route.distance; 
    const net = earnings - fuelCost - co2Cost - checkCost;

    const duration = route.distance / model.speed * 3600;
    const tripsToFulfillment = Math.ceil(route.fDemand / f);
    const fulfillmentTime = tripsToFulfillment * duration;
    const possibleTrips = Math.floor((24 * 60 * 60) / duration);
    const possibleEarnings = net * possibleTrips;
    return {
      model,
      splits,
      net,
      duration,
      tripsToFulfillment,
      fulfillmentTime,
      possibleTrips,
      possibleEarnings
    }
  });

  return (
    <ul className="grid grid-cols-3 gap-2">
      {capableModels.sort((a, b) => b.possibleEarnings - a.possibleEarnings).map(({model, ...data}) => (
        <li key={model.id}>
          <ResearchModel model={model} {...data} route={route} />
        </li>
      ))}
    </ul>
  );
}
