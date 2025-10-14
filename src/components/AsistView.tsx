import { useContext, useMemo, useState } from "react";
import TableAsistencia from "./TableAsistencia";
import "./styles/AsistViewStyles.css";
import useAlumnos from "../hooks/useAlumnos";
import AlumnosContext from "../contexts/AlumnosContext";

type Props = {};

function AsistView({}: Props) {
  const [Iniciacion, setIniciacion] = useState(false);
  const [Preparacion, setPreparacion] = useState(false);
  const [AltoRem, setAltoRem] = useState(false);
  const { AlumnosList } = useContext(AlumnosContext);
  const asistencias = AlumnosList.map((alumno) => ({
    ...alumno,
    fecha: new Date(),
    check: false,
  }));

  const filtroGrupo = useMemo(() => {
    if (Iniciacion) return "Iniciación";
    if (Preparacion) return "Preparación";
    if (AltoRem) return "Alto Rendimiento";
    return null;
  }, [Iniciacion, Preparacion, AltoRem]);

  const asistenciasFiltradas = useMemo(() => {
    if (!filtroGrupo) return asistencias;
    return asistencias.filter((a) => a.grupos === filtroGrupo);
  }, [asistencias, filtroGrupo]);

  const handleFilter = (filtro: number) => {
    setIniciacion(filtro === 0);
    setPreparacion(filtro === 1);
    setAltoRem(filtro === 2);
  };

  return (
    <>
      <section id="inputs">
        <input type="date" />
      </section>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${Iniciacion ? "active" : ""}`}
              onClick={() => handleFilter(0)}
              aria-current="page"
              href="#"
            >
              Iniciación
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${Preparacion ? "active" : ""}`}
              aria-current="page"
              onClick={() => handleFilter(1)}
              href="#"
            >
              Preparación
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${AltoRem ? "active" : ""}`}
              aria-current="page"
              href="#"
              onClick={() => handleFilter(2)}
            >
              Alto Rendimiento
            </a>
          </li>
        </ul>
      </nav>
      <section id="section-asistencia">
        <TableAsistencia asistencias={asistenciasFiltradas} />
      </section>
    </>
  );
}

export default AsistView;
