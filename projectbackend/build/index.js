"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const notesRouter_1 = __importDefault(require("./routers/notesRouter"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
mongoose_1.default
    .connect("mongodb://localhost:27017/demo-app")
    .then(() => console.log("Connected to DB!"));
app.listen(8080, () => {
    console.log(`Connected to port : ${port}`);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/users", userRouter_1.default);
app.use("/notes", notesRouter_1.default);
