"use strict";

const { mongoose } = require("../configs/dbConnection");

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

UserSchema.pre("save", function (next) {
    const isEmailValidate = new RegExp(
        "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"
    ).test(this.email);

    if (isEmailValidate) {
        const isPasswordValidate =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,}$/.test(
                this.password
            );

        if (isPasswordValidate) {
            this.password = passwordEncrypt(this.password);
            next();
        } else {
            next(new Error("Password not validated."));
        }
    } else {
        next(new Error("Email is not validated"));
    }
});

module.exports = mongoose.model("User", UserSchema);
