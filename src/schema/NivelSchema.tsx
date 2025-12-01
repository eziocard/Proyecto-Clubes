import { z } from "zod";

// Schema para crear un Level
const NivelSchema = z.object({
  name: z.string().min(1, "El nombre del nivel es requerido"),
  rut: z.string().min(1, "El RUT es requerido"),
  team_id: z.number().int().positive().nullable().optional(),
});

// Tipo TypeScript
type Nivel = z.infer<typeof NivelSchema>;

export { NivelSchema, type Nivel };
