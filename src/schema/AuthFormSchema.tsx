import { z } from "zod";

export const AuthLoginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Ingresa tu nombre de usuario" })
    .trim(),
  contraseña: z.string().min(1, { message: "Ingresa tu contraseña" }),
});
export type AuthLogin = z.infer<typeof AuthLoginSchema>;
export const AuthRegisterSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Ingresa tu nombre de usuario" })
    .trim(),
  nombre_club: z.string().min(1, "El nombre es obligatorio"),
  direccion: z.string().min(1, "La Direccion es obligatoria"),
  email: z.string().email("Correo electrónico inválido"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  admin: z.boolean().optional(),
});

export type AuthRegister = z.infer<typeof AuthRegisterSchema>;
