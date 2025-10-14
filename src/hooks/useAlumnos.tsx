import { useState } from "react";
import type { Alumno } from "../schema/AlumnoSchema";

function useAlumnos() {
  const [AlumnosList, setAlumnosList] = useState<Alumno[]>([]);

  const Inscribir = (data: Alumno): boolean => {
    const existe = AlumnosList.some((a) => a.rut === data.rut);
    if (existe) {
      return false;
    }

    setAlumnosList((prev) => [...prev, data]);
    return true;
  };

  const Editar = (rut: string, datosActualizados: Partial<Alumno>) => {
    setAlumnosList((prev) =>
      prev.map((alumno) =>
        alumno.rut === rut ? { ...alumno, ...datosActualizados } : alumno
      )
    );
  };

  const Eliminar = (rut: string) => {
    setAlumnosList((prev) => prev.filter((alumno) => alumno.rut !== rut));
  };

  const Buscar = (rut: string): Alumno | undefined => {
    return AlumnosList.find((alumno) => alumno.rut === rut);
  };

  return { AlumnosList, Inscribir, Editar, Eliminar, Buscar };
}

export default useAlumnos;
