"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const tokenExtract = authHeader.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(tokenExtract, process.env.SECRET_CODE);
        req.token = decodedToken;
        next();
    }
    catch (error) {
        next((0, http_errors_1.default)(403, new Error("Not Authorized")));
    }
};
exports.authenticate = authenticate;
