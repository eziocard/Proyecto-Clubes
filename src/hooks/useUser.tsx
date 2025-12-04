import { useState } from "react";
import type { User } from "../types/types";
import { useAuth } from "../Auth/AuthProvider";
import {API_URL} from "../constants";
export default function useUser() {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const InfoUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al obtener usuario");
      }

      setUser(data);
    } catch (err: any) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { InfoUser, user, loading, error };
}
