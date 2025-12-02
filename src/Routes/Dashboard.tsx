import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useAuth } from "../Auth/AuthProvider";
import TeamRegister from "../components/TeamRegister";
import "./styles/DashboardStyle.css";
import LevelRegister from "../components/LevelRegister";
import StudentRegister from "../components/StudentRegister";
import UserRegister from "../components/UserRegister";
import Attendance from "../components/Attendance";
function Dashboard() {
  const { logout } = useAuth();
  const { InfoUser, user, loading, error } = useUser();
  const [asistencia, setAsistencia] = useState(false);
  const [GestionarAlumnos, setGestionarAlumnos] = useState(false);
  const [RegistrarClubes, setRegistrarClubes] = useState(false);
  const [RegistrarUsuarios, setRegistrarUsuarios] = useState(false);
  const [RegistrarNiveles, setRegistrarNiveles] = useState(false);

  useEffect(() => {
    InfoUser();
  }, []);

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No hay usuario</p>;

  /**  <div>
      <h1>Bienvenido {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>*/

  const handleClick = async (fila: number) => {
    setAsistencia(fila === 0);
    setGestionarAlumnos(fila === 1);
    setRegistrarClubes(fila === 2);
    setRegistrarUsuarios(fila === 3);
    setRegistrarNiveles(fila === 4);
  };
  return (
    <section>
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
              GestionarAlumnos ? "action" : " "
            }`}
            onClick={() => handleClick(1)}
          >
            Gestion Alumnos
          </button>
          {user?.role === "superuser" && (
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
          {(user?.role === "superuser" || user?.role === "team") && (
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

          {(user?.role === "superuser" || user?.role === "team") && (
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
          <button className="backbtn" id="btn-dsh" onClick={() => logout()}>
            Cerrar Sesion
          </button>
        </div>
      </aside>
      <main>
        {GestionarAlumnos ? (
          <StudentRegister />
        ) : RegistrarClubes ? (
          <TeamRegister />
        ) : RegistrarNiveles ? (
          <LevelRegister />
        ) : RegistrarUsuarios ? (
          <UserRegister />
        ) : asistencia ? (
          <Attendance />
        ) : (
          `Seleccione una opción ${user?.name}`
        )}
      </main>
    </section>
  );
}

export default Dashboard;
