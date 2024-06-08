import { Request, Response } from "express";
import prismaClient from "../config/db";

async function getAllTracks(req: Request, res: Response, collegeId: string) {
  try {
    const allTracks = await prismaClient.Track.findMany({
      where: {
        collegeId
      }
    });
    res.json(allTracks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to retrieve tracks" });
  }
}

async function createTrack(req: Request, res: Response) {
  const { title, description, image, collegeId, autherId } = req.body;
  try {
    const newTrack = await prismaClient.Track.create({
      data: {
        title,
        description,
        image,
        collegeId,
        autherId,
        hidden: false,
        createdAt: new Date()
      }
    });
    res.json(newTrack);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create track" });
  }
}

async function updateTrack(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, image, collegeId, autherId } = req.body;
  try {
    const updatedTrack = await prismaClient.Track.update({
      where: { id },
      data: {
        title,
        description,
        image,
        collegeId,
        autherId,
        hidden: false,
        createdAt: new Date()
      }
    });
    res.json(updatedTrack);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update track" });
  }
}

async function deleteTrack(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prismaClient.Track.delete({ where: { id } });
    res.json({ message: "Track deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete track" });
  }
}

export { getAllTracks, createTrack, updateTrack, deleteTrack };