import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { TeamSchema, type Team } from "../schema/clubesSchema";

import defaultlogo from "./../assets/Clubes/default.png";
import useClubes from "../hooks/useClubes";
type Props = {};

function RegistrarClubes({}: Props) {
  const { crearClub } = useClubes();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Team>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      state: true,
      image: null,
    },
  });
  const onSubmit = async (data: Team) => {
    // falta lo de la imagenn

    const response = await crearClub(data);
    alert("Club Registrado");
    console.log("Respuesta del backend:", response);
    reset();
  };

  return (
    <section id="inscripcion-section">
      <h1>Crear Club</h1>
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
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="club@gmail.com"
            {...register("email")}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Imagen</label>
          <input
            type="File"
            id="upload-img"
            accept="image/png"
            className="form-control"
            {...register("image")}
          />
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              {...register("state")}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Visible
            </label>
          </div>
          {errors.state && <p className="error-text">{errors.state.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          crear
        </button>
      </form>
    </section>
  );
}

export default RegistrarClubes;
