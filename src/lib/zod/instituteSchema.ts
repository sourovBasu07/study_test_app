import { z } from "zod";

export const aboutSchema = z.object({
  instituteName: z.string(),
  about: z.string(),
  city: z.string(),
  address: z.string(),
  establishYear: z.number(),
});
