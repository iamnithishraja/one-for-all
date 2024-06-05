import express from "express";
import {
  createTrack,
  deleteTrack,
  getAllTracks,
  updateTrack,
} from "../controllers/notesController";
import { isAuthenticated, isRoleAuthenticated } from "../middleware/auth";

const tracksRouter = express.Router();
tracksRouter
  .route("/")
  .get(getAllTracks)
  .post(
    isAuthenticated,
    (req, res, next) => isRoleAuthenticated(req, res, next, "professor"),
    createTrack
  )
  .put(
    isAuthenticated,
    (req, res, next) => isRoleAuthenticated(req, res, next, "professor"),
    updateTrack
  )
  .delete(
    isAuthenticated,
    (req, res, next) => isRoleAuthenticated(req, res, next, "professor"),
    deleteTrack
  );

export default tracksRouter;
