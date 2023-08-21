import { Router } from "express";
import { createNotesController, deleteNoteController, updateNoteController, viewNotesController } from "../controller/notesController";
import { authenticate } from "../middleware/authentication/authentication";

const router = Router();

router.post("/createNotes",authenticate,createNotesController)

router.get("/viewNotes",authenticate,viewNotesController);

router.put("/updateNote",updateNoteController);

router.delete("/deleteNote",deleteNoteController);

export default router;