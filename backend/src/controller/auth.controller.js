import { config } from "../config/env.js";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

async function sendTokenResponse(user, res,message,statusCode = 200) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
    res.cookie("token", token)
    res.status(statusCode).json({
        message,
        success: true,
        user: {
            email: user.email,
            contact: user.contact,
            fullName: user.fullName,
            role: user.role
        }
    });
}

export async function registerUserController(req, res) {
    const { email, password, contact, fullName, isSeller } = req.body;
    try {
        const existingUser = await userModel.findOne({ $or: [{ email }, { contact }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact number already exists" });
        }
        const newUser = new userModel({ email, password, contact, fullName, role: isSeller ? "seller" : "buyer" });
        await newUser.save();
        await sendTokenResponse(newUser, res, "User registered successfully");
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function loginUserController(req, res) {
    const {  email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        await sendTokenResponse(user, res, "User logged in successfully");
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" });
    }
}