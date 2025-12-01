import { zodResolver } from "@hookform/resolvers/zod";
import { NivelSchema, type Nivel } from "../schema/NivelSchema";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthProvider";

type Props = {};

function RegistrarNivel({}: Props) {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Nivel>({
    resolver: zodResolver(NivelSchema),
    defaultValues: {
      team_id: auth.getUser()?.team_id,
    },
  });
  const onSubmit = () => {
    reset();
  };

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
          <label>Profesor</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar Rut del profesor"
            {...register("rut")}
          />
          {errors.rut && <p className="error-text">{errors.rut.message}</p>}
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
          crear
        </button>
      </form>
    </section>
  );
}

export default RegistrarNivel;
