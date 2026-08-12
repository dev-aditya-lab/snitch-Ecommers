import { Router } from "express";
import { validateLogin, validateRegister, } from "../validator/auth.validator.js";
import { getCurrentUserController, googleAuthCallbackController, loginUserController, registerUserController } from "../controller/auth.controller.js";
import passport from "passport";
import { config } from "../config/env.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const authRouter = Router();


authRouter.post("/register", validateRegister,registerUserController);
authRouter.post("/login", validateLogin, loginUserController);


authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: `${config.FRONTEND_URL}/login` }),
    googleAuthCallbackController
 );

authRouter.get("/get-user", authenticateUser, getCurrentUserController);


export default authRouter;