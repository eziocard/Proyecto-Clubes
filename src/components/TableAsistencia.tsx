import type { Alumno } from "../schema/AlumnoSchema";

type Asistencia = Alumno & { check: boolean };

type Props = {
  asistencias: Asistencia[];
  onCheckChange: (rut: string, valor: boolean) => void;
};

function TableAsistencia({ asistencias, onCheckChange }: Props) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Rut</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Grupo</th>
          <th style={{ textAlign: "center" }}>Asistencia</th>
        </tr>
      </thead>
      <tbody>
        {asistencias.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No hay alumnos inscritos
            </td>
          </tr>
        ) : (
          asistencias.map((alumno) => (
            <tr key={alumno.rut}>
              <th scope="row">{alumno.rut}</th>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{alumno.grupos}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={alumno.check}
                  onChange={(e) => onCheckChange(alumno.rut, e.target.checked)}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TableAsistencia;
