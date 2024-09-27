import { z } from "zod";

export function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
}


export const numberOrString = z.preprocess(
  val => {
    // If the value is a string, return it trimmed, otherwise return the value as is
    if (typeof val === 'string') {
      return val.trim();
    }
    return val;
  },
  z
    .union([
      z
        .string()
        .min(1, 'Amount is required')
        .transform(val => {
          const parsedValue = parseFloat(val.replace(/[^\d.-]/g, ''));
          return isNaN(parsedValue) ? undefined : parsedValue;
        }),
      z.number(),
    ])
    .refine(val => typeof val === 'number' && !isNaN(val), { message: 'Enter a valid number' })
);

export const AirportSchema = z.object({
  code: z.string().default(''),
  name: z.string().default(''),
  country: z.string().default(''),
  city: z.string().default(''),
  runway: numberOrString.default(''),
  market: numberOrString.default(''),
});


export type AirportFormData = z.infer<typeof AirportSchema>;


export const ManufacturerSchema = z.object({
  name: z.string().optional(),
  lines: z.array(z.object({
    value: z.string()
  })).optional()
})


export type ManufacturerFormData = z.infer<typeof ManufacturerSchema>;



export const ModelSchema = z.object({ 
  name: z.string().min(1).default(''),
  make: z.object({
    id: z.string(),
    name: z.string(),
    lines: z.array(z.string())
  }).optional(),
  line: z.string().optional().default(''),
  price: numberOrString.default(''),
  discontinued: z.boolean().default(false).optional(),
  speed: numberOrString.default(''),
  pax: numberOrString.default(''),
  runway: numberOrString.default(''),
  checkCost: numberOrString.default(''),
  range: numberOrString.default(''),
  fuel: numberOrString.default(''),
  co2: numberOrString.default(''),
  checkTime: numberOrString.default(''),
});

export type ModelFormData = z.infer<typeof ModelSchema>; 

export const HubSchema = z.object({
  name: z.string().min(1).default(''),
  airport: z.object({
    id: z.string(),
    code: z.string(),
    name: z.string()
  }),
  eventHub: z.boolean().default(false).optional()
});

export type HubFormData = z.infer<typeof HubSchema>;