import { useContext, useState } from "react";
import InscripcionView from "./InscripcionView";
import EditarView from "./EditarView";

import type { Alumno } from "../schema/AlumnoSchema";
import ELiminarView from "./ELiminarView";
import AlumnosContext from "../contexts/AlumnosContext";
import { boolean } from "zod";

function GestionAlum() {
  const [inscribir, setInscribir] = useState(true);
  const [editar, setEditar] = useState(false);
  const [eliminar, setEliminar] = useState(false);

  const {
    AlumnosList,
    Inscribir: inscribiralumno,
    Editar,
    Buscar,
    Eliminar,
  } = useContext(AlumnosContext);
  const handleFilter = (filtro: number) => {
    setInscribir(filtro === 0);
    setEditar(filtro === 1);
    setEliminar(filtro === 2);
  };

  const handleInscribirForm = (data: Alumno) => {
    const agregado = inscribiralumno(data);

    if (agregado) {
      alert("Alumno inscrito correctamente!");
    } else {
      alert("Error el alumno ya está inscrito.");
    }
  };

  return (
    <>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${inscribir ? "active" : ""}`}
              onClick={() => handleFilter(0)}
              aria-current="page"
              href="#"
            >
              Inscribir
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${editar ? "active" : ""}`}
              aria-current="page"
              onClick={() => handleFilter(1)}
              href="#"
            >
              Editar
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${eliminar ? "active" : ""}`}
              aria-current="page"
              href="#"
              onClick={() => handleFilter(2)}
            >
              Eliminar
            </a>
          </li>
        </ul>
      </nav>

      <section>
        {inscribir ? (
          <InscripcionView onSubmitForm={handleInscribirForm} />
        ) : editar ? (
          <EditarView Buscar={Buscar} Editar={Editar} />
        ) : eliminar ? (
          <ELiminarView Buscar={Buscar} Eliminar={Eliminar} />
        ) : (
          "Seleccione una opción"
        )}
      </section>
    </>
  );
}

export default GestionAlum;
