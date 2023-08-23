import { Request, Response } from "express";
import {
  createNotesService,
  deleteNoteService,
  updateNoteService,
  viewNotesService,
} from "../service/notesService";

const createNotesController = async (req: Request, res: Response) => {
  const createNotes = await createNotesService(req.body);
  return res.send(createNotes);
};

const viewNotesController = async (req: any, res: Response) => {
  const viewNotes = await viewNotesService(req.token);
  return res.send(viewNotes);
};

const updateNoteController = async (req: any, res: Response) => {
  //console.log(req);
  const updateNote = await updateNoteService(req);
  return res.send(updateNote);
};

const deleteNoteController = async (req: any, res: Response) => {
  const deleteNote = await deleteNoteService(req);
  return res.send(deleteNote);
};

export {
  createNotesController,
  viewNotesController,
  updateNoteController,
  deleteNoteController,
};
