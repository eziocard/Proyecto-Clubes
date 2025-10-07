import React from "react";
import TableAsistencia from "./TableAsistencia";
import "./styles/AsistViewStyles.css";

type Props = {};

function AsistView({}: Props) {
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
      <section id="section-asistencia">
        <TableAsistencia />
      </section>
    </>
  );
}

export default AsistView;
