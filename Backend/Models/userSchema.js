import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        unique: true,
        required: [true, 'Please provide your name!'],
        minLenght: [3, "Name must contain atleat 3 words"],
        maxLenght: [30, "Name must contain maximum 30 words"]

    },
    Email: {
        type: String,
        required: [true, "Please provide your email!"],
        unique: [true, "User already registered!"],
        validate: [validator.isEmail, "Please provide valid email!"],
        select: false,
    },
    Phone_no: {
        type: Number,
        required: [true, 'Please provide your Phone Number!'],
        maxLenght: [10, "Number must contain maximum 10 Number"]

    },
    Password: {
        type: String,
        required: [true, 'Please provide your Password!'],
        minLenght: [8, "Password must contain atleat 8 Characters"],
        maxLenght: [26, "Password must contain maximum 26 Characters"]
    },
    avatar: {
        Public_id: {
            type: String,

        },
        Url: {
            type: String,


        },
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});
userSchema.pre("save", async function () {
    if (!this.isModified("Password")) {
        next();
    }
    this.Password = await bcrypt.hash(this.Password, 10);
});

userSchema.methods.comparePassword = function (enterPassword) {
    return bcrypt.compare(enterPassword, this.Password);
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}
export const User = mongoose.model("User", userSchema);