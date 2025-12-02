import { z } from "zod";

const TeamSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Debe ser un email válido"),
  state: z.boolean(),
});

// Para usar en un formulario o validación

export interface Team {
  id?: number;
  name: string;
  email: string;
  state: boolean;
}

export { TeamSchema };
