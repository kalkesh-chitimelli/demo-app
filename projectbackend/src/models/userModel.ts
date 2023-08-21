import mongoose from "mongoose";
import { Iuser } from "../commonFolder/userInterface";

const userSchema = new mongoose.Schema<Iuser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const userModel = mongoose.model<Iuser>("users", userSchema);

export { userSchema, userModel };
