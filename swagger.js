"use strict";

require("dotenv").config();

const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const swaggerAutogen = require("swagger-autogen")();
const packageJson = require("./package.json");

const document = {
    info: {
        version: packageJson.version,
        title: packageJson.title,
        description: packageJson.description,
        termsOfService: "lutfullahclnk1104@gmail.com",
        contact: { name: packageJson.author, email: "lutfullahclnk1104@gmail.com" },
        license: { name: packageJson.license },
    },
    host: `${HOST}:${PORT}`,
    basePath: "/",
    schemes: ["http", "https"],
    definition: {
        "/auth/login": {
            username: {
                type: "String",
                required: true,
            },
            password: {
                type: "String",
                required: true,
            },
        },

        // Models:
        User: require("./src/models/user.model").schema.obj,
        Car: require("./src/models/car.model").schema.obj,
        Token: require("./src/models/token.model").schema.obj,
        Reservation: require("./src/models/reservation.model").schema.obj,
    },
};

const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

// Create JSON file:
swaggerAutogen(outputFile, routes, document);
