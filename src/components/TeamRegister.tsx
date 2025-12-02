import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TeamSchema, type Team } from "../schema/clubesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./styles/teamStyles.css";
import useTeam from "../hooks/useTeam";
import { useAuth } from "../Auth/AuthProvider";

const TeamRegister = () => {
  const { token } = useAuth();
  const { crearClub, obtenerTeams, editarClub, eliminarClub } = useTeam();
  const [lista, setLista] = useState<Team[]>([]);
  const [query, setQuery] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editando, setEditando] = useState<Team | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Team>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {},
  });

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const data = await obtenerTeams();
    setLista(Array.isArray(data) ? data : []);
  };

  const handleBuscar = () => {
    if (!query.trim()) {
      cargar();
      return;
    }
    const filtered = lista.filter(
      (t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        String(t.id) === query
    );
    setLista(filtered);
  };

  useEffect(() => {
    if (editando) {
      setValue("name", editando.name ?? "");
      setValue("email", editando.email ?? "");
      setValue("state", editando.state ?? false);
    } else {
      reset();
    }
  }, [editando, setValue, reset]);

  const onSubmit = async (data: Team) => {
    if (editando && editando.id !== undefined) {
      const res = await editarClub(editando.id, data);
      if (res?.message) {
        setMensaje(res.message);
        setEditando(null);
        cargar();
      } else {
        setMensaje("Error al actualizar club");
      }
    } else {
      const res = await crearClub(data);
      if (res?.message) {
        setMensaje(res.message);
        reset();
        cargar();
      } else {
        setMensaje("Error al crear club");
      }
    }
  };

  const handleEditar = (team: Team) => {
    setEditando(team);
  };

  const handleEliminar = async (id?: number) => {
    if (id === undefined) return;
    const ok = confirm("¿Eliminar club?");
    if (!ok) return;

    const res = await eliminarClub(id);
    if (res?.message) {
      setMensaje("Club eliminado");
      cargar();
    }
  };

  return (
    <section id="contenedor-teams">
      {/* Formulario */}
      <section id="inscripcion-section-1">
        <h1>{editando ? "Editar Club" : "Crear Club"}</h1>
        {mensaje && <p className="alert alert-info">{mensaje}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" className="form-control" {...register("name")} />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email")}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                {...register("state")}
              />
              <label className="form-check-label">Visible</label>
            </div>
          </div>

          <button className="btn btn-primary mt-3">
            {editando ? "Actualizar Club" : "Crear Club"}
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
          <h3>Buscar Clubes</h3>
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
        {lista.length === 0 && <p>No hay resultados</p>}

        <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Visible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.state ? "Sí" : "No"}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => handleEditar(a)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(a.id)}
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
};

export default TeamRegister;
