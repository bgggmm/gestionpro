import * as z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Mínimo 2 caracteres"),

  email: z.email(),
});

export type ProfileValues = z.infer<
  typeof profileSchema
>;