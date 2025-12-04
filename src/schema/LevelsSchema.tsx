import { z } from "zod";

const LevelSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "El nombre del nivel es requerido"),
  user_id: z.number().int().positive().nullable().optional(),
  team_id: z.number().int().positive().nullable().optional(),
});

type Level = z.infer<typeof LevelSchema>;

export { LevelSchema, type Level };
