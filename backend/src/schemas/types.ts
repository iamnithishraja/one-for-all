import z from "zod";
import { Request } from "express";
import { createProblemsSchema, trackSchema } from "./trackSchemas";

export type InputTypeCreateTrack = z.infer<typeof trackSchema>;
export type InputTypeCreateProblem = z.infer<typeof createProblemsSchema>;

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
