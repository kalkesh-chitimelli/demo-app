"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesModel = exports.notesSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notesSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    notes: { type: String, required: true },
    email: { type: String, required: true },
}, { collection: "notes" });
exports.notesSchema = notesSchema;
notesSchema.index({ email: 1, title: 1 }, { unique: true });
const notesModel = mongoose_1.default.model("notes", notesSchema);
exports.notesModel = notesModel;
