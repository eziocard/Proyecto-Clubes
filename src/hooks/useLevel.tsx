import { useState } from "react";
import { API_URL } from "../constants";
import { useAuth } from "../Auth/AuthProvider";
import type { Level } from "../schema/LevelsSchema";

function useLevel() {
  const { token } = useAuth();
  const [levels, setLevels] = useState<Level[]>([]);

  const crearLevel = async (data: Level) => {
    try {
      const res = await fetch(`${API_URL}/levels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          user_id: data.user_id,
          team_id: data.team_id,
        }),
      });

      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Error creando level:", error);
    }
  };

  const obtenerLevels = async () => {
    try {
      const res = await fetch(`${API_URL}/levels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setLevels(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      console.error("Error obteniendo levels:", error);
      return [];
    }
  };

  const editarLevel = async (id: number, data: Level) => {
    try {
      const res = await fetch(`${API_URL}/levels/${id}`, {
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
      console.error("Error editando level:", error);
    }
  };

  const eliminarLevel = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/levels/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Error eliminando level:", error);
    }
  };

  return {
    crearLevel,
    obtenerLevels,
    editarLevel,
    eliminarLevel,
    levels,
  };
}

export default useLevel;
