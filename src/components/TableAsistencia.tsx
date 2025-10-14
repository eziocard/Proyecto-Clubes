import type { Asistencia } from "../type/Asistencia";

type Props = {
  asistencias: Asistencia[];
};

function TableAsistencia({ asistencias }: Props) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Rut</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>

          <th scope="col">Grupo</th>
          <th scope="col" style={{ display: "flex", justifyContent: "center" }}>
            Asistencia
          </th>
        </tr>
      </thead>
      <tbody>
        {asistencias.map((alumno) => (
          <tr key={alumno.rut}>
            <th>{alumno.rut}</th>
            <td>{alumno.nombre}</td>
            <td>{alumno.apellido}</td>
            <td>{alumno.grupos}</td>
            <td style={{ textAlign: "center" }}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={alumno.check ?? false}
                onChange={() => console.log(`Cambio ${alumno.nombre}`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableAsistencia;
