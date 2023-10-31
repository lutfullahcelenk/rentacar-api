"use strict";

const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        collection: "users",
        timestamps: true,
    }
);

UserSchema.pre(["save", "updateOne"], function (next) {
    // get data from "this" when create;
    // if process is updateOne, data will receive in "this._update"
    const data = this?._update || this;

    const isEmailValidated = data.email
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".
        : true;

    if (isEmailValidated) {
        if (data?.password) {
            const isPasswordValidated =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,}$/.test(
                    data.password
                );

            if (isPasswordValidated) {
                this.password = data.password = passwordEncrypt(data.password);
                this._update = data; // updateOne will wait data from "this._update".
            } else {
                next(new Error("Password not validated."));
            }
        }

        next(); // Allow to save.
    } else {
        next(new Error("Email not validated."));
    }
});

module.exports = mongoose.model("User", UserSchema);
