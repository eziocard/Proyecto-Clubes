import React, { useEffect, useState } from "react";
import { AlumnoSchema, grupos, type Alumno } from "../schema/AlumnoSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles/InscripcionStyles.css";

type Props = {
  alumnoInicial?: Alumno;
  onSubmitForm: (data: Alumno) => void;
};

function InscripcionView({ alumnoInicial, onSubmitForm }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGrupo, setSelectedGrupo] =
    useState<string>("Seleccionar grupo");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Alumno>({
    resolver: zodResolver(AlumnoSchema),
  });

  useEffect(() => {
    if (alumnoInicial) {
      reset(alumnoInicial);
      setSelectedGrupo(alumnoInicial.grupos);
    }
  }, [alumnoInicial, reset]);

  const onSubmit = (data: Alumno) => {
    onSubmitForm(data);
    reset();
    setSelectedGrupo("Seleccionar grupo");
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
            {...register("nombre")}
          />
          {errors.nombre && (
            <p className="error-text">{errors.nombre.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar Apellido"
            {...register("apellido")}
          />
          {errors.apellido && (
            <p className="error-text">{errors.apellido.message}</p>
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
            {...register("edad", { valueAsNumber: true })}
          />
          {errors.edad && <p className="error-text">{errors.edad.message}</p>}
        </div>

        <div className="form-group">
          <label>Grupo</label>
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-secondary dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedGrupo}
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              {grupos.map((e) => (
                <li key={e}>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setValue("grupos", e);
                      setSelectedGrupo(e);
                      setDropdownOpen(false);
                    }}
                  >
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {errors.grupos && (
            <span className="text-danger">{errors.grupos.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {alumnoInicial ? "Editar" : "Inscribir"}
        </button>
      </form>
    </section>
  );
}

export default InscripcionView;
