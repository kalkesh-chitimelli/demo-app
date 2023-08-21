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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userByEmailService = exports.loginUserService = exports.registerUserService = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
    const userFieldSet = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
    };
    const newUser = yield userModel_1.userModel.create(userFieldSet);
    if (newUser) {
        return `Hii ${data.firstName} ${data.lastName} your Registration is successfull!!!`;
    }
    else {
        return `Registartion is Failed...`;
    }
});
exports.registerUserService = registerUserService;
const loginUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.userModel.findOne({ email: data.email });
    if (!user) {
        return `Kindly check your username/password and try again...`;
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(data.password, user.password);
    if (!isPasswordCorrect) {
        return `Kindly check your username/password and try again...`;
    }
    const mySecretKey = process.env.SECRET_CODE;
    const payLoad = {
        email: user.email,
    };
    const jwtToken = jsonwebtoken_1.default.sign(payLoad, mySecretKey);
    return { token: jwtToken, message: "Logged In " };
});
exports.loginUserService = loginUserService;
const userByEmailService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.userModel.findOne({ email: data.email });
    return user;
});
exports.userByEmailService = userByEmailService;
