import { useEffect, useState } from "react";
import { AlumnoSchema, grupos, type Alumno } from "../schema/AlumnoSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles/InscripcionStyles.css";
import { useAuth } from "../auth/AuthProvider";

type Props = {
  alumnoInicial?: Alumno;
  onSubmitForm: (data: Alumno) => void;
};

function InscripcionView({ alumnoInicial, onSubmitForm }: Props) {
  const auth = useAuth();

  useState<string>("Seleccionar grupo");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Alumno>({
    resolver: zodResolver(AlumnoSchema),
    defaultValues: {
      team_id: auth.getUser()?.team_id,
    },
  });

  const onSubmit = (data: Alumno) => {
    onSubmitForm(data);
    reset();
  };

  return (
    <section id="inscripcion-section">
      <h1>{alumnoInicial ? "Editar Alumno" : "Inscribir Alumno"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label>RUT</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar RUT '12345678-9'"
            {...register("rut")}
          />
          {errors.rut && <p className="error-text">{errors.rut.message}</p>}
        </div>

        <div className="form-group">
          <label>Edad</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingresar Edad"
            min={1}
            step={1}
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && <p className="error-text">{errors.age.message}</p>}
        </div>

        <div className="form-group">
          <label>Nivel</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingresar Edad"
            min={1}
            step={1}
            {...register("level", { valueAsNumber: true })}
          />
          {errors.level && <p className="error-text">{errors.level.message}</p>}
        </div>

        {auth.getUser()?.role === "superuser" && (
          <div className="form-group">
            <label>Equipo</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresar id de Equipo"
              {...register("team_id")}
            />
            {errors.team_id && (
              <p className="error-text">{errors.team_id.message}</p>
            )}
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          {alumnoInicial ? "Editar" : "Inscribir"}
        </button>
      </form>
    </section>
  );
}

export default InscripcionView;
