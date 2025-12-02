import { useForm } from "react-hook-form";
import { LevelSchema, type Level } from "../schema/LevelsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import useLevel from "../hooks/useLevel";

function LevelRegister() {
  const { InfoUser, user, loading, error } = useUser();
  useEffect(() => {
    InfoUser();
  }, []);
  const { crearLevel } = useLevel();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Level>({
    resolver: zodResolver(LevelSchema),
    defaultValues: {
      team_id: user?.team_id,
    },
  });
  const onSubmit = async (data: Level) => {
    const respuesta = await crearLevel(data);
    console.log("respuesta", respuesta);
    reset();
  };
  console.log(user?.role);
  return (
    <section id="inscripcion-section">
      <h1>Crear Nivel</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar Nombre del nivel"
            {...register("name")}
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Profesor ID</label>
          <input
            type="number"
            className="form-control"
            placeholder="Ingresar Rut del profesor"
            {...register("user_id", { valueAsNumber: true })}
          />
          {errors.user_id && (
            <p className="error-text">{errors.user_id.message}</p>
          )}
        </div>

        {user?.role === "superuser" && (
          <div className="form-group">
            <label>Equipo</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresar ID Equipo"
              {...register("team_id", { valueAsNumber: true })}
            />
            {errors.user_id && (
              <p className="error-text">{errors.user_id.message}</p>
            )}
            {errors.team_id && (
              <p className="error-text">{errors.team_id.message}</p>
            )}
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          crear
        </button>
      </form>
    </section>
  );
}
export default LevelRegister;
