import * as z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Mínimo 3 caracteres"),

  description: z.string().optional(),

  status: z.string(),
});

export type TaskValues = z.infer<
  typeof taskSchema
>;