import z from "zod";
import { Request } from "express";
import { trackSchema } from "./trackSchemas";

export type InputTypeCreateTrack = z.infer<typeof trackSchema>;

interface user {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "professor";
  collegeId: string;
}

export interface UserRequest extends Request {
  user?: user;
}
