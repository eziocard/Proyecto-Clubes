import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StudentSchema, type Student } from "../schema/studentsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useUser from "../hooks/useUser";
import useStudent from "../hooks/useStudent";
import "./styles/student.css";

const StudentRegister = () => {
  const { InfoUser, user } = useUser();
  const {
    crearStudent,
    buscarStudent,
    obtenerStudents,
    eliminarStudent,
    editarStudent,
  } = useStudent();

  const [lista, setLista] = useState<Student[]>([]);
  const [query, setQuery] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [editando, setEditando] = useState<Student | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Student>({
    resolver: zodResolver(StudentSchema),
  });

  useEffect(() => {
    InfoUser();
    cargar();
  }, []);

  const cargar = async () => {
    const data = await obtenerStudents();
    setLista(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (editando) {
      setValue("name", editando.name ?? "");
      setValue("lastname", editando.lastname ?? "");
      setValue("rut", editando.rut ?? "");
      setValue("age", editando.age ?? undefined);
      setValue("level_id", editando.level_id ?? undefined);
      setValue("team_id", editando.team_id ?? undefined);
    } else {
      reset();
    }
  }, [editando, setValue, reset]);

  const onSubmit = async (data: Student) => {
    if (editando) {
      const res = await editarStudent(editando.rut, data);
      if (res?.message) {
        setMensaje(res.message);
        setEditando(null);
        cargar();
      } else {
        setMensaje("Error al editar estudiante");
      }
    } else {
      const res = await crearStudent(data);
      if (res?.message) {
        setMensaje(res.message);
        reset();
        cargar();
      } else {
        setMensaje("Error al crear estudiante");
      }
    }
  };

  const handleBuscar = async () => {
    if (!query.trim()) {
      cargar();
      return;
    }

    const res = await buscarStudent(query);
    if (Array.isArray(res)) {
      setLista(res);
    } else if (res?.rut) {
      setLista([res]);
    } else {
      setLista([]);
    }
  };

  const handleEliminar = async (rut: string) => {
    const ok = confirm("¿Eliminar estudiante?");
    if (!ok) return;

    const res = await eliminarStudent(rut);
    if (res?.message) {
      setMensaje("Alumno eliminado");
      cargar();
    }
  };

  const handleEditar = (student: Student) => {
    setEditando(student);
  };

  return (
    <section id="contenedor">
      <section id="inscripcion-section-1">
        {(user?.role === "team" || user?.role === "superuser") && (
          <>
            <h1>
              {editando ? "Editar Estudiante" : "Registro de Estudiantes"}
            </h1>

            {mensaje && <p className="alert alert-info">{mensaje}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Nombre</label>
                <input {...register("name")} className="form-control" />
                {errors.name && (
                  <p className="error-text">{errors.name.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>Apellido</label>
                <input {...register("lastname")} className="form-control" />
                {errors.lastname && (
                  <p className="error-text">{errors.lastname.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>RUT</label>
                <input
                  {...register("rut")}
                  className="form-control"
                  disabled={!!editando}
                />
                {errors.rut && (
                  <p className="error-text">{errors.rut.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>Edad</label>
                <input
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  className="form-control"
                />
                {errors.age && (
                  <p className="error-text">{errors.age.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>Nivel</label>
                <input
                  type="number"
                  {...register("level_id", { valueAsNumber: true })}
                  className="form-control"
                />
                {errors.level_id && (
                  <p className="error-text">{errors.level_id.message}</p>
                )}
              </div>

              {user?.role === "superuser" && (
                <div className="form-group">
                  <label>Equipo</label>
                  <input
                    type="number"
                    {...register("team_id", { valueAsNumber: true })}
                    className="form-control"
                  />
                  {errors.team_id && (
                    <p className="error-text">{errors.team_id.message}</p>
                  )}
                </div>
              )}

              <button className="btn btn-success mt-2">
                {editando ? "Actualizar Estudiante" : "Crear Estudiante"}
              </button>
              {editando && (
                <button
                  type="button"
                  className="btn btn-secondary mt-2 ms-2"
                  onClick={() => setEditando(null)}
                >
                  Cancelar
                </button>
              )}
            </form>

            <hr />
          </>
        )}
      </section>
      <section id="inscripcion-section-2">
        <div>
          <h3>Buscar alumnos</h3>
          <input
            type="text"
            placeholder="Buscar por nombre o RUT"
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
              <th>RUT</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Nivel</th>
              <th>Equipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((a) => (
              <tr key={a.rut}>
                <td>{a.rut}</td>
                <td>
                  {a.name} {a.lastname}
                </td>
                <td>{a.age}</td>
                <td>{a.level_id}</td>
                <td>{a.team_id}</td>
                <td>
                  {(user?.role === "superuser" || user?.role === "team") && (
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => handleEditar(a)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(a.rut)}
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

export default StudentRegister;
