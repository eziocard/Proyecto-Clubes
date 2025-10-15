import { useContext, useMemo, useState } from "react";
import TableAsistencia from "./TableAsistencia";
import "./styles/AsistViewStyles.css";
import AlumnosContext from "../contexts/AlumnosContext";
import type { Alumno } from "../schema/AlumnoSchema";

function AsistView() {
  const [Iniciacion, setIniciacion] = useState(false);
  const [Preparacion, setPreparacion] = useState(false);
  const [AltoRem, setAltoRem] = useState(false);
  const hoy = new Date();
  const today = hoy.toISOString().split("T")[0];

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(today);
  const [registro, setRegistro] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const { AlumnosList } = useContext(AlumnosContext);

  const filtroGrupo = useMemo(() => {
    if (Iniciacion) return "Iniciación";
    if (Preparacion) return "Preparación";
    if (AltoRem) return "Alto Rendimiento";
    return null;
  }, [Iniciacion, Preparacion, AltoRem]);

  const alumnosFiltrados = useMemo(() => {
    if (!filtroGrupo) return AlumnosList;
    return AlumnosList.filter((a) => a.grupos === filtroGrupo);
  }, [AlumnosList, filtroGrupo]);

  const asistenciasActuales = useMemo(() => {
    const registroFecha = registro[fechaSeleccionada] || {};
    return alumnosFiltrados.map((alumno) => ({
      ...alumno,
      check: registroFecha[alumno.rut] ?? false,
    }));
  }, [alumnosFiltrados, registro, fechaSeleccionada]);

  const handleFilter = (filtro: number) => {
    setIniciacion(filtro === 0);
    setPreparacion(filtro === 1);
    setAltoRem(filtro === 2);
  };

  const handleCheckChange = (rut: string, valor: boolean) => {
    if (!fechaSeleccionada) return alert("Selecciona una fecha primero.");
    setRegistro((prev) => ({
      ...prev,
      [fechaSeleccionada]: {
        ...prev[fechaSeleccionada],
        [rut]: valor,
      },
    }));
  };

  const handleConfirmar = () => {
    if (!fechaSeleccionada)
      return alert("Selecciona una fecha antes de confirmar.");
    alert(` Asistencia del ${fechaSeleccionada} guardada correctamente.`);
    console.log("Registro completo:", registro);
  };

  return (
    <>
      <section id="inputs">
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
        />
      </section>

      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${Iniciacion ? "active" : ""}`}
              onClick={() => handleFilter(0)}
              href="#"
            >
              Iniciación
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${Preparacion ? "active" : ""}`}
              onClick={() => handleFilter(1)}
              href="#"
            >
              Preparación
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${AltoRem ? "active" : ""}`}
              onClick={() => handleFilter(2)}
              href="#"
            >
              Alto Rendimiento
            </a>
          </li>
        </ul>
      </nav>

      <section id="section-asistencia">
        <TableAsistencia
          asistencias={asistenciasActuales}
          onCheckChange={handleCheckChange}
        />
      </section>
      <button
        className="btn btn-primary mt-3"
        onClick={handleConfirmar}
        disabled={!fechaSeleccionada}
      >
        Confirmar asistencia
      </button>
    </>
  );
}

export default AsistView;
