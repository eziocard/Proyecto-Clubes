import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  rut: z.string().min(1, "El RUT es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  lastname: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  team_id: z.number().nullable().optional(),
  role: z.enum(["superuser", "teacher", "team_admin"]),
});

export default UserSchema;
