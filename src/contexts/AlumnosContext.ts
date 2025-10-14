import { createContext } from "react";
import type { Alumno } from "../schema/AlumnoSchema";

type AlumnosContextType = {
    AlumnosList: Alumno[];
    Inscribir: (data: Alumno) => boolean;
    Editar: (rut: string, datos: Partial<Alumno>) => void;
    Eliminar: (rut: string) => void;
    Buscar: (rut: string) => Alumno | undefined;
}
export default createContext<AlumnosContextType>({} as AlumnosContextType)