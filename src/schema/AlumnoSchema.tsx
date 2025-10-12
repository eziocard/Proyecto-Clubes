import { z } from "zod";
export const grupos = ["Iniciación", "Preparación", "Alto Rendimiento"];
export const AlumnoSchema = z.object({
  nombre: z.string().min(1, { message: "Ingresar nombre del alumno" }),
  apellido: z.string().min(1, { message: "Ingresar apellido del alumno" }),
  rut: z.string().min(1, { message: "Ingresar Rut del alumno" }),
  edad: z.number().min(1, { message: "La edad debe ser mayor a 0" }),
  grupos: z.enum(grupos),
});
export type Alumno = z.infer<typeof AlumnoSchema>;
