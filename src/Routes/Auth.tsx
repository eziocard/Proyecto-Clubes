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

import defaultlogo from "./../assets/Clubes/default.png";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";

function Auth() {
  const auth = useAuth();
  const goTo = useNavigate();
  const [ErrorResponse, setErrorResponse] = useState("");

  const [admin, setAdmin] = useState(false);
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

    resetSignup();
  };

  // LOGIN CORREGIDO PARA LARAVEL
  async function onSubmitLogin(data: AuthLogin) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setErrorResponse("");

        if (json.token) {
          auth.saveUser(json);
          goTo("/dashboard");
        }
      } else {
        setErrorResponse(json.message);
      }
    } catch (error) {
      console.log("Error en login:", error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <section id="auth-section">
        {!admin ? (
          <section id="admin-section">
            <h2>Clubes Deportivos</h2>
            <p>
              Gestiona tu club deportivo aprovechando todas nuestras
              herramientas
            </p>
            <p>
              Si deseas contratar nuestro servicio de manera personalizada
              contactanos a : rjlopezdiaz@gmail.com
            </p>
            <p>Link del código en Github</p>
            <a
              href="https://github.com/eziocard/Proyecto-Clubes"
              style={{ color: "red", fontSize: "20px" }}
            >
              Github
            </a>
          </section>
        ) : (
          <section id="signup-section">
            <h1 className="title">Registrar Club</h1>

            <form onSubmit={handleSignup(onSubmitSignup)}>
              <div className="input-group mb-3">
                <span className="input-group-text">@</span>
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
                  accept="image/png"
                  className="form-control"
                  {...registerSignup("imagen")}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Correo</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo electrónico"
                  {...registerSignup("email")}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Contraseña</span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresar Contraseña"
                  {...registerSignup("contraseña")}
                />
              </div>

              <button type="submit" className="btn btn-primary mb-3">
                Registrar Club
              </button>
            </form>
          </section>
        )}

        {!admin ? (
          <section id="signin-section">
            <h1 className="title">Iniciar Sesión</h1>
            <form onSubmit={handleLogin(onSubmitLogin)}>
              <div className="input-group mb-3">
                <span className="input-group-text">Email</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresar email"
                  {...registerLogin("email")}
                />
              </div>
              {errorsLogin.email && (
                <p className="error-text-login">{errorsLogin.email.message}</p>
              )}

              <div className="input-group mb-3">
                <span className="input-group-text">Contraseña</span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresar Contraseña"
                  {...registerLogin("password")}
                />
              </div>
              {errorsLogin.password && (
                <p className="error-text-login">
                  {errorsLogin.password.message}
                </p>
              )}

              <button type="submit" className="btn btn-primary mb-3">
                Ingresar
              </button>

              {ErrorResponse && (
                <p className="error-text-login">{ErrorResponse}</p>
              )}
            </form>
          </section>
        ) : (
          <section id="admin-mode-section">
            <h1 className="title">Modo administrador</h1>
            <button
              className="btn btn-primary mb-3"
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? "Ocultar Lista" : "Ver Lista de Clubes"}
            </button>
          </section>
        )}
      </section>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/vy9M96Atuk0?si=6-801IWPvmT6QOIj"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
}

export default Auth;
