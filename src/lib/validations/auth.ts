import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nombre requerido"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<
  typeof registerSchema
>;