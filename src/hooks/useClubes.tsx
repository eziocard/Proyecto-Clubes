import React from "react";
import type { Team } from "../schema/clubesSchema";
import { API_URL } from "../auth/constants";
import { useAuth } from "../auth/AuthProvider";

function useClubes() {
  const auth = useAuth();

  const crearClub = async (data: Team) => {
    console.log(auth.token);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // <---- IMPORTANTE
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          state: true,
          image: null,
        }),
      });

      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Error creando club:", error);
    }
  };

  return { crearClub };
}

export default useClubes;
