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
exports.deleteNoteController = exports.updateNoteController = exports.viewNotesController = exports.createNotesController = void 0;
const notesService_1 = require("../service/notesService");
const createNotesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createNotes = yield (0, notesService_1.createNotesService)(req.body);
    return res.send(createNotes);
});
exports.createNotesController = createNotesController;
const viewNotesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const viewNotes = yield (0, notesService_1.viewNotesService)(req.token);
    return res.send(viewNotes);
});
exports.viewNotesController = viewNotesController;
const updateNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateNote = yield (0, notesService_1.updateNoteService)();
    return res.send(updateNote);
});
exports.updateNoteController = updateNoteController;
const deleteNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteNote = yield (0, notesService_1.deleteNoteService)();
    return res.send(deleteNote);
});
exports.deleteNoteController = deleteNoteController;
