import { Ilogin, Iuser } from "../commonFolder/userInterface";
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const registerUserService = async (data: Iuser) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userFieldSet = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  };

  const newUser = await userModel.create(userFieldSet);
  if (newUser) {
    return `Hii ${data.firstName} ${data.lastName} your Registration is successfull!!!`;
  } else {
    return `Registartion is Failed...`;
  }
};

const loginUserService = async (data: Ilogin) => {
  const user = await userModel.findOne({ email: data.email });
  if (!user) {
    return `Kindly check your username/password and try again...`;
  }
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);
  if (!isPasswordCorrect) {
    return `Kindly check your username/password and try again...`;
  }
  const mySecretKey = process.env.SECRET_CODE as Secret;

  const payLoad = {
    email: user.email,
  };

  const jwtToken = jwt.sign(payLoad, mySecretKey);
  return { token: jwtToken, message: "Logged In " };
};

const userByEmailService = async (data: Ilogin) => {
  const user = await userModel.findOne({ email: data.email });
  return user;
};

export { registerUserService, loginUserService, userByEmailService };
