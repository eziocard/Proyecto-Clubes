import { useState } from "react";
import "./styles/EditarStyles.css";
import InscripcionView from "./InscripcionView";
import type { Alumno } from "../schema/AlumnoSchema";
type Props = {
  Buscar: (rut: string) => Alumno | undefined;
  Editar: (rut: string, datos: Partial<Alumno>) => void;
};

function EditarView({ Buscar, Editar }: Props) {
  const [rutBuscar, setRutBuscar] = useState("");
  const [alumno, setAlumno] = useState<Alumno | undefined>();

  const handleBuscar = () => {
    const encontrado = Buscar(rutBuscar);
    setAlumno(encontrado);
  };

  const handleEditar = (data: Alumno) => {
    if (alumno) {
      Editar(alumno.rut, data);
      setAlumno(undefined);
    }
  };

  return (
    <section id="editar-section">
      <h2>Buscar por Rut</h2>
      <input
        type="text"
        placeholder="Buscar RUT"
        value={rutBuscar}
        onChange={(e) => setRutBuscar(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      {alumno && (
        <div>
          <InscripcionView alumnoInicial={alumno} onSubmitForm={handleEditar} />
        </div>
      )}
    </section>
  );
}

export default EditarView;
