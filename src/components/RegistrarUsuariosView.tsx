import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import UserSchema from "../schema/UserSchema";
import type { User } from "../type/types";
import { useAuth } from "../auth/AuthProvider";

type Props = {};

function RegistrarProfesores({}: Props) {
  const auth = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("Seleccionar rol");

  const roles = ["teacher", "team_admin"] as const;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      role: "teacher",
    },
  });

  const onSubmit = (data: User) => {
    console.log("Datos del formulario:", data);
    // Aquí enviarías los datos al backend
    reset();
    setSelectedRole("Seleccionar rol");
  };

  return (
    <section id="inscripcion-section">
      <h1>Registrar Usuarios</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>RUT</label>
          <input
            type="text"
            className="form-control"
            placeholder="12345678-9"
            {...register("rut")}
          />
          {errors.rut && <p className="error-text">{errors.rut.message}</p>}
        </div>

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar Nombre"
            {...register("name")}
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar Apellido"
            {...register("lastname")}
          />
          {errors.lastname && (
            <p className="error-text">{errors.lastname.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="profesor@gmail.com"
            {...register("email")}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Mínimo 6 caracteres"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        {auth.getUser()?.role === "superuser" && (
          <div className="form-group">
            <label>ID del Equipo</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresar ID del equipo"
              {...register("team_id", {
                setValueAs: (v) => (v === "" ? null : parseInt(v)),
              })}
            />
            {errors.team_id && (
              <p className="error-text">{errors.team_id.message}</p>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Rol</label>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedRole}
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              {roles.map((role) => (
                <li key={role}>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setValue("role", role);
                      setSelectedRole(
                        role === "teacher"
                          ? "Profesor"
                          : role === "team_admin"
                          ? "Admin de Equipo"
                          : "Super Usuario"
                      );
                      setDropdownOpen(false);
                    }}
                  >
                    {role === "teacher"
                      ? "Profesor"
                      : role === "team_admin"
                      ? "Admin de Equipo"
                      : "Super Usuario"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {errors.role && <p className="error-text">{errors.role.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Registrar
        </button>
      </form>
    </section>
  );
}

export default RegistrarProfesores;
