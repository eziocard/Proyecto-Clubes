import { useState } from "react";
import "./styles/DashboardStyles.css";
import AsistView from "../components/AsistView";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InscripcionView from "../components/InscripcionView";
import GestionAlum from "../components/GestionAlum";
type Props = {};

function Dashboard({}: Props) {
  const [asistencia, setAsistencia] = useState(false);
  const [anuncios, setAnuncios] = useState(false);
  const [horarios, setHorarios] = useState(false);
  const [Gestionar, setGestionar] = useState(false);
  const handleClick = (fila: number) => {
    setAsistencia(fila === 0);
    setAnuncios(fila === 1);
    setHorarios(fila === 2);
    setGestionar(fila === 3);
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
              anuncios ? "action" : " "
            }`}
            onClick={() => handleClick(1)}
          >
            Anuncios
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-${
              horarios ? "action" : " "
            }`}
            onClick={() => handleClick(2)}
          >
            Horarios
          </button>
          <button
            type="button"
            className={`list-group-item list-group-item-${
              Gestionar ? "action" : " "
            }`}
            onClick={() => handleClick(3)}
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
        {asistencia ? (
          <AsistView />
        ) : Gestionar ? (
          <GestionAlum />
        ) : (
          "Seleccione una opción"
        )}
      </main>
    </section>
  );
}

export default Dashboard;
