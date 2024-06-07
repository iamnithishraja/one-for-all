import express from "express";
import tracksRouter from "./routes/notesRoute";

const app = express();

app.use(express.json());

app.use("/tracks", tracksRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
