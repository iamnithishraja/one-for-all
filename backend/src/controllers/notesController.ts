import { Response } from "express";
import { trackSchema } from "../schemas/trackSchemas";
import prismaClient from "../config/db";
import { InputTypeCreateTrack } from "../schemas/types";
import { UserRequest } from "../schemas/types";

function getAllTracks(req: UserRequest, res: Response) {
    // get tracks for a perticular user based on college and semister and course
}

async function createTrack(req: UserRequest, res: Response) {
  try {
    const data: InputTypeCreateTrack = trackSchema.parse(req.body);

    const createdTrack = await prismaClient.track.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        Subject: data.subject,
        hidden: data.hidden,
        collegeId: req.user!.collegeId,
        autherId: req.user!.id,
      },
    });
    res.json(createdTrack);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

function updateTrack(req: UserRequest, res: Response) {
  res.json();
}

function deleteTrack(req: UserRequest, res: Response) {
  res.json();
}

export { getAllTracks, createTrack, updateTrack, deleteTrack };
