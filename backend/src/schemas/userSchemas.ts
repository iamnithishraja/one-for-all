import { z } from "zod";

const user = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string(),
  collegeId: z.string().optional(),
  role: z.enum(["admin", "user", "professor"]),
});
