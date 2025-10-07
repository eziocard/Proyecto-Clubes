import { useState } from "react";
import "./styles/AuthStyles.css";
import { useForm } from "react-hook-form";
import {
  AuthLoginSchema,
  AuthRegisterSchema,
  type AuthLogin,
  type AuthRegister,
} from "../schema/AuthFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Table from "../components/TableClubes";

import gimasialogo from "./../assets/Clubes/Gimnasia temuco.png";
import tornadologo from "./../assets/Clubes/Tornado Temuco.png";
import defaultlogo from "./../assets/Clubes/default.png";
import { CircleX } from "lucide-react";
function Auth() {
  const [admin, setAdmin] = useState(true);

  const [clubes, setClubes] = useState<AuthRegister[]>([
    {
      nombre_club: "Tornado Temuco",
      contraseña: "123456789",
      email: "tornado@gmail.com",
      username: "tornado",
      admin: false,
      imagen: tornadologo,
      activo: true,
    },
    {
      nombre_club: "Gimnasia Olimpica Temuco",
      contraseña: "123456789",
      email: "gimnasia@gmail.com",
      username: "gimnasia",
      admin: false,
      imagen: gimasialogo,
      activo: true,
    },
  ]);
  const [showTable, setShowTable] = useState(false);
  const {
    register: registerSignup,
    handleSubmit: handleSignup,
    reset: resetSignup,
    formState: { errors: errorsSignup },
  } = useForm<AuthRegister>({
    resolver: zodResolver(AuthRegisterSchema),
    defaultValues: { imagen: defaultlogo, admin: false, activo: true },
  });
  const {
    register: registerLogin,
    handleSubmit: handleLogin,
    reset: resetLogin,
    formState: { errors: errorsLogin },
  } = useForm<AuthLogin>({
    resolver: zodResolver(AuthLoginSchema),
  });

  const onSubmitSignup = (data: AuthRegister) => {
    let imagenString = defaultlogo;

    if (data.imagen instanceof FileList && data.imagen[0]) {
      imagenString = URL.createObjectURL(data.imagen[0]);
    } else if (typeof data.imagen === "string" && data.imagen) {
      imagenString = data.imagen;
    }

    const nuevoClub: AuthRegister = {
      ...data,
      imagen: imagenString,
    };

    setClubes([...clubes, nuevoClub]);
    resetSignup();
  };
  console.log(clubes);
  const onSubmitLogin = (data: AuthLogin) => {
    if (data.username === "admin" && data.contraseña === "admin") {
      setAdmin(true);
      console.log("Login exitoso:", data);
    } else {
      console.log("Usuario o contraseña incorrectos");
    }
    resetLogin();
  };
  const cambiarEstado = (username: string) => {
    setClubes(
      clubes.map((club) =>
        club.username === username ? { ...club, activo: !club.activo } : club
      )
    );
  };
  return (
    <section id="auth-section">
      {!admin ? (
        <section id="admin-section">
          <h2>Clubes Deportivos</h2>
          <p>
            Gestiona tu club deportivo aprovechando todas nuestras herramientas
          </p>
          <p>
            Si deseas contratar nuestro servicio de manera personalizada
            contactanos a : rjlopezdiaz@gmail.com
          </p>
        </section>
      ) : (
        <section id="signup-section">
          <h1 className="title">Registrar Club</h1>

          <form onSubmit={handleSignup(onSubmitSignup)}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar username"
                {...registerSignup("username")}
              />
            </div>
            {errorsSignup.username && (
              <p className="error-text">{errorsSignup.username.message}</p>
            )}

            <div className="input-group mb-3">
              <span className="input-group-text">Nombre del Club</span>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar Nombre del Club"
                {...registerSignup("nombre_club")}
              />
              <span className="input-group-text">Imagen</span>
              <input
                type="File"
                id="upload-img"
                accept="image/png"
                className="form-control"
                {...registerSignup("imagen")}
              />
            </div>
            {(errorsSignup.nombre_club || errorsSignup.imagen) && (
              <div className="error-group">
                {errorsSignup.nombre_club && (
                  <p className="error-text">
                    {errorsSignup.nombre_club.message}
                  </p>
                )}
              </div>
            )}

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                Correo
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Correo electrónico"
                {...registerSignup("email")}
              />
            </div>
            {errorsSignup.email && (
              <p className="error-text">{errorsSignup.email.message}</p>
            )}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                Contraseña
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresar Contraseña"
                {...registerSignup("contraseña")}
              />
            </div>
            {errorsSignup.contraseña && (
              <p className="error-text">{errorsSignup.contraseña.message}</p>
            )}
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Registrar Club
              </button>
            </div>
          </form>
        </section>
      )}

      {admin ? (
        <section id="admin-mode-section">
          <h1 className="title">Modo administrador</h1>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-3"
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? "Ocultar Lista" : "Ver Lista de Clubes"}
            </button>
          </div>
          <div>
            {showTable ? (
              <Table data={clubes} funcion={cambiarEstado} />
            ) : (
              <button className="backbtn" onClick={() => setAdmin(!admin)}>
                <CircleX /> Cerrar Sesion
              </button>
            )}
          </div>
        </section>
      ) : (
        <section id="signin-section">
          <h1 className="title">Iniciar Sesión</h1>
          <form onSubmit={handleLogin(onSubmitLogin)}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Username
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresar username"
                {...registerLogin("username")}
              />
            </div>
            {errorsLogin.username && (
              <p className="error-text-login">{errorsLogin.username.message}</p>
            )}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Contraseña
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresar Contraseña"
                {...registerLogin("contraseña")}
              />
            </div>
            {errorsLogin.contraseña && (
              <p className="error-text-login">
                {errorsLogin.contraseña.message}
              </p>
            )}
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Ingresar
              </button>
            </div>
          </form>
        </section>
      )}
    </section>
  );
}

export default Auth;
