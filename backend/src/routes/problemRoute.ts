import express from "express";
import { createProblems, getProblem, updateProblems } from "../controllers/problemController";

const router = express.Router();

router.route("/:trackId/:pgNo").get(getProblem);

router.route("/:trackId").post(createProblems).put(updateProblems);