import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginType } from "../schema/loginScheme";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import "./styles/login.css";

type Props = {};

function Login({}: Props) {
  const auth = useAuth();
  const goTo = useNavigate();
  const [ErrorResponse, setErrorResponse] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  async function onsubmit(data: LoginType) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      });

      const json = await response.json();
      console.log(json);
      if (response.ok) {
        console.log("Se ha logeado");
        auth.saveToken(json);
        setErrorResponse("");
        goTo("/dashboard");
      } else {
        setErrorResponse(json.message);
      }
    } catch (error) {
      console.log("Error en login:", error);
    }
  }

  return (
    <main id="container-login">
      <form onSubmit={handleSubmit(onsubmit)}>
        <h1 className="title">Iniciar Sesión</h1>
        <div className="input-group mb-3">
          <span className="input-group-text">Email</span>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="error-text-login">{errors.email.message}</p>
        )}
        <div className="input-group mb-3">
          <span className="input-group-text">Contraseña</span>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresar Contraseña"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="error-text-login">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-primary mb-3">
          Ingresar
        </button>
      </form>
    </main>
  );
}

export default Login;
