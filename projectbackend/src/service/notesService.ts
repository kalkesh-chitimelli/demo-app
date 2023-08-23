import { Inotes } from "../commonFolder/notesInterface";
import { notesModel } from "../models/notesModel";

const createNotesService = async (data: Inotes) => {
  const notesFieldSet = {
    title: data.title,
    notes: data.notes,
    email: data.email,
  };
  const newNote = await notesModel.create(notesFieldSet);
  if (newNote) {
    return `Note added successfully, click on Notes to preview`;
  } else {
    return `Note not created...`;
  }
};

const viewNotesService = async (data: Inotes) => {
  const notes = await notesModel.find({ email: data.email });
  return notes;
};

const updateNoteService = async (data: any) => {
  const note = await notesModel.findOneAndUpdate(
    {
      title: data.headers["param"],
      email: data.token.email,
    },
    { notes: data.body.note }
  );
  return `Note ${note?.title} has been updated.`;
};

const deleteNoteService = async (data: any) => {
  const note = await notesModel.findOneAndDelete({
    title: data.headers["param"],
    email: data.token.email,
  });
  return `Note ${note?.title} has been deleted.`;
};

export {
  createNotesService,
  viewNotesService,
  updateNoteService,
  deleteNoteService,
};
