import { body, validationResult } from "express-validator";


const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegister = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").isMobilePhone().withMessage("Invalid contact number").matches(/^[0-9]{10}$/).withMessage("Contact number must be 10 digits"),
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),
    validateRequest
];