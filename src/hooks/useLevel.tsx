import React, { useEffect } from "react";
import type { Team } from "../schema/clubesSchema";
import { API_URL } from "../constants";
import { useAuth } from "../Auth/AuthProvider";
import type { Level } from "../schema/LevelsSchema";

function useLevel() {
  const { token } = useAuth();

  const crearLevel = async (data: Level) => {
    console.log(token);
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
      console.log(json);
      return json;
    } catch (error) {
      console.error("Error creando club:", error);
    }
  };

  return { crearLevel };
}

export default useLevel;
