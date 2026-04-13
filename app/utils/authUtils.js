import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {config} from "../config/config.js"


export const hashPassword = (password) =>
  bcrypt.hash(password, 10);

export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);

export const generateToken = (id) =>
  jwt.sign({ id }, config.jwtSecret, { expiresIn: "1d" });

export const setCookie = (res, token) =>
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 86400000,
 });
