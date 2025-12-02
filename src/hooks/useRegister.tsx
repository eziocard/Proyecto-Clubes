import { useAuth } from "../Auth/AuthProvider";
import { API_URL } from "../constants";
import type { User } from "../types/types";

function useRegister() {
  const auth = useAuth();

  const registrarUser = async (data: User) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.error("Error registrando usuario:", error);
    }
  };

  const obtenerUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      return [];
    }
  };

  const editarUser = async (rut: string, data: Partial<User>) => {
    try {
      const res = await fetch(`${API_URL}/users/${rut}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.error("Error editando usuario:", error);
    }
  };

  const eliminarUser = async (rut: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${rut}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  return {
    registrarUser,
    obtenerUsers,
    editarUser,
    eliminarUser,
  };
}

export default useRegister;
