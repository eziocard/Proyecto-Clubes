import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import useStudent from "../hooks/useStudent";
import useTeam from "../hooks/useTeam";
import type { Student } from "../schema/studentsSchema";

import { useAuth } from "../Auth/AuthProvider";
import useAttendance from "../hooks/useAttendance";

function Attendance() {
  const { user } = useUser();
  const { token } = useAuth();
  const { attendances, loading, crearAttendance } = useAttendance(token || "");
  const { obtenerStudents } = useStudent();
  const { obtenerTeams } = useTeam();

  const [students, setStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | "">("");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    const cargarData = async () => {
      const data = await obtenerStudents();
      setStudents(Array.isArray(data) ? data : []);
      setAllStudents(Array.isArray(data) ? data : []);

      if (user?.role === "superuser") {
        const t = await obtenerTeams();
        setTeams(Array.isArray(t) ? t : []);
      }
    };
    cargarData();
  }, []);

  const handleFilter = () => {
    if (selectedTeam === "") {
      setStudents(allStudents);
    } else {
      setStudents(allStudents.filter((s) => s.team_id === selectedTeam));
    }
  };

  const handleToggle = async (student: Student, present: boolean) => {
    if (!student.rut) return;

    await crearAttendance({
      student_rut: student.rut,
      level_id: student.level_id || 0,
      present,
      date,
    });
  };

  return (
    <section id="inscripcion-section">
      <h1>Asistencia de Estudiantes</h1>

      <div className="form-group mb-3">
        <label>Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control"
        />
      </div>

      {user?.role === "superuser" && (
        <div className="form-group mb-3">
          <label>Filtrar por Team</label>
          <div className="d-flex">
            <select
              value={selectedTeam}
              onChange={(e) =>
                setSelectedTeam(e.target.value ? Number(e.target.value) : "")
              }
              className="form-control me-2"
            >
              <option value="">Todos</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleFilter}>
              Filtrar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Cargando estudiantes...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre</th>
              <th>Nivel</th>
              <th>Presente</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const attendanceToday = attendances.find(
                (a) => a.student_rut === s.rut && a.date.startsWith(date)
              );
              return (
                <tr key={s.rut}>
                  <td>{s.rut}</td>
                  <td>
                    {s.name} {s.lastname}
                  </td>
                  <td>{s.level_id}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={attendanceToday?.present || false}
                      onChange={(e) => handleToggle(s, e.target.checked)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Attendance;
