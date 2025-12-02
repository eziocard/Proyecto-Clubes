import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(1, { message: "Ingresa tu contraseña" }),
});
export type LoginType = z.infer<typeof LoginSchema>;
