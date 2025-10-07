import { useState } from "react";
import gimasialogo from "./../assets/Clubes/Gimnasia temuco.png";
import tornadologo from "./../assets/Clubes/Tornado Temuco.png";

import type { AuthRegister } from "../schema/AuthFormSchema";

function useClubes() {
  const [clubes, setClubes] = useState<AuthRegister[]>([
    {
      nombre_club: "Tornado Temuco",
      contraseña: "123456789",
      email: "tornado@gmail.com",
      username: "tornado",
      admin: false,
      imagen: tornadologo,
      activo: true,
    },
    {
      nombre_club: "Gimnasia Olimpica Temuco",
      contraseña: "123456789",
      email: "gimnasia@gmail.com",
      username: "gimnasia",
      admin: false,
      imagen: gimasialogo,
      activo: true,
    },
  ]);
  const cambiarEstado = (username: string) => {
    setClubes(
      clubes.map((club) =>
        club.username === username ? { ...club, activo: !club.activo } : club
      )
    );
  };
  return { clubes, setClubes, cambiarEstado };
}

export default useClubes;
