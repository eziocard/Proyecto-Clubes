import { useState } from "react";
import type { Team } from "../schema/clubesSchema";
import { API_URL } from "../constants";
import { useAuth } from "../Auth/AuthProvider";

function useTeam() {
  const { token } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);

  // Crear club
  const crearClub = async (data: Team) => {
    try {
      const res = await fetch(`${API_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          state: data.state,
        }),
      });

      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Error creando club:", error);
    }
  };

  // Obtener todos los equipos
  const obtenerTeams = async () => {
    console.log(token);
    try {
      const res = await fetch(`${API_URL}/teams`);
      const data = await res.json();
      setTeams(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      console.error("Error obteniendo teams:", error);
      return [];
    }
  };

  // Editar club
  const editarClub = async (id: number, data: Team) => {
    try {
      const res = await fetch(`${API_URL}/teams/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Error editando club:", error);
    }
  };

  const eliminarClub = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/teams/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Error eliminando club:", error);
    }
  };

  return { crearClub, obtenerTeams, editarClub, eliminarClub, teams };
}

export default useTeam;
