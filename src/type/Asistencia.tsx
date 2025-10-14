import type { Alumno } from "../schema/AlumnoSchema";

export type Asistencia = Alumno & {
  fecha: Date;
  check?: boolean;
};
