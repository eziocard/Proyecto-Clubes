import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserRegister from "../hooks/useRegister";

import { RegisterSchema } from "../schema/UserSchema";
import type { User } from "../types/types";
import "./styles/user.css";
function UserRegister() {
  const { registrarUser, obtenerUsers, editarUser, eliminarUser } =
    useUserRegister();
  const [mensaje, setMensaje] = useState("");
  const [lista, setLista] = useState<User[]>([]);
  const [editando, setEditando] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { team_id: null },
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (editando) {
      setValue("rut", editando.rut ?? "");
      setValue("name", editando.name ?? "");
      setValue("lastname", editando.lastname ?? "");
      setValue("email", editando.email ?? "");
      setValue("password", "");
      setValue("role", editando.role);
      setValue("team_id", editando.team_id ?? null);
    } else {
      reset({ team_id: null });
    }
  }, [editando, setValue, reset]);

  const cargarUsuarios = async () => {
    const data = await obtenerUsers();
    setLista(Array.isArray(data) ? data : []);
  };

  const onSubmit = async (data: User) => {
    console.log("Datos enviados:", data);

    if (editando) {
      const res = await editarUser(editando.rut, data);
      if (res?.message) {
        setMensaje(res.message);
        setEditando(null);
        cargarUsuarios();
      } else {
        setMensaje("Error al editar usuario");
      }
    } else {
      const res = await registrarUser(data);
      if (res?.message) {
        setMensaje(res.message);
        reset({ team_id: null });
        cargarUsuarios();
      } else if (res?.error) {
        setMensaje(
          typeof res.error === "string" ? res.error : JSON.stringify(res.error)
        );
      } else {
        setMensaje("Error al crear usuario");
      }
    }
  };

  const handleEditar = (usuario: User) => {
    setEditando(usuario);
    setMensaje("");
  };

  const handleEliminar = async (rut: string) => {
    const ok = confirm("¿Está seguro de eliminar este usuario?");
    if (!ok) return;

    const res = await eliminarUser(rut);
    if (res?.message) {
      setMensaje("Usuario eliminado exitosamente");
      cargarUsuarios();
    } else {
      setMensaje("Error al eliminar usuario");
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    reset({ team_id: null });
    setMensaje("");
  };

  return (
    <section id="container">
      <section>
        <form id="formulario" onSubmit={handleSubmit(onSubmit)}>
          <h1>{editando ? "Editar Usuario" : "Registro de Usuarios"}</h1>

          {mensaje && <p className="alert alert-info">{mensaje}</p>}
          <div className="form-group">
            <label>RUT</label>
            <input
              {...register("rut")}
              className="form-control"
              disabled={!!editando}
            />
            {errors.rut && <p className="error-text">{errors.rut.message}</p>}
          </div>

          <div className="form-group">
            <label>Nombre</label>
            <input {...register("name")} className="form-control" />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Apellido</label>
            <input {...register("lastname")} className="form-control" />
            {errors.lastname && (
              <p className="error-text">{errors.lastname.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              className="form-control"
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>
              Contraseña {editando && "(dejar vacío para mantener)"}
            </label>
            <input
              type="password"
              {...register("password")}
              className="form-control"
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Rol</label>
            <select {...register("role")} className="form-control">
              <option value="">Seleccione un rol</option>
              <option value="superuser">Superuser</option>
              <option value="teacher">Teacher</option>
              <option value="team">Team Admin</option>
            </select>
            {errors.role && <p className="error-text">{errors.role.message}</p>}
          </div>

          <div className="form-group">
            <label>Equipo (opcional)</label>
            <input
              type="number"
              {...register("team_id")}
              className="form-control"
              placeholder="Opcional"
            />
            {errors.team_id && (
              <p className="error-text">{errors.team_id.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-success mt-2">
            {editando ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
          {editando && (
            <button
              type="button"
              className="btn btn-secondary mt-2 ms-2"
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          )}
        </form>
      </section>
      <hr className="my-4" />

      <section id="tabla-container">
        <h3>Listado de Usuarios</h3>
        {lista.length === 0 && <p>No hay usuarios registrados</p>}

        {lista.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">RUT</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Equipo</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((u) => (
                <tr key={u.rut}>
                  <td scope="row">{u.rut}</td>
                  <td>
                    {u.name} {u.lastname}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.team_id ?? "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => handleEditar(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(u.rut)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}

export default UserRegister;
