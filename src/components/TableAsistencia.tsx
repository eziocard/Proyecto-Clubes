import React from "react";

type Props = {};

function TableAsistencia({}: Props) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Segundo Apellido</th>
          <th scope="col">Grupo</th>
          <th scope="col" style={{ display: "flex", justifyContent: "center" }}>
            Asistencia
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Json</td>
          <td>Derulo</td>
          <td>diaz</td>
          <td>Iniciacion</td>
          <td>
            <div
              className="form-check"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkDefault"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableAsistencia;
