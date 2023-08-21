"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteService = exports.updateNoteService = exports.viewNotesService = exports.createNotesService = void 0;
const notesModel_1 = require("../models/notesModel");
const createNotesService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const notesFieldSet = {
        title: data.title,
        notes: data.notes,
        email: data.email
    };
    const newNote = yield notesModel_1.notesModel.create(notesFieldSet);
    if (newNote) {
        return `Note added successfully, click on view-notes to preview`;
    }
    else {
        return `Note not created...`;
    }
});
exports.createNotesService = createNotesService;
const viewNotesService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notesModel_1.notesModel.find({ email: data.email });
    return notes;
});
exports.viewNotesService = viewNotesService;
const updateNoteService = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateNoteService = updateNoteService;
const deleteNoteService = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteNoteService = deleteNoteService;
