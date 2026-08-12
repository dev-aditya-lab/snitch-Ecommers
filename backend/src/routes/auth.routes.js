import { Router } from "express";
import { validateLogin, validateRegister, } from "../validator/auth.validator.js";
import { loginUserController, registerUserController } from "../controller/auth.controller.js";
const authRouter = Router();


authRouter.post("/register", validateRegister,registerUserController);
authRouter.post("/login", validateLogin, loginUserController);



export default authRouter;