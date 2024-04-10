import { z } from "zod";

export const palette = z.object({
  color1: z.string(),
  color2: z.string(),
  color3: z.string(),
  color4: z.string(),
  tags: z
    .string()
    .transform((value) =>
      value.split(",").map((value) => value.trim().toLowerCase()),
    )
    .pipe(z.string().min(1).array()),
  createdAt: z.date(),
});

export type Palette = z.infer<typeof palette>;
