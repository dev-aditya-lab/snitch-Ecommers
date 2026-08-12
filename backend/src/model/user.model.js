import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: "" },
    password: {
        type: String,
        required: function () {
            return !this.googleId; // Password is required only if googleId is not present
        },
        select: false
    },
    contact: { type: String, required: false, unique: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
    googleId: { type: String, default: null },
}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);
export default userModel;