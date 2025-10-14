import React, { useState } from "react";
import type { Alumno } from "../schema/AlumnoSchema";
import { Trash2 } from "lucide-react";
import "./styles/EliminarStyles.css";
type Props = {
  Buscar: (rut: string) => Alumno | undefined;
  Eliminar: (rut: string) => void;
};

function ELiminarView({ Buscar, Eliminar }: Props) {
  const [rutBuscar, setRutBuscar] = useState("");
  const [alumno, setAlumno] = useState<Alumno | undefined>();

  const handleBuscar = () => {
    const encontrado = Buscar(rutBuscar);
    if (encontrado) {
      setAlumno(encontrado);
    } else {
      alert("Alumno no encontrado");
    }
  };

  const handleEliminar = (data: Alumno) => {
    if (alumno) {
      Eliminar(alumno.rut);
      setAlumno(undefined);
      alert("Alumno Eliminado");
    }
  };

  return (
    <section id="eliminar-section">
      <h1>ELiminar Alumno</h1>
      <input
        type="text"
        placeholder="Ingresar RUT '12345678-9'"
        value={rutBuscar}
        onChange={(e) => setRutBuscar(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>
      {alumno && (
        <table className="table">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{alumno.rut}</th>
              <th>{alumno.nombre}</th>
              <th>{alumno.apellido}</th>
              <th id="borrar-icon">
                <Trash2 onClick={() => handleEliminar(alumno)} />
              </th>
            </tr>
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ELiminarView;
