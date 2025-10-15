import { useState } from "react";
import "./styles/DashboardStyles.css";
import AsistView from "../components/AsistView";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GestionAlum from "../components/GestionAlum";
import AlumnosContext from "../contexts/AlumnosContext";
import useAlumnos from "../hooks/useAlumnos";

type Props = {};

function Dashboard({}: Props) {
  const [asistencia, setAsistencia] = useState(false);
  const { AlumnosList, Buscar, Editar, Eliminar, Inscribir } = useAlumnos();
  const [Gestionar, setGestionar] = useState(false);
  const handleClick = (fila: number) => {
    setAsistencia(fila === 0);

    setGestionar(fila === 1);
  };
  const navigate = useNavigate();

  return (
    <section id="section-dashboard">
      <aside>
        <div className="list-group">
          <button
            type="button"
            className={`list-group-item list-group-item-${
              asistencia ? "action" : " "
            }`}
            aria-current="true"
            onClick={() => handleClick(0)}
          >
            Asistencia
          </button>

          <button
            type="button"
            className={`list-group-item list-group-item-${
              Gestionar ? "action" : " "
            }`}
            onClick={() => handleClick(1)}
          >
            Gestion Alumnos
          </button>

          <button
            className="backbtn"
            id="btn-dsh"
            onClick={() => navigate("/")}
          >
            <CircleX /> Cerrar Sesion
          </button>
        </div>
      </aside>
      <main>
        <AlumnosContext.Provider
          value={{ AlumnosList, Buscar, Editar, Eliminar, Inscribir }}
        >
          {asistencia ? (
            <AsistView />
          ) : Gestionar ? (
            <GestionAlum />
          ) : (
            "Seleccione una opción"
          )}
        </AlumnosContext.Provider>
      </main>
    </section>
  );
}

export default Dashboard;
