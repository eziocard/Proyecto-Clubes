import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import type { Student } from "../schema/studentsSchema";

export interface AttendanceData {
  id: number;
  student_rut: string;
  user_id: number;
  level_id: number;
  present: boolean;
  date: string;
  student?: Student;
}

export default function useAttendance(token: string) {
  const [attendances, setAttendances] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(false);

  const obtenerAttendances = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/attendances`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAttendances(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error obteniendo asistencias:", error);
    } finally {
      setLoading(false);
    }
  };

  const crearAttendance = async (attendance: {
    student_rut: string;
    level_id: number;
    present: boolean;
    date: string;
  }) => {
    try {
      const res = await fetch(`${API_URL}/attendances`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(attendance),
      });
      const data = await res.json();
      await obtenerAttendances();
      return data;
    } catch (error) {
      console.error("Error creando asistencia:", error);
    }
  };

  useEffect(() => {
    if (token) obtenerAttendances();
  }, [token]);

  return { attendances, loading, obtenerAttendances, crearAttendance };
}
