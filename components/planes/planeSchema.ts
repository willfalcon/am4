import { numberOrString } from "@/lib/zodSchemas";
import { z } from "zod";

export const PlaneSchema = z.object({
  name: z.string().min(1).default(''),
  model: z.object({
    id: z.string(),
    name: z.string(),
  }),
  eventPlane: z.boolean().default(false).optional(),
  route: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable().optional(),
  y: numberOrString.default(''),
  j: numberOrString.default(''),
  f: numberOrString.default(''),
  status: z.enum(['routed', 'groundedToHub', 'groundedToEvent', 'pending', 'maintenance']).default('pending'),
});

export type PlaneFormData = z.infer<typeof PlaneSchema>;
