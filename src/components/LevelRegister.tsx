import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LevelSchema, type Level } from "../schema/LevelsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useLevel from "../hooks/useLevel";
import useUser from "../hooks/useUser";

function LevelRegister() {
  const { crearLevel, obtenerLevels, editarLevel, eliminarLevel } = useLevel();

  const { InfoUser, user } = useUser();

  const [lista, setLista] = useState<Level[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [query, setQuery] = useState("");
  const [editando, setEditando] = useState<Level | null>(null);

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

  useEffect(() => {
    InfoUser();
  }, []);

  useEffect(() => {
    cargar();
  }, [user]);

  const cargar = async () => {
    const data = await obtenerLevels();
    setLista(Array.isArray(data) ? data : []);
  };

  const handleBuscar = () => {
    if (!query.trim()) {
      cargar();
      return;
    }

    const filtered = lista.filter(
      (lvl) =>
        lvl.name.toLowerCase().includes(query.toLowerCase()) ||
        String(lvl.id) === query
    );
    setLista(filtered);
  };

  useEffect(() => {
    if (editando) {
      setValue("name", editando.name ?? "");
      setValue("user_id", editando.user_id ?? 0);
      setValue("team_id", editando.team_id ?? undefined);
    } else {
      reset({
        team_id: user?.team_id,
      });
    }
  }, [editando, setValue, reset]);

  const onSubmit = async (data: Level) => {
    if (editando && editando.id !== undefined) {
      const res = await editarLevel(editando.id, data);

      if (res?.message) {
        setMensaje(res.message);
        setEditando(null);
        cargar();
      } else {
        setMensaje("Error al actualizar nivel");
      }
    } else {
      const res = await crearLevel(data);

      if (res?.message) {
        setMensaje(res.message);
        reset();
        cargar();
      } else {
        setMensaje("Error al crear nivel");
      }
    }
  };

  const handleEditar = (level: Level) => {
    setEditando(level);
  };

  const handleEliminar = async (id?: number) => {
    if (!id) return;
    const ok = confirm("¿Eliminar nivel?");
    if (!ok) return;

    const res = await eliminarLevel(id);

    if (res?.message) {
      alert(res.message);
      setMensaje("Nivel eliminado");
      cargar();
    }
  };

  return (
    <section id="contenedor-levels">
      <section id="inscripcion-section-1">
        <h1>{editando ? "Editar Nivel" : "Crear Nivel"}</h1>

        {mensaje && <p className="alert alert-info">{mensaje}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nombre del Nivel</label>
            <input type="text" className="form-control" {...register("name")} />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>ID del Profesor</label>
            <input
              type="number"
              className="form-control"
              {...register("user_id", { valueAsNumber: true })}
            />
            {errors.user_id && (
              <p className="error-text">{errors.user_id.message}</p>
            )}
          </div>

          {user?.role === "superuser" && (
            <div className="form-group">
              <label>ID del Equipo</label>
              <input
                type="number"
                className="form-control"
                {...register("team_id", { valueAsNumber: true })}
              />
              {errors.team_id && (
                <p className="error-text">{errors.team_id.message}</p>
              )}
            </div>
          )}

          <button className="btn btn-primary mt-3">
            {editando ? "Actualizar Nivel" : "Crear Nivel"}
          </button>

          {editando && (
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-2"
              onClick={() => setEditando(null)}
            >
              Cancelar
            </button>
          )}
        </form>
      </section>

      {/* Tabla */}
      <section id="inscripcion-section-2">
        <div>
          <h3>Buscar Niveles</h3>
          <input
            type="text"
            placeholder="Buscar por nombre o ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
          />
          <button onClick={handleBuscar} className="btn btn-primary mt-2">
            Buscar
          </button>
        </div>

        <h3 className="mt-4">Listado</h3>
        {lista.length === 0 && <p>No hay niveles</p>}

        <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Profesor</th>
              <th>Equipo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((lvl) => (
              <tr key={lvl.id}>
                <td>{lvl.id}</td>
                <td>{lvl.name}</td>
                <td>{lvl.user_id}</td>
                <td>{lvl.team_id}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => handleEditar(lvl)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(lvl.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default LevelRegister;
