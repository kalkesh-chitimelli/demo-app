import mongoose from "mongoose";
import { Inotes } from "../commonFolder/notesInterface";

const notesSchema = new mongoose.Schema<Inotes>(
  {
    title: { type: String, required: true },
    notes: { type: String, required: true },
    email: { type: String, required: true },
  },
  { collection: "notes" }
);

notesSchema.index({ email: 1, title: 1 }, { unique: true });

const notesModel = mongoose.model<Inotes>("notes", notesSchema);

export { notesSchema, notesModel };
