import { useAuth } from "../Auth/AuthProvider";
import { API_URL } from "../constants";
import type { Student } from "../schema/studentsSchema";

function useStudent() {
  const auth = useAuth();

  const crearStudent = async (data: Student) => {
    try {
      const res = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(data),
      });

      return await res.json();
    } catch (error) {
      console.error("Error creando estudiante:", error);
    }
  };

  const buscarStudent = async (query: string) => {
    try {
      const res = await fetch(`${API_URL}/students/search?search=${query}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return await res.json();
    } catch (error) {
      console.error("Error buscando estudiantes:", error);
      return [];
    }
  };

  const obtenerStudent = async (rut: string) => {
    try {
      const res = await fetch(`${API_URL}/students/${rut}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return await res.json();
    } catch (error) {
      console.error("Error obteniendo estudiante:", error);
    }
  };

  const editarStudent = async (rut: string, data: Partial<Student>) => {
    try {
      const res = await fetch(`${API_URL}/students/${rut}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(data),
      });

      return await res.json();
    } catch (error) {
      console.error("Error editando estudiante:", error);
    }
  };

  const eliminarStudent = async (rut: string) => {
    try {
      const res = await fetch(`${API_URL}/students/${rut}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return await res.json();
    } catch (error) {
      console.error("Error eliminando estudiante:", error);
    }
  };

  const obtenerStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/students`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return await res.json();
    } catch (error) {
      console.error("Error trayendo estudiantes:", error);
      return [];
    }
  };

  return {
    crearStudent,
    buscarStudent,
    obtenerStudent,
    editarStudent,
    eliminarStudent,
    obtenerStudents,
  };
}

export default useStudent;
