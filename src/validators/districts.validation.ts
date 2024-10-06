import { z } from "zod";

export const regionIdSchema = z.object({
  regionId: z.string().min(1, "Region ID is required"),
});
