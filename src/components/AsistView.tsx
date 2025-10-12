import { useState } from "react";
import TableAsistencia from "./TableAsistencia";
import "./styles/AsistViewStyles.css";

type Props = {};

function AsistView({}: Props) {
  const [Iniciacion, setIniciacion] = useState(false);
  const [Preparacion, setPreparacion] = useState(false);
  const [AltoRem, setAltoRem] = useState(false);

  const handleFilter = (filtro: number) => {
    setIniciacion(filtro === 0);
    setPreparacion(filtro === 1);
    setAltoRem(filtro === 2);
  };
  return (
    <>
      <section id="inputs">
        <input type="date" />
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="buscador"
            placeholder="Buscar alumno"
          />
        </div>
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
        <TableAsistencia />
      </section>
    </>
  );
}

export default AsistView;
