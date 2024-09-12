import { z } from "zod";

export const AirportSchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  runway: z.coerce.number().optional(),
  market: z.coerce.number().optional(),
});

export const ManufacturerSchema = z.object({
  name: z.string().optional(),
  lines: z.array(z.object({
    value: z.string()
  })).optional()
})

export const ModelSchema = z.object({ 
  name: z.string(),
  make: z.string(),
  line: z.string().optional(),
  price: z.coerce.number(),
  discontinued: z.boolean().default(false).optional(),
  speed: z.coerce.number(),
  pax: z.coerce.number(),
  runway: z.coerce.number(),
  checkCost: z.coerce.number(),
  range: z.coerce.number(),
  fuel: z.coerce.number(),
  co2: z.coerce.number(),
  checkTime: z.coerce.number(),
});