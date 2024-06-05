import express, { Request, Response } from "express";
import tracksRouter from "./routes/notesRoute";
import prismaClient from "./config/db";

const app = express();

app.use(express.json());

app.use("/tracks", tracksRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
