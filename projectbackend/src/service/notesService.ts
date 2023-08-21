import { Inotes } from "../commonFolder/notesInterface";
import { notesModel } from "../models/notesModel";

const createNotesService = async (data: Inotes) => {
  const notesFieldSet = {
    title: data.title,
    notes: data.notes,
    email: data.email
  };
  const newNote = await notesModel.create(notesFieldSet);
  if (newNote) {
    return `Note added successfully, click on view-notes to preview`;
  } else {
    return `Note not created...`;
  }
};

const viewNotesService = async (data: Inotes) => {
    const notes = await notesModel.find({ email: data.email });
  return notes;
};

const updateNoteService = async () => {};

const deleteNoteService = async () => {};

export {
  createNotesService,
  viewNotesService,
  updateNoteService,
  deleteNoteService,
};
