import { numberOrString } from '@/lib/zodSchemas';
import { z } from 'zod';

export const EventSchema = z.object({
  name: z.string().min(1).default(''),
  hub: z.object({
    id: z.string(),
    name: z.string(),
  }),
  destination: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    country: z.string(),
    city: z.string(),
    runway: z.number(),
    market: z.number(),
  }),
  event: z.boolean().optional().default(true),
  expires: z.string().datetime({ offset: true }).optional(),
  distance: numberOrString.default(''),
  yDemand: numberOrString.default(''),
  jDemand: numberOrString.default(''),
  fDemand: numberOrString.default(''),
});

export type EventFormData = z.infer<typeof EventSchema>;
