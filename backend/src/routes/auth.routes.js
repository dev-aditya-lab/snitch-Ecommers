import { Router } from "express";
import { validateRegister } from "../validator/auth.validator.js";
import { registerUserController } from "../controller/auth.controller.js";
const authRouter = Router();


authRouter.post("/register", validateRegister,registerUserController);


export default authRouter;