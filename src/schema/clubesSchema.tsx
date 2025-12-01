import { z } from "zod";

const TeamSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Debe ser un email válido"),
  image: z.union([z.string(), z.any()]).optional(),
  state: z.boolean(),
});

// Para usar en un formulario o validación
type Team = z.infer<typeof TeamSchema>;

export { TeamSchema, type Team };
