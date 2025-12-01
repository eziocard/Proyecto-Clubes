import { useState } from "react";
import "./styles/DashboardStyles.css";
import AsistView from "../components/AsistView";
import { CircleX } from "lucide-react";

import GestionAlum from "../components/GestionAlum";
import AlumnosContext from "../contexts/AlumnosContext";
import useAlumnos from "../hooks/useAlumnos";
import { useAuth } from "../auth/AuthProvider";
import RegistrarClubesView from "../components/RegistrarClubesView";
import RegistrarProfesorView from "../components/RegistrarUsuariosView";
import RegistrarUsuariosView from "../components/RegistrarUsuariosView";
import RegistrarNivelView from "../components/RegistrarNivelView";

type Props = {};

function Dashboard({}: Props) {
  const auth = useAuth();

  const [asistencia, setAsistencia] = useState(false);
  const { AlumnosList, Buscar, Editar, Eliminar, Inscribir } = useAlumnos();
  const [Gestionar, setGestionar] = useState(false);
  const [RegistrarClubes, setRegistrarClubes] = useState(false);
  const [RegistrarUsuarios, setRegistrarUsuarios] = useState(false);
  const [RegistrarNiveles, setRegistrarNiveles] = useState(false);
  const handleClick = (fila: number) => {
    setAsistencia(fila === 0);
    setGestionar(fila === 1);
    setRegistrarClubes(fila === 2);
    setRegistrarUsuarios(fila === 3);
    setRegistrarNiveles(fila === 4);
  };

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
          {auth.getUser()?.role === "superuser" && (
            <button
              type="button"
              className={`list-group-item list-group-item-${
                RegistrarClubes ? "action" : " "
              }`}
              onClick={() => handleClick(2)}
            >
              Registrar Clubes
            </button>
          )}
          {(auth.getUser()?.role === "superuser" ||
            auth.getUser()?.role === "team_admin") && (
            <button
              type="button"
              className={`list-group-item list-group-item-${
                RegistrarUsuarios ? "action" : " "
              }`}
              onClick={() => handleClick(3)}
            >
              Registrar Usuarios
            </button>
          )}

          {(auth.getUser()?.role === "superuser" ||
            auth.getUser()?.role === "team_admin") && (
            <button
              type="button"
              className={`list-group-item list-group-item-${
                RegistrarNiveles ? "action" : " "
              }`}
              onClick={() => handleClick(4)}
            >
              Crear Niveles
            </button>
          )}
          <button
            className="backbtn"
            id="btn-dsh"
            onClick={() => auth.logout()}
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
          ) : RegistrarClubes ? (
            <RegistrarClubesView />
          ) : RegistrarUsuarios ? (
            <RegistrarUsuariosView />
          ) : RegistrarNiveles ? (
            <RegistrarNivelView />
          ) : (
            `Seleccione una opción ${auth.getUser()?.name}`
          )}
        </AlumnosContext.Provider>
      </main>
    </section>
  );
}

export default Dashboard;
