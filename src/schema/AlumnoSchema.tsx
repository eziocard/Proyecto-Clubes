import { z } from "zod";
export const grupos = ["Iniciación", "Preparación", "Alto Rendimiento"];
export const AlumnoSchema = z.object({
  name: z.string().min(1, { message: "Ingresar nombre del alumno" }),
  lastname: z.string().min(1, { message: "Ingresar apellido del alumno" }),
  rut: z.string().min(1, { message: "Ingresar Rut del alumno" }),
  age: z.number().min(1, { message: "La edad debe ser mayor a 0" }),
  level: z.number().int().positive().nullable().optional(),
  team_id: z.number().int().positive().nullable().optional(),
});
export type Alumno = z.infer<typeof AlumnoSchema>;
