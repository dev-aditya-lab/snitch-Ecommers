import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import { config } from "./config/env.js";


const app = express();


app.use(passport.initialize());
passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.GOOGLE_REDIRECT_URI
}, (accessToken, refreshToken, profile, done) => {
  // Handle user authentication logic here
  done(null, profile);
}));
app.use(morgan("dev"));
app.use(express.json());    
app.use(cookieParser());


app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the snith API" });
});

export default app;