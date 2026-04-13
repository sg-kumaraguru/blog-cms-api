import { Router } from "express";
import {register, login,logout} from "../controllers/authController.js"
import {registerSchema, loginSchema} from "../schemas/authSchema.js"
import {validateSchema} from "../middlewares/schemaMiddleware.js"
import {requireAuth} from "../middlewares/authMiddleware.js"

const authRouter = Router();


authRouter.post("/register", validateSchema(registerSchema), register);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/logout", requireAuth, logout);


export default authRouter;
