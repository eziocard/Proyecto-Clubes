import React from "react";

type Props = {
  data: any;
};

function Table({ data }: Props) {
  const columnas = Object.keys(data[0]);
  console.log(columnas.length);

  const Detector = (value: any) => {
    return typeof value === "string" && /\.(png)$/i.test(value);
  };
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            {columnas.map((e, index) => (
              <th scope="col" key={index}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: any) => (
            <tr key={index}>
              {columnas.map((col) => (
                <td key={col}>
                  {Detector(item[col]) ? (
                    <img
                      src={item[col]}
                      alt={col}
                      style={{ width: "30px", borderRadius: 15 }}
                    />
                  ) : (
                    item[col]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
