import React from "react";
import type { AuthRegister } from "../schema/AuthFormSchema";
import defaultlogo from "./../assets/Clubes/default.png";
import { AlignJustify, Wifi, WifiOff } from "lucide-react";

type Props = {
  data: AuthRegister[];
  funcion: (username: string) => void;
};

function TableClubes({ data, funcion }: Props) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultlogo;
  };

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Club</th>
            <th scope="col">Imagen</th>
            <th scope="col">
              {" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Activo
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => (
            <tr key={index}>
              <td>{e.nombre_club}</td>
              <td>
                <img
                  src={e.imagen || defaultlogo}
                  alt={`Logo ${e.nombre_club}`}
                  style={{ width: "30px", borderRadius: 15 }}
                  onError={handleImageError}
                />
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {e.activo ? (
                    <Wifi color="green" onClick={() => funcion(e.username)} />
                  ) : (
                    <WifiOff
                      onClick={() => funcion(e.username)}
                      style={{ color: "#D63215" }}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableClubes;
