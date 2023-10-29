"use strict";

const User = require("../models/user.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(User);
        res.status(200).send({
            error: false,
            message: "Listed",
            details: await res.getModelListDetails(User),
            data,
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isAdmin": false,
                }
            }
        */
        // Disallow set admin:
        req.body.isAdmin = false;

        const data = await User.create(req.body);

        /* TOKEN */
        let tokenKey = passwordEncrypt(data._id + Date.now());
        let tokenData = await Token.create({ userId: data._id, token: tokenKey });
        /* TOKEN */

        res.status(201).send({
            error: false,
            message: "Created",
            token: tokenData.token,
            data,
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
        // Only self record:
        let filters = {};
        if (!req.user?.isAdmin) filters = { _id: req.user._id };

        const data = await User.findOne({ _id: req.params.id, ...filters });
        res.status(200).send({
            error: false,
            message: "Listed The One",
            data,
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isAdmin": false,
                }
            }
        */
        // Only self record:
        let filters = {};
        if (!req.user?.isAdmin) {
            filters = { _id: req.user._id };
            req.body.isAdmin = false;
        }

        const data = await User.updateOne({ _id: req.params.id, ...filters }, req.body, {
            runValidators: true,
        });
        res.status(200).send({
            error: false,
            message: "Updated",
            data,
            updatedData: await User.findOne({ _id: req.params.id }),
        });
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        const data = await User.deleteOne({ _id: req.params.id });
        res.status(data.deletedCount > 0 ? 204 : 404).send({
            error: !data.deletedCount,
            message: "Deleted",
            data,
        });
    },
};
