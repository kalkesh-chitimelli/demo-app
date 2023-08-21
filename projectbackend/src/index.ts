import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter";
import notesRouter from "./routers/notesRouter";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 8080;

mongoose
  .connect("mongodb://localhost:27017/demo-app")
  .then(() => console.log("Connected to DB!"));

app.listen(8080, () => {
  console.log(`Connected to port : ${port}`);
});

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes", notesRouter);
