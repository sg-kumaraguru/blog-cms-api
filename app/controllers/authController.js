import { User } from "../models/userModel.js";
import { hashPassword, comparePassword, setCookie, generateToken } from "../utils/authUtils.js";
import { asyncHandler } from "../utils/asyncUtils.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ error: "email already exists" });

  const hashed = await hashPassword(password);
  const newUser = await User.create({
    name,
    email,
    password: hashed,
  });

  setCookie(res, generateToken(newUser._id));

  res.json({
    message: `Hello, ${newUser.name}!`,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await comparePassword(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  setCookie(res, generateToken(user._id));

  res.json({
    message: `Welcome back, ${user.name}!`,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({ message: `Goodbye, ${req.user.name}!` });
});
